import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import FadeInSection from '../components/FadeInSection'

const classOptions = [
  'Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2',
  'Class 3', 'Class 4', 'Class 5',
]

export default function Contact() {
  const [form, setForm]       = useState({ name: '', phone: '', childName: '', classInterest: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleFocus = (e) => setFocusedField(e.target.name)
  const handleBlur = () => setFocusedField(null)

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { 
      setLoading(false)
      setSubmitted(true)
      
      // Fire confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FDE047', '#86EFAC', '#7DD3FC']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FDE047', '#86EFAC', '#7DD3FC']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }, 1200)
  }

  return (
    <div>
      {/* Page Header */}
      <div className="bg-[#E0F2FE] py-12 px-4 md:px-8 border-b border-[#7DD3FC]/40">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block bg-[#7DD3FC] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3">
              Get In Touch
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1E3A2F] mb-2">Contact Us</h1>
            <p className="text-[#6B7280] leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message or visit our school.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-14 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-[#FDE047] rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-extrabold text-[#1E3A2F] mb-6">Send Us a Message</h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-12"
                  >
                    <motion.div 
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="text-6xl mb-4"
                    >
                      🎉
                    </motion.div>
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
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <label className={`block text-sm font-bold mb-1.5 transition-colors ${focusedField === 'name' ? 'text-[#FDE047]' : 'text-[#1E3A2F]'}`} htmlFor="name">
                          Your Name *
                        </label>
                        <input
                          id="name" name="name" type="text" required
                          value={form.name} onChange={handleChange}
                          onFocus={handleFocus} onBlur={handleBlur}
                          placeholder="e.g. Sita Karmacharya"
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1E3A2F] placeholder-gray-300 focus:outline-none focus:border-[#FDE047] focus:ring-2 focus:ring-[#FDE047]/30 transition"
                        />
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <label className={`block text-sm font-bold mb-1.5 transition-colors ${focusedField === 'phone' ? 'text-[#FDE047]' : 'text-[#1E3A2F]'}`} htmlFor="phone">
                          Phone Number *
                        </label>
                        <input
                          id="phone" name="phone" type="tel" required
                          value={form.phone} onChange={handleChange}
                          onFocus={handleFocus} onBlur={handleBlur}
                          placeholder="e.g. 9801234567"
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1E3A2F] placeholder-gray-300 focus:outline-none focus:border-[#FDE047] focus:ring-2 focus:ring-[#FDE047]/30 transition"
                        />
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <label className={`block text-sm font-bold mb-1.5 transition-colors ${focusedField === 'childName' ? 'text-[#FDE047]' : 'text-[#1E3A2F]'}`} htmlFor="childName">
                          Child's Name *
                        </label>
                        <input
                          id="childName" name="childName" type="text" required
                          value={form.childName} onChange={handleChange}
                          onFocus={handleFocus} onBlur={handleBlur}
                          placeholder="e.g. Aarav Karmacharya"
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1E3A2F] placeholder-gray-300 focus:outline-none focus:border-[#FDE047] focus:ring-2 focus:ring-[#FDE047]/30 transition"
                        />
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <label className={`block text-sm font-bold mb-1.5 transition-colors ${focusedField === 'classInterest' ? 'text-[#FDE047]' : 'text-[#1E3A2F]'}`} htmlFor="classInterest">
                          Class Interested In *
                        </label>
                        <select
                          id="classInterest" name="classInterest" required
                          value={form.classInterest} onChange={handleChange}
                          onFocus={handleFocus} onBlur={handleBlur}
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1E3A2F] focus:outline-none focus:border-[#FDE047] focus:ring-2 focus:ring-[#FDE047]/30 transition bg-white"
                        >
                          <option value="">Select a class…</option>
                          {classOptions.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </motion.div>
                    </div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                      <label className={`block text-sm font-bold mb-1.5 transition-colors ${focusedField === 'message' ? 'text-[#FDE047]' : 'text-[#1E3A2F]'}`} htmlFor="message">
                        Message
                      </label>
                      <textarea
                        id="message" name="message" rows={4}
                        value={form.message} onChange={handleChange}
                        onFocus={handleFocus} onBlur={handleBlur}
                        placeholder="Any specific questions or information you'd like to share…"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1E3A2F] placeholder-gray-300 focus:outline-none focus:border-[#FDE047] focus:ring-2 focus:ring-[#FDE047]/30 transition resize-none"
                      />
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#FDE047] text-[#1E3A2F] font-bold py-3 rounded-full hover:bg-[#facc15] hover:shadow-md transition-all duration-200 disabled:opacity-60 relative overflow-hidden"
                    >
                      <AnimatePresence mode="wait">
                        {loading ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex items-center justify-center gap-2"
                          >
                            <motion.span 
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="inline-block"
                            >
                              ⏳
                            </motion.span>
                            Sending…
                          </motion.div>
                        ) : (
                          <motion.div
                            key="idle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                          >
                            ✉️ Send Message
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Info Card */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <FadeInSection delay={0.2} className="bg-[#F0FDF4] border border-[#86EFAC] rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-[#1E3A2F] text-base mb-4">📍 School Location</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Geruwa rural municipality-5<br />
                Pashupatinagar, Bardiya<br />
                Lumbini Province, Nepal
              </p>
            </FadeInSection>

            <FadeInSection delay={0.3} className="bg-[#E0F2FE] border border-[#7DD3FC] rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-[#1E3A2F] text-base mb-4">📞 Contact Details</h3>
              <ul className="space-y-3 text-sm text-[#6B7280]">
                <li><span className="font-bold text-[#1E3A2F]">Phone:</span> +977-1-4443210</li>
                <li><span className="font-bold text-[#1E3A2F]">Mobile:</span> +977-9801234567</li>
                <li><span className="font-bold text-[#1E3A2F]">Email:</span> info@mpems.edu.np</li>
              </ul>
            </FadeInSection>

            <FadeInSection delay={0.4} className="bg-[#FEF9C3] border border-[#FDE047] rounded-2xl p-6 shadow-sm">
              <h3 className="font-extrabold text-[#1E3A2F] text-base mb-4">🕐 Office Hours</h3>
              <ul className="space-y-2 text-sm text-[#6B7280]">
                <li><span className="font-bold text-[#1E3A2F]">School Hours:</span> 9:00 AM – 4:00 PM</li>
                <li><span className="font-bold text-[#1E3A2F]">Office Hours:</span> 10:00 AM – 3:00 PM</li>
                <li><span className="font-bold text-[#1E3A2F]">Working Days:</span> Sunday – Friday</li>
                <li className="text-xs text-[#6B7280] pt-1">
                  * Closed on public holidays and school breaks
                </li>
              </ul>
            </FadeInSection>
          </div>
        </div>
      </section>
    </div>
  )
}
