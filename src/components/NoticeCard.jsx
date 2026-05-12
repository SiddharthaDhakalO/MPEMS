export default function NoticeCard({ notice }) {
  const tagStyles = {
    Admissions: 'bg-[#86EFAC] text-[#1E3A2F]',
    Event:      'bg-[#FDE047] text-[#1E3A2F]',
    Holiday:    'bg-[#7DD3FC] text-[#1E3A2F]',
  }

  return (
    <div className="flex gap-4 bg-white border border-[#FDE047] rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Date badge */}
      <div className="shrink-0 w-16 bg-[#1a5c3a] text-white rounded-xl flex flex-col items-center justify-center text-center py-3 px-1">
        <span className="text-[10px] font-semibold text-green-200 uppercase tracking-wide leading-none">
          {notice.date_bs.split(' ')[0]}
        </span>
        <span className="text-xl font-extrabold leading-tight">
          {notice.date_bs.split(' ')[1]?.replace(',', '')}
        </span>
        <span className="text-[10px] text-green-200 leading-none">
          {notice.date_bs.split(' ')[2]}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${tagStyles[notice.tag] || 'bg-gray-100 text-gray-700'}`}>
            {notice.tag}
          </span>
          <span className="text-[11px] text-[#6B7280]">{notice.date_en}</span>
        </div>
        <h3 className="font-bold text-[#1E3A2F] text-sm sm:text-base leading-snug mb-1">
          {notice.title}
        </h3>
        <p className="text-[#6B7280] text-sm leading-relaxed line-clamp-2">
          {notice.desc}
        </p>
      </div>
    </div>
  )
}
