const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN
const GITHUB_OWNER = import.meta.env.VITE_GITHUB_OWNER
const GITHUB_REPO  = import.meta.env.VITE_GITHUB_REPO
const GITHUB_BRANCH = import.meta.env.VITE_GITHUB_BRANCH || 'main'

// Read a JSON file from the repo
export async function readDataFile(filename) {
  const timestamp = new Date().getTime()
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/public/data/${filename}?ref=${GITHUB_BRANCH}&t=${timestamp}`,
    { 
      headers: { 
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      } 
    }
  )
  
  if (!res.ok) throw new Error(`Failed to read ${filename}: ${res.statusText}`)
  
  const file = await res.json()
  const content = JSON.parse(decodeURIComponent(escape(atob(file.content))))
  return { data: content, sha: file.sha }
}

// Write/update a JSON file in the repo
export async function writeDataFile(filename, data, sha) {
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))))
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/public/data/${filename}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: `[admin] update ${filename}`,
        content,
        sha,
        branch: GITHUB_BRANCH
      })
    }
  )

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || `Failed to write ${filename}`)
  }
  
  return await res.json()
}

// Special function for enrollment submissions with conflict handling (3 retries)
export async function submitEnrollment(newEnrollment) {
  let retries = 3
  while (retries > 0) {
    try {
      const { data, sha } = await readDataFile('enrollments.json')
      const updatedData = [newEnrollment, ...data] // Newest first
      await writeDataFile('enrollments.json', updatedData, sha)
      return true
    } catch (error) {
      console.error(`Enrollment submission attempt failed. Retries left: ${retries - 1}`, error)
      retries--
      if (retries === 0) throw error
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}
