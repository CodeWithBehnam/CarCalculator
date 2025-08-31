import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { HelpCircle, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PostcodeInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  tooltip?: string
  className?: string
  disabled?: boolean
}

export default function PostcodeInput({
  value,
  onChange,
  label = "UK Postcode",
  tooltip = "Enter your UK postcode for accurate insurance and tax calculations",
  className,
  disabled
}: PostcodeInputProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const validatePostcode = (postcode: string): boolean => {
    // UK postcode regex pattern
    const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i
    return postcodeRegex.test(postcode.trim())
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase()
    onChange(newValue)

    if (newValue.length > 0) {
      setIsValid(validatePostcode(newValue))
    } else {
      setIsValid(null)
    }
  }

  const handleBlur = () => {
    if (value.length > 0) {
      setIsValid(validatePostcode(value))
    }
  }

  const formatPostcode = (postcode: string): string => {
    // Add space in the correct position for UK postcodes
    const cleaned = postcode.replace(/\s/g, '').toUpperCase()
    if (cleaned.length > 3) {
      return `${cleaned.slice(0, -3)} ${cleaned.slice(-3)}`
    }
    return cleaned
  }

  const handleFocus = () => {
    // Format postcode on focus
    if (value && !value.includes(' ')) {
      onChange(formatPostcode(value))
    }
  }

  return (
    <TooltipProvider>
      <div className={cn("space-y-2", className)}>
        <div className="flex items-center space-x-2">
          <Label htmlFor="postcode" className="text-sm font-medium">
            {label}
          </Label>
          {tooltip && (
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <div className="relative">
          <Input
            id="postcode"
            type="text"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder="SW1A 1AA"
            disabled={disabled}
            maxLength={8}
            className={cn(
              "pr-10",
              isValid === true && "border-green-500 focus:border-green-500",
              isValid === false && "border-red-500 focus:border-red-500"
            )}
          />

          {isValid === true && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          )}

          {isValid === false && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>

        {isValid === false && (
          <p className="text-sm text-red-600">
            Please enter a valid UK postcode (e.g., SW1A 1AA)
          </p>
        )}

        <p className="text-xs text-muted-foreground">
          Used to determine regional insurance rates and congestion charges
        </p>
      </div>
    </TooltipProvider>
  )
}
