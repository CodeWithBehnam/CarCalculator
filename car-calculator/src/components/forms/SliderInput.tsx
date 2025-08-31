import React from 'react'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SliderInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  unit?: string
  tooltip?: string
  description?: string
  className?: string
  disabled?: boolean
}

export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  tooltip,
  description,
  className,
  disabled
}: SliderInputProps) {
  const handleSliderChange = (values: number[]) => {
    onChange(values[0])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || min
    const clampedValue = Math.max(min, Math.min(max, newValue))
    onChange(clampedValue)
  }

  const percentage = ((value - min) / (max - min)) * 100

  return (
    <TooltipProvider>
      <div className={cn("space-y-3", className)}>
        <div className="flex items-center space-x-2">
          <Label className="text-sm font-medium">
            {label}: {value.toLocaleString()}{unit}
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

        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        <div className="space-y-3">
          <Slider
            value={[value]}
            onValueChange={handleSliderChange}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className="w-full"
          />

          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={value}
              onChange={handleInputChange}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground">
              Range: {min.toLocaleString()} - {max.toLocaleString()}{unit}
            </span>
          </div>
        </div>

        {/* Visual progress indicator */}
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-200"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </TooltipProvider>
  )
}
