import { CarData, CalculationResults, FuelType, FinanceType } from '@/types'
import { calculatePMT } from './utils'

export function calculateCarCosts(data: CarData): CalculationResults {
  // Financing calculations
  const { upfrontCost, monthlyPayment, totalInterest } = calculateFinancingCosts(data)

  // Fuel/Energy costs
  const { annualFuelCost, totalFuelCost } = calculateFuelCosts(data)

  // Insurance costs
  const { annualInsurance, totalInsurance } = calculateInsuranceCosts(data)

  // Road tax costs
  const { annualRoadTax, totalRoadTax } = calculateRoadTaxCosts(data)

  // Maintenance costs
  const { annualMOT, totalMaintenance } = calculateMaintenanceCosts(data)

  // Depreciation
  const depreciationLoss = data.purchasePrice - data.resaleValue

  // Total cost of ownership
  const totalCostOfOwnership = upfrontCost + totalFuelCost + totalInsurance +
    totalRoadTax + totalMaintenance + depreciationLoss

  // Cost per mile
  const totalMiles = data.annualMileage * data.ownershipYears
  const costPerMile = totalCostOfOwnership / totalMiles

  // Break-even analysis (simplified)
  const breakEvenYears = calculateBreakEven(data)
  const breakEvenMileage = calculateBreakEvenMileage(data)

  // Net cost after resale
  const netCost = totalCostOfOwnership - data.resaleValue

  return {
    upfrontCost,
    monthlyPayment,
    totalInterest,
    annualFuelCost,
    totalFuelCost,
    annualInsurance,
    totalInsurance,
    annualRoadTax,
    totalRoadTax,
    annualMOT,
    totalMaintenance,
    depreciationLoss,
    totalCostOfOwnership,
    costPerMile,
    breakEvenYears,
    breakEvenMileage,
    netCost
  }
}

function calculateFinancingCosts(data: CarData): {
  upfrontCost: number
  monthlyPayment: number
  totalInterest: number
} {
  const { financeType, purchasePrice, deposit, loanTerm, interestRate, balloonPayment, leaseTerm, leaseMileage } = data

  switch (financeType) {
    case 'cash':
      return {
        upfrontCost: purchasePrice,
        monthlyPayment: 0,
        totalInterest: 0
      }

    case 'loan':
    case 'hp':
      const loanAmount = purchasePrice - deposit
      const monthlyRate = interestRate / 100 / 12
      const monthlyPayment = calculatePMT(monthlyRate, loanTerm, loanAmount)
      const totalPaid = monthlyPayment * loanTerm
      const totalInterest = totalPaid - loanAmount

      return {
        upfrontCost: deposit,
        monthlyPayment,
        totalInterest
      }

    case 'pcp':
      const pcpAmount = purchasePrice - deposit - balloonPayment
      const pcpMonthlyRate = interestRate / 100 / 12
      const pcpMonthlyPayment = calculatePMT(pcpMonthlyRate, loanTerm, pcpAmount)
      const pcpTotalPaid = pcpMonthlyPayment * loanTerm + balloonPayment
      const pcpTotalInterest = pcpTotalPaid - (purchasePrice - deposit)

      return {
        upfrontCost: deposit,
        monthlyPayment: pcpMonthlyPayment,
        totalInterest: pcpTotalInterest
      }

    case 'lease':
      // Simplified lease calculation
      const leaseMonthlyPayment = (purchasePrice * 0.02) + (leaseMileage * 0.0001)
      const leaseUpfrontCost = deposit
      const leaseTotalInterest = 0 // Leases don't typically charge interest

      return {
        upfrontCost: leaseUpfrontCost,
        monthlyPayment: leaseMonthlyPayment,
        totalInterest: leaseTotalInterest
      }

    default:
      return { upfrontCost: 0, monthlyPayment: 0, totalInterest: 0 }
  }
}

function calculateFuelCosts(data: CarData): { annualFuelCost: number; totalFuelCost: number } {
  const { fuelType, annualMileage, fuelEfficiency, fuelPrice, electricityPrice, homeCharging, publicChargingFrequency } = data

  let annualFuelCost = 0

  switch (fuelType) {
    case 'petrol':
    case 'diesel':
      // Convert MPG to litres per mile, then multiply by price
      const litresPerMile = 4.546 / fuelEfficiency // Convert UK gallons to litres
      annualFuelCost = annualMileage * litresPerMile * fuelPrice
      break

    case 'electric':
      // Calculate blended charging cost
      const homeRate = electricityPrice * 0.8 // Assuming home charging is cheaper
      const publicRate = electricityPrice * 1.5 // Public charging is more expensive
      const homePortion = (100 - publicChargingFrequency) / 100
      const publicPortion = publicChargingFrequency / 100

      const blendedRate = (homeRate * homePortion) + (publicRate * publicPortion)
      annualFuelCost = annualMileage * blendedRate / fuelEfficiency // kWh per mile
      break

    case 'hybrid':
      // Simplified hybrid calculation - assume 50/50 split
      const petrolPortion = annualMileage * 0.5
      const electricPortion = annualMileage * 0.5

      const petrolLitres = (4.546 / fuelEfficiency) * petrolPortion
      const petrolCost = petrolLitres * fuelPrice

      const electricCost = (electricPortion * electricityPrice) / (fuelEfficiency * 2) // Assuming lower efficiency for electric portion

      annualFuelCost = petrolCost + electricCost
      break
  }

  const totalFuelCost = annualFuelCost * data.ownershipYears * (1 + data.inflationRate / 100)

  return { annualFuelCost, totalFuelCost }
}

function calculateInsuranceCosts(data: CarData): { annualInsurance: number; totalInsurance: number } {
  const { driverAge, noClaimsYears, insuranceGroup, annualMileage } = data

  // Simplified insurance calculation based on UK averages
  let basePremium = 600 // Base annual premium

  // Age multiplier
  if (driverAge < 25) basePremium *= 2.5
  else if (driverAge < 30) basePremium *= 1.8
  else if (driverAge > 60) basePremium *= 1.2

  // No claims discount
  const noClaimsDiscount = Math.min(noClaimsYears * 0.1, 0.7) // Max 70% discount
  basePremium *= (1 - noClaimsDiscount)

  // Insurance group multiplier
  const groupMultiplier = 1 + ((insuranceGroup - 25) * 0.05) // Higher groups cost more
  basePremium *= groupMultiplier

  // Mileage adjustment
  if (annualMileage > 12000) basePremium *= 1.2
  else if (annualMileage < 6000) basePremium *= 0.9

  const annualInsurance = basePremium
  const totalInsurance = annualInsurance * data.ownershipYears * (1 + data.inflationRate / 100)

  return { annualInsurance, totalInsurance }
}

function calculateRoadTaxCosts(data: CarData): { annualRoadTax: number; totalRoadTax: number } {
  const { roadTaxBand, ownershipYears } = data

  // Simplified VED rates based on UK bands (2023/24)
  const vedRates: Record<string, number> = {
    'A': 0,
    'B': 25,
    'C': 110,
    'D': 150,
    'E': 180,
    'F': 200,
    'G': 240,
    'H': 290,
    'I': 320,
    'J': 365,
    'K': 400,
    'L': 470,
    'M': 520
  }

  const annualRoadTax = vedRates[roadTaxBand] || 180 // Default to band E
  const totalRoadTax = annualRoadTax * ownershipYears

  return { annualRoadTax, totalRoadTax }
}

function calculateMaintenanceCosts(data: CarData): { annualMOT: number; totalMaintenance: number } {
  const { annualMaintenance, motFrequency, servicingInterval, annualMileage, breakdownCost, breakdownCover } = data

  const annualMOT = 54.85 // Current UK MOT cost
  const annualServicing = (annualMileage / servicingInterval) * 300 // Average service cost
  const annualBreakdown = breakdownCover ? breakdownCost : 0

  const annualTotalMaintenance = annualMaintenance + annualMOT + annualServicing + annualBreakdown
  const totalMaintenance = annualTotalMaintenance * data.ownershipYears * (1 + data.inflationRate / 100)

  return { annualMOT, totalMaintenance }
}

function calculateBreakEven(data: CarData): number {
  // Simplified break-even calculation comparing different finance options
  // This would need more sophisticated logic in a real implementation
  return 3.5 // Placeholder
}

function calculateBreakEvenMileage(data: CarData): number {
  // Calculate mileage where electric/hybrid becomes cheaper than petrol
  // Simplified calculation
  const petrolCostPerMile = (4.546 / data.fuelEfficiency) * data.fuelPrice
  const electricCostPerMile = data.electricityPrice / data.fuelEfficiency

  if (electricCostPerMile >= petrolCostPerMile) return Infinity

  // This is a simplified calculation - in reality would need more factors
  return 10000 // Placeholder
}
