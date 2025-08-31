import { CarData, CalculationResults } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, TrendingUp, DollarSign, Car, Fuel, Shield, FileText, Wrench } from 'lucide-react'
import { formatCurrency, formatNumber } from '@/lib/utils'

interface ResultsDisplayProps {
  carData: CarData
  results: CalculationResults
  onBack: () => void
}

export default function ResultsDisplay({ carData, results, onBack }: ResultsDisplayProps) {
  const totalCostBreakdown = [
    { label: 'Purchase/Finance', value: results.upfrontCost + results.totalInterest, icon: Car },
    { label: 'Fuel/Energy', value: results.totalFuelCost, icon: Fuel },
    { label: 'Insurance', value: results.totalInsurance, icon: Shield },
    { label: 'Road Tax', value: results.totalRoadTax, icon: FileText },
    { label: 'Maintenance', value: results.totalMaintenance, icon: Wrench },
    { label: 'Depreciation', value: results.depreciationLoss, icon: TrendingUp }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Calculator</span>
        </Button>
        <h2 className="text-2xl font-bold">Cost Analysis Results</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost of Ownership</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(results.totalCostOfOwnership)}</div>
            <p className="text-xs text-muted-foreground">
              Over {carData.ownershipYears} years
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payment</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(results.monthlyPayment)}</div>
            <p className="text-xs text-muted-foreground">
              {carData.financeType !== 'cash' ? 'Finance payment' : 'N/A'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Running Cost</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency((results.annualFuelCost + results.annualInsurance + results.annualRoadTax) / carData.ownershipYears)}
            </div>
            <p className="text-xs text-muted-foreground">
              Fuel, insurance, tax
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost per Mile</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(results.costPerMile)}</div>
            <p className="text-xs text-muted-foreground">
              Total cost ÷ total miles
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
          <CardDescription>
            Detailed breakdown of all ownership costs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {totalCostBreakdown.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <item.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{item.label}</span>
              </div>
              <span className="font-medium">{formatCurrency(item.value)}</span>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between font-bold">
              <span>Total Cost of Ownership</span>
              <span>{formatCurrency(results.totalCostOfOwnership)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Car Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Vehicle:</span>
              <p className="font-medium">{carData.make} {carData.model}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Type:</span>
              <p className="font-medium capitalize">{carData.carType}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Fuel:</span>
              <p className="font-medium capitalize">{carData.fuelType}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Annual Mileage:</span>
              <p className="font-medium">{formatNumber(carData.annualMileage)} miles</p>
            </div>
            <div>
              <span className="text-muted-foreground">Purchase Price:</span>
              <p className="font-medium">{formatCurrency(carData.purchasePrice)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Finance:</span>
              <p className="font-medium capitalize">{carData.financeType}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Ownership:</span>
              <p className="font-medium">{carData.ownershipYears} years</p>
            </div>
            <div>
              <span className="text-muted-foreground">Driver Age:</span>
              <p className="font-medium">{carData.driverAge} years</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}