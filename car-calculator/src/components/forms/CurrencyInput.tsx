import React from 'react'
import { Input } from '@/components/ui/input'
import { cn, formatCurrency } from '@/lib/utils'

interface CurrencyInputProps {
  value: number
  onChange: (value: number) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  min?: number
  max?: number
  step?: number
}

export default function CurrencyInput({
  value,
  onChange,
  placeholder = "0",
  className,
  disabled,
  min,
  max,
  step = 1,
  ...props
}: CurrencyInputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, '')
    const numericValue = parseFloat(rawValue) || 0

    if (min !== undefined && numericValue < min) return
    if (max !== undefined && numericValue > max) return

    onChange(numericValue)
  }

  const displayValue = value === 0 && !placeholder ? '' : formatCurrency(value)

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm">£</span>
      </div>
      <Input
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={`£${placeholder}`}
        className={cn("pl-8", className)}
        disabled={disabled}
        {...props}
      />
    </div>
  )
}
