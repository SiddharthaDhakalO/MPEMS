const noticeItems = [
  "📢 Admission open for 2082 B.S. — Forms available at school office 10AM–3PM",
  "📢 Annual Sports Day on Falgun 15, 2081 — All parents cordially invited",
  "📢 School closed on Falgun 12 for Maha Shivaratri — Resumes next working day",
  "📢 First term exam timetable released — Check the notice board for details",
  "📢 Science Exhibition on Chaitra 5 — Class 3–5 students to participate",
]

export default function NoticeTicker() {
  return (
    <div className="w-full bg-[#FDE047] overflow-hidden py-2.5 flex items-center gap-3 border-y border-[#facc15]">
      <div className="shrink-0 px-3 ml-2">
        <span className="bg-[#86EFAC] text-[#1E3A2F] text-xs font-bold px-3 py-1 rounded-full">
          📢 Notice
        </span>
      </div>
      <div className="overflow-hidden flex-1">
        <p className="ticker-animate text-[#1E3A2F] text-sm font-semibold">
          {noticeItems.join('   •   ')}
        </p>
      </div>
    </div>
  )
}
