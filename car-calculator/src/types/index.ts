export type CarType = 'new' | 'used'

export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid'

export type FinanceType = 'cash' | 'loan' | 'pcp' | 'hp' | 'lease'

export interface CarData {
  purchasePrice: number
  carType: CarType
  make: string
  model: string
  fuelType: FuelType
  annualMileage: number
  driverAge: number
  noClaimsYears: number
  postcode: string
  financeType: FinanceType
  deposit: number
  loanTerm: number
  interestRate: number
  balloonPayment: number
  leaseTerm: number
  leaseMileage: number
  resaleValue: number
  fuelEfficiency: number
  fuelPrice: number
  electricityPrice: number
  homeCharging: boolean
  publicChargingFrequency: number
  insuranceGroup: number
  annualParking: number
  congestionZone: boolean
  motFrequency: number
  servicingInterval: number
  annualMaintenance: number
  tyreReplacement: number
  breakdownCover: boolean
  breakdownCost: number
  warrantyLength: number
  roadTaxBand: string
  depreciationRate: number
  ownershipYears: number
  inflationRate: number
}

export interface CalculationResults {
  upfrontCost: number
  monthlyPayment: number
  totalInterest: number
  annualFuelCost: number
  totalFuelCost: number
  annualInsurance: number
  totalInsurance: number
  annualRoadTax: number
  totalRoadTax: number
  annualMOT: number
  totalMaintenance: number
  depreciationLoss: number
  totalCostOfOwnership: number
  costPerMile: number
  breakEvenYears: number
  breakEvenMileage: number
  netCost: number
}

export interface UKCarModel {
  id: string
  make: string
  model: string
  year: number
  fuelType: FuelType
  fuelEfficiency: number
  insuranceGroup: number
  roadTaxBand: string
  co2Emissions: number
  averagePrice: number
}

export interface PostcodeData {
  postcode: string
  region: string
  insuranceRisk: 'low' | 'medium' | 'high'
  congestionZones: string[]
  averageInsurance: number
}

export interface FuelPriceData {
  petrol: number
  diesel: number
  electricity: {
    home: number
    public: number
  }
  lastUpdated: string
}

export interface ValidationError {
  field: keyof CarData
  message: string
}

export interface Scenario {
  id: string
  name: string
  data: CarData
  results: CalculationResults
  createdAt: string
}
