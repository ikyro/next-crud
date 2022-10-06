import { ReactNode } from 'react'

export const Button = ({
  children,
  className,
  onClick,
  disabled = false,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}) => {
  return (
    <button
      className={`py-2 px-4 rounded-sm ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
