import { useState } from 'react'

const classOptions = [
  'Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2',
  'Class 3', 'Class 4', 'Class 5',
]

export default function Contact() {
  const [form, setForm]       = useState({ name: '', phone: '', childName: '', classInterest: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1200)
  }

  return (
    <div>
      {/* Page Header */}
      <div className="bg-[#E0F2FE] py-12 px-4 md:px-8 border-b border-[#7DD3FC]/40">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block bg-[#7DD3FC] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3">
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1E3A2F] mb-2">Contact Us</h1>
          <p className="text-[#6B7280] leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message or visit our school.
          </p>
        </div>
      </div>

      <section className="py-14 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-[#FDE047] rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-extrabold text-[#1E3A2F] mb-6">Send Us a Message</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-extrabold text-[#1E3A2F] mb-2">Thank you!</h3>
                  <p className="text-[#6B7280] leading-relaxed mb-6">
                    We've received your message. Our admissions team will contact you within 
                    1–2 working days.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name:'', phone:'', childName:'', classInterest:'', message:'' }) }}
                    className="bg-[#FDE047] text-[#1E3A2F] font-bold px-6 py-2.5 rounded-full hover:bg-[#facc15] transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-[#1E3A2F] mb-1.5" htmlFor="name">
                        Your Name *
                      </label>
                      <input
                        id="name" name="name" type="text" required
                        value={form.name} onChange={handleChange}
                        placeholder="e.g. Sita Karmacharya"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1E3A2F] placeholder-gray-300 focus:outline-none focus:border-[#FDE047] focus:ring-2 focus:ring-[#FDE047]/30 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1E3A2F] mb-1.5" htmlFor="phone">
                        Phone Number *
                      </label>
                      <input
                        id="phone" name="phone" type="tel" required
                        value={form.phone} onChange={handleChange}
                        placeholder="e.g. 9801234567"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1E3A2F] placeholder-gray-300 focus:outline-none focus:border-[#FDE047] focus:ring-2 focus:ring-[#FDE047]/30 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-[#1E3A2F] mb-1.5" htmlFor="childName">
                        Child's Name *
                      </label>
                      <input
                        id="childName" name="childName" type="text" required
                        value={form.childName} onChange={handleChange}
                        placeholder="e.g. Aarav Karmacharya"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1E3A2F] placeholder-gray-300 focus:outline-none focus:border-[#FDE047] focus:ring-2 focus:ring-[#FDE047]/30 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1E3A2F] mb-1.5" htmlFor="classInterest">
                        Class Interested In *
                      </label>
                      <select
                        id="classInterest" name="classInterest" required
                        value={form.classInterest} onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1E3A2F] focus:outline-none focus:border-[#FDE047] focus:ring-2 focus:ring-[#FDE047]/30 transition bg-white"
                      >
                        <option value="">Select a class…</option>
                        {classOptions.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#1E3A2F] mb-1.5" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message" name="message" rows={4}
                      value={form.message} onChange={handleChange}
                      placeholder="Any specific questions or information you'd like to share…"
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1E3A2F] placeholder-gray-300 focus:outline-none focus:border-[#FDE047] focus:ring-2 focus:ring-[#FDE047]/30 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FDE047] text-[#1E3A2F] font-bold py-3 rounded-full hover:bg-[#facc15] hover:shadow-md transition-all duration-200 disabled:opacity-60"
                  >
                    {loading ? '⏳ Sending…' : '✉️ Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info Card */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-[#F0FDF4] border border-[#86EFAC] rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-[#1E3A2F] text-base mb-4">📍 School Location</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Lazimpat, Ward No. 2<br />
                Kathmandu Metropolitan City<br />
                Bagmati Province, Nepal
              </p>
            </div>

            <div className="bg-[#E0F2FE] border border-[#7DD3FC] rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-[#1E3A2F] text-base mb-4">📞 Contact Details</h3>
              <ul className="space-y-3 text-sm text-[#6B7280]">
                <li><span className="font-bold text-[#1E3A2F]">Phone:</span> +977-1-4443210</li>
                <li><span className="font-bold text-[#1E3A2F]">Mobile:</span> +977-9801234567</li>
                <li><span className="font-bold text-[#1E3A2F]">Email:</span> info@sunriseschool.edu.np</li>
              </ul>
            </div>

            <div className="bg-[#FEF9C3] border border-[#FDE047] rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-[#1E3A2F] text-base mb-4">🕐 Office Hours</h3>
              <ul className="space-y-2 text-sm text-[#6B7280]">
                <li><span className="font-bold text-[#1E3A2F]">School Hours:</span> 9:00 AM – 4:00 PM</li>
                <li><span className="font-bold text-[#1E3A2F]">Office Hours:</span> 10:00 AM – 3:00 PM</li>
                <li><span className="font-bold text-[#1E3A2F]">Working Days:</span> Sunday – Friday</li>
                <li className="text-xs text-[#6B7280] pt-1">
                  * Closed on public holidays and school breaks
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
