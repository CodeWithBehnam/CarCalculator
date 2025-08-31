import React from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface PercentageInputProps {
  value: number
  onChange: (value: number) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  min?: number
  max?: number
  step?: number
  showSymbol?: boolean
}

export default function PercentageInput({
  value,
  onChange,
  placeholder = "0",
  className,
  disabled,
  min = 0,
  max = 100,
  step = 0.1,
  showSymbol = true,
  ...props
}: PercentageInputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, '')
    const numericValue = parseFloat(rawValue) || 0

    if (min !== undefined && numericValue < min) return
    if (max !== undefined && numericValue > max) return

    onChange(numericValue)
  }

  const displayValue = value === 0 && !placeholder ? '' :
    showSymbol ? `${value}%` : value.toString()

  return (
    <div className="relative">
      <Input
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={showSymbol ? `${placeholder}%` : placeholder}
        className={cn(className)}
        disabled={disabled}
        {...props}
      />
      {showSymbol && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">%</span>
        </div>
      )}
    </div>
  )
}
