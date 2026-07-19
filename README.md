# Model Pashupati English Medium School — Website

Official website for Model Pashupati English Medium School, Geruwa-5, Pashupatinagar, Bardiya, Nepal.

**Live site:** https://mpemschool.vercel.app
**Admin panel:** https://mpemschool.vercel.app/admin/login

## How it works

The site is a React single-page app with **no backend server and no database**. Three free services work together:

| Service | Role |
|---|---|
| **GitHub** (this repo) | Stores the code *and* all website data (notices, gallery, enrollments, site content) as JSON files in `public/data/` |
| **Vercel** | Watches this repo — every push to `main` triggers a rebuild and republish of the live site (takes ~30–90 seconds) |
| **Cloudinary** | Stores all photos and serves them via public URLs |

### Content update flow (admin panel)

```
Admin saves a notice/photo in the admin panel
        │
        ▼
Browser calls the GitHub API and commits the change
to a JSON file in public/data/ (photos go to Cloudinary first)
        │
        ▼
GitHub notifies Vercel of the new commit
        │
        ▼
Vercel rebuilds and republishes the site (~30–90 s)
        │
        ▼
Visitors see the updated content
```

So the admin panel never needs a server: it edits this repository directly, and Vercel does the rest.

### Code update flow (developers)

Any commit pushed to `main` goes live automatically:

```bash
git add .
git commit -m "Describe your change"
git push origin main
# wait ~1 minute, then hard-refresh the live site (Ctrl+Shift+R)
```

## Local development

```bash
npm install
npm run dev        # start dev server at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # preview the production build locally
```

You need a `.env.local` file (never committed — it is in `.gitignore`):

```
VITE_ADMIN_PASSWORD=...            # admin panel login password
VITE_GITHUB_TOKEN=github_pat_...   # fine-grained PAT: MPEMS repo only, Contents: Read and write
VITE_GITHUB_OWNER=SiddharthaDhakalO
VITE_GITHUB_REPO=MPEMS
VITE_GITHUB_BRANCH=main
VITE_CLOUDINARY_CLOUD_NAME=...     # from the Cloudinary dashboard
VITE_CLOUDINARY_UPLOAD_PRESET=pashupati_unsigned
```

The same 7 variables are set in Vercel (Project → Settings → Environment Variables). **If you change any of them in Vercel, you must redeploy** — Vite bakes them into the bundle at build time.

> ⚠️ Because this is a client-only app, all `VITE_*` values ship inside the public JavaScript bundle. The GitHub token must therefore stay scoped to **only this repo** with **only Contents read/write** permission, so the worst-case exposure is edits to this site's data files.

## Project structure

```
public/data/            # website data, edited by the admin panel
  notices.json          #   school notices
  gallery.json          #   photo gallery entries (Cloudinary URLs)
  enrollments.json      #   contact/enrollment form submissions
  siteContent.json      #   editable site text (tagline, about, etc.)
src/
  pages/                # public pages: Home, About, Classes, Gallery, Notices, Contact
  components/           # shared UI components
  admin/
    pages/              # admin panel: Dashboard, Notices, Gallery, Enrollments, Content, Login
    utils/              # GitHub API + Cloudinary upload helpers
vercel.json             # SPA rewrite so routes like /admin/login work on Vercel
```

**Stack:** React 19 · Vite · Tailwind CSS 4 · React Router 7 · Framer Motion

## Deployment & troubleshooting

Full step-by-step setup instructions (GitHub token, Cloudinary preset, Vercel project, custom domain, common problems) are in [`Deployment_Guide_Pashupati_School.docx`](Deployment_Guide_Pashupati_School.docx) in the repo root.

Quick fixes for the most common issues:

- **Site shows old content after an admin save** — wait ~90 s for the Vercel rebuild, then hard-refresh (Ctrl+Shift+R).
- **"Error saving" / upload fails with 403** — the GitHub token is missing **Contents: Read and write**, or has expired. Edit the token on GitHub, or regenerate it and update `VITE_GITHUB_TOKEN` in Vercel, then redeploy.
- **Photo upload fails** — check the Cloudinary cloud name and that the `pashupati_unsigned` preset is set to **Unsigned**.
- **A page 404s on direct visit** — `vercel.json` rewrite is missing; it must route all paths to `index.html`.
