import { cn } from '../../../utils/cn'
import { CATEGORIES } from '../../../config/theme'

export default function CategoryFilter({ active, onChange }) {
  const options = [{ value: 'all', label: 'All' }, ...CATEGORIES]

  return (
    <div className="flex flex-wrap gap-3" role="tablist" aria-label="Filter photos by category">
      {options.map((cat) => (
        <button
          key={cat.value}
          role="tab"
          aria-selected={active === cat.value}
          onClick={() => onChange(cat.value)}
          className={cn(
            'px-5 py-2 text-sm font-medium rounded-sm transition-all duration-300 border focus-visible:outline-2 focus-visible:outline-brass',
            active === cat.value
              ? 'bg-brass text-[var(--color-base)] border-brass font-semibold'
              : 'bg-transparent text-off-white/75 border-warm-2 hover:border-warm-3 hover:text-off-white',
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
