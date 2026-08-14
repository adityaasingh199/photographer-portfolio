import { cn } from '../../../utils/cn'

export default function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={cn(
        'animate-pulse bg-warm-1 rounded-sm',
        className,
      )}
      {...props}
    />
  )
}
