import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num: number, decimals = 0): string {
  return new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

export function calculatePMT(rate: number, nper: number, pv: number): number {
  if (rate === 0) return pv / nper
  const pvif = Math.pow(1 + rate, nper)
  return (rate * pv * pvif) / (pvif - 1)
}

export function calculateDepreciation(
  purchasePrice: number,
  currentYear: number,
  totalYears: number,
  depreciationRate: number = 0.15
): number {
  const age = currentYear
  return purchasePrice * Math.pow(1 - depreciationRate, age)
}

export function validatePostcode(postcode: string): boolean {
  const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i
  return postcodeRegex.test(postcode.trim())
}
