import { useState, useRef, useEffect, useId } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '../../../utils/cn'

export default function CustomSelect({
  options = [],
  value = '',
  onChange,
  placeholder = 'What do you need? *',
  error = false,
  id,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef(null)
  const listboxRef = useRef(null)
  const generatedId = useId()
  const selectId = id || generatedId

  const selectedOption = options.find((opt) => opt.value === value)

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen])

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listboxRef.current) {
      const items = listboxRef.current.querySelectorAll('[role="option"]')
      if (items[highlightedIndex]) {
        items[highlightedIndex].scrollIntoView({ block: 'nearest' })
      }
    }
  }, [isOpen, highlightedIndex])

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev
      if (next) {
        const currentIndex = options.findIndex((opt) => opt.value === value)
        setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0)
      }
      return next
    })
  }

  const handleSelect = (val) => {
    onChange?.(val)
    setIsOpen(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
        const currentIndex = options.findIndex((opt) => opt.value === value)
        setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0)
      } else {
        setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0))
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
        const currentIndex = options.findIndex((opt) => opt.value === value)
        setHighlightedIndex(currentIndex >= 0 ? currentIndex : options.length - 1)
      } else {
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1))
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (isOpen && highlightedIndex >= 0 && options[highlightedIndex]) {
        handleSelect(options[highlightedIndex].value)
      } else {
        handleToggle()
      }
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      setIsOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        id={selectId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${selectId}-listbox`}
        aria-activedescendant={
          isOpen && highlightedIndex >= 0 ? `${selectId}-opt-${highlightedIndex}` : undefined
        }
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full px-4 py-3 min-h-[48px] bg-surface border text-left rounded-sm transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer',
          error
            ? 'border-terracotta-light focus:outline-none focus:border-terracotta-light focus:ring-1 focus:ring-terracotta-light'
            : 'border-warm-2 hover:border-warm-3 focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass',
          isOpen && 'border-brass ring-1 ring-brass',
        )}
      >
        <span
          className={cn(
            'truncate text-base',
            selectedOption ? 'text-off-white font-normal' : 'text-placeholder font-normal',
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <ChevronDown
          size={18}
          className={cn(
            'shrink-0 text-placeholder transition-transform duration-300 ease-smooth',
            isOpen && 'rotate-180 text-brass',
          )}
        />
      </button>

      {isOpen && (
        <ul
          ref={listboxRef}
          id={`${selectId}-listbox`}
          role="listbox"
          tabIndex={-1}
          className="absolute z-50 top-[calc(100%+4px)] left-0 right-0 max-h-60 overflow-y-auto bg-surface-elevated border border-warm-2 rounded-sm py-1.5 shadow-2xl backdrop-blur-md"
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === value
            const isHighlighted = i === highlightedIndex

            return (
              <li
                key={opt.value}
                id={`${selectId}-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                onMouseEnter={() => setHighlightedIndex(i)}
                className={cn(
                  'px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between transition-colors duration-150',
                  isSelected
                    ? 'text-brass bg-surface font-medium'
                    : isHighlighted
                    ? 'text-off-white bg-surface'
                    : 'text-off-white/75 hover:text-off-white hover:bg-surface',
                )}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={14} className="text-brass shrink-0" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
