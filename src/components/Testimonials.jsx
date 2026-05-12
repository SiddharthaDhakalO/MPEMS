const testimonials = [
  {
    quote: "My daughter joined Nursery here and now she is in Class 3. The teachers are so caring and patient. She wakes up every morning excited to go to school — that says everything!",
    name: "Kamala Shrestha",
    child: "Parent of Aarti, Class 3",
    initials: "KS",
    bg: "bg-[#FDE047]",
  },
  {
    quote: "The school's focus on both academics and overall personality development is remarkable. My son has become much more confident and is learning both English and Nepali beautifully.",
    name: "Ramesh Adhikari",
    child: "Parent of Rohan, Class 2",
    initials: "RA",
    bg: "bg-[#86EFAC]",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#FEF9C3] text-[#1E3A2F] text-xs font-bold px-4 py-1 rounded-full mb-3 border border-[#FDE047]">
            Parent Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E3A2F] mb-2">
            What Parents Say
          </h2>
          <p className="text-[#6B7280] text-sm">Words from our wonderful school community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map(t => (
            <div
              key={t.name}
              className="bg-white border border-[#FDE047] rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <p className="text-4xl text-[#FDE047] font-serif leading-none mb-3">"</p>
              <p className="italic text-[#1E3A2F] text-sm leading-relaxed mb-6">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 ${t.bg} rounded-full flex items-center justify-center font-extrabold text-[#1E3A2F] text-sm shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-[#1E3A2F] text-sm">{t.name}</p>
                  <p className="text-[#6B7280] text-xs">{t.child}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
