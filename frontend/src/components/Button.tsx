import React from 'react'

interface ButtonProps {
  className?: string
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  className,
  disabled = false,
  onClick,
  children
}) => {
  return (
    <button
      className={`rounded-full border border-neutral-900 py-1 px-3 disabled:cursor-not-allowed disabled:border-neutral-400 disabled:text-neutral-400 dark:border-neutral-50 disabled:dark:border-neutral-600 disabled:dark:text-neutral-600 ${className} ${
        !disabled && 'clickable'
      }`}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
