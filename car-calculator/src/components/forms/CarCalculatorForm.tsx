import { useState } from 'react'
import { Calculator, HelpCircle, Fuel, Car as CarIcon, Shield, Wrench, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { CarData } from '@/types'
import CurrencyInput from './CurrencyInput'
import SliderInput from './SliderInput'
import PercentageInput from './PercentageInput'
import PostcodeInput from './PostcodeInput'
import { formatCurrency } from '@/lib/utils'

interface CarCalculatorFormProps {
  onCalculate: (data: CarData) => void
}

export default function CarCalculatorForm({ onCalculate }: CarCalculatorFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [formData, setFormData] = useState<Partial<CarData>>({
    purchasePrice: 25000,
    carType: 'new',
    make: '',
    model: '',
    fuelType: 'petrol',
    annualMileage: 8000,
    driverAge: 30,
    noClaimsYears: 0,
    postcode: '',
    financeType: 'cash',
    deposit: 0,
    loanTerm: 60,
    interestRate: 7.5,
    balloonPayment: 0,
    leaseTerm: 36,
    leaseMileage: 10000,
    ownershipYears: 5,
    fuelEfficiency: 50,
    fuelPrice: 1.75,
    electricityPrice: 0.30,
    homeCharging: true,
    publicChargingFrequency: 20,
    depreciationRate: 15,
    inflationRate: 2.5,
    resaleValue: 15000,
    insuranceGroup: 25,
    annualMaintenance: 500,
    annualParking: 0,
    congestionZone: false,
    motFrequency: 1,
    servicingInterval: 12000,
    tyreReplacement: 20000,
    breakdownCover: true,
    breakdownCost: 150,
    warrantyLength: 3,
    roadTaxBand: 'D'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.purchasePrice && formData.make && formData.model) {
      onCalculate(formData as CarData)
    }
  }

  const updateFormData = (field: keyof CarData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Purchase Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="purchasePrice">Purchase Price</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The full retail price before any discounts or trade-ins</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CurrencyInput
              value={formData.purchasePrice || 0}
              onChange={(value) => updateFormData('purchasePrice', value)}
              placeholder="25000"
              min={1}
              max={200000}
            />
            {(formData.purchasePrice || 0) === 0 && (
              <p className="text-sm text-red-500">Purchase price is required</p>
            )}
            {(formData.purchasePrice || 0) > 100000 && (
              <p className="text-sm text-yellow-600">High-value car may have different insurance and tax implications</p>
            )}
          </div>

          {/* Car Type */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="carType">Car Type</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>New cars depreciate faster but have full warranty. Used cars have lower initial cost but higher maintenance risk.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select 
              value={formData.carType || 'new'} 
              onValueChange={(value) => {
                updateFormData('carType', value as 'new' | 'used')
                // Auto-adjust warranty and depreciation based on car type
                if (value === 'new') {
                  updateFormData('warrantyLength', 3)
                  updateFormData('depreciationRate', 20)
                } else {
                  updateFormData('warrantyLength', 1)
                  updateFormData('depreciationRate', 10)
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select car type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New Car</SelectItem>
                <SelectItem value="used">Used Car</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {formData.carType === 'new' 
                ? 'New cars have higher depreciation but full warranty'
                : 'Used cars have lower depreciation but may need more maintenance'
              }
            </p>
          </div>

          {/* Make and Model */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="make">Make</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Car manufacturer (e.g., Toyota, BMW, Ford)</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select 
              value={formData.make || ''} 
              onValueChange={(value) => {
                updateFormData('make', value)
                updateFormData('model', '') // Reset model when make changes
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="audi">Audi</SelectItem>
                <SelectItem value="bmw">BMW</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="hyundai">Hyundai</SelectItem>
                <SelectItem value="kia">Kia</SelectItem>
                <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                <SelectItem value="nissan">Nissan</SelectItem>
                <SelectItem value="peugeot">Peugeot</SelectItem>
                <SelectItem value="renault">Renault</SelectItem>
                <SelectItem value="tesla">Tesla</SelectItem>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="vauxhall">Vauxhall</SelectItem>
                <SelectItem value="volkswagen">Volkswagen</SelectItem>
                <SelectItem value="volvo">Volvo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="model">Model</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Specific car model (e.g., Corolla, Golf, Focus)</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="model"
              placeholder="e.g. Corolla"
              value={formData.model || ''}
              onChange={(e) => updateFormData('model', e.target.value)}
            />
            {!formData.model && (
              <p className="text-sm text-red-500">Model is required</p>
            )}
          </div>

          {/* Fuel Type */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2">
              <Label>Fuel Type</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Affects fuel costs, road tax, and congestion charges. Electric vehicles often have lower running costs.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <RadioGroup
              value={formData.fuelType || 'petrol'}
              onValueChange={(value) => {
                updateFormData('fuelType', value as any)
                // Auto-adjust fuel efficiency based on type
                if (value === 'electric') {
                  updateFormData('fuelEfficiency', 4.0)
                  updateFormData('roadTaxBand', 'A') // Electric cars are usually band A
                } else if (value === 'hybrid') {
                  updateFormData('fuelEfficiency', 60)
                } else {
                  updateFormData('fuelEfficiency', 50)
                }
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="petrol" id="petrol" />
                <Label htmlFor="petrol" className="text-sm font-normal cursor-pointer flex items-center space-x-2">
                  <Fuel className="h-4 w-4 text-orange-500" />
                  <span>Petrol</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="diesel" id="diesel" />
                <Label htmlFor="diesel" className="text-sm font-normal cursor-pointer flex items-center space-x-2">
                  <Fuel className="h-4 w-4 text-gray-600" />
                  <span>Diesel</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="electric" id="electric" />
                <Label htmlFor="electric" className="text-sm font-normal cursor-pointer flex items-center space-x-2">
                  <span className="h-4 w-4 text-green-500">⚡</span>
                  <span>Electric</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="hybrid" id="hybrid" />
                <Label htmlFor="hybrid" className="text-sm font-normal cursor-pointer flex items-center space-x-2">
                  <span className="h-4 w-4 text-blue-500">🔋</span>
                  <span>Hybrid</span>
                </Label>
              </div>
            </RadioGroup>
            <p className="text-xs text-muted-foreground">
              Choose the primary fuel type for accurate cost calculations and tax implications
            </p>
          </div>

          {/* Driver Age */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="driverAge">Driver Age</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Age significantly affects insurance premiums. Drivers under 25 typically pay much higher rates.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="driverAge"
              type="number"
              placeholder="30"
              min="17"
              max="100"
              value={formData.driverAge || ''}
              onChange={(e) => updateFormData('driverAge', parseInt(e.target.value) || 0)}
            />
            {(formData.driverAge || 0) < 17 && (
              <p className="text-sm text-red-500">Driver must be at least 17 years old (UK driving age)</p>
            )}
            {(formData.driverAge || 0) < 25 && (formData.driverAge || 0) >= 17 && (
              <p className="text-sm text-yellow-600">Young drivers typically face higher insurance premiums</p>
            )}
          </div>

          {/* No Claims Bonus */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="noClaimsYears">No Claims Bonus (Years)</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Years without making an insurance claim. Each year typically reduces premiums by 10-15%.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="noClaimsYears"
              type="number"
              placeholder="0"
              min="0"
              max="10"
              value={formData.noClaimsYears || ''}
              onChange={(e) => updateFormData('noClaimsYears', parseInt(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground">
              {formData.noClaimsYears === 0 
                ? 'New drivers start with 0 years'
                : `Estimated ${Math.min((formData.noClaimsYears || 0) * 10, 70)}% discount on insurance`
              }
            </p>
          </div>
        </div>

        {/* Annual Mileage Slider */}
        <SliderInput
          label="Annual Mileage"
          value={formData.annualMileage || 8000}
          onChange={(value) => updateFormData('annualMileage', value)}
          min={1000}
          max={50000}
          step={1000}
          unit=" miles"
          tooltip="Expected annual mileage affects fuel costs, maintenance, and insurance premiums"
          description="UK average is around 7,000-8,000 miles per year"
        />

        {/* Postcode */}
        <PostcodeInput
          value={formData.postcode || ''}
          onChange={(value) => updateFormData('postcode', value)}
          tooltip="Used to determine regional insurance rates and congestion charges like ULEZ"
        />

        {/* Finance Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CarIcon className="h-5 w-5" />
              <span>Finance Options</span>
            </CardTitle>
            <CardDescription>
              Choose how you'll pay for the car and enter relevant finance details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2 lg:col-span-3">
                <div className="flex items-center space-x-2">
                  <Label>Finance Type</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="max-w-xs">
                        <p><strong>Cash:</strong> Pay in full upfront</p>
                        <p><strong>Loan:</strong> Borrow money, own the car</p>
                        <p><strong>PCP:</strong> Lower monthly payments with balloon payment</p>
                        <p><strong>HP:</strong> Hire purchase, own at end</p>
                        <p><strong>Lease:</strong> Rent the car, return at end</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select 
                  value={formData.financeType || 'cash'} 
                  onValueChange={(value) => updateFormData('financeType', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select finance type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash Purchase</SelectItem>
                    <SelectItem value="loan">Personal Loan</SelectItem>
                    <SelectItem value="pcp">PCP (Personal Contract Purchase)</SelectItem>
                    <SelectItem value="hp">HP (Hire Purchase)</SelectItem>
                    <SelectItem value="lease">Lease</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Conditional Finance Fields */}
              {(formData.financeType === 'loan' || formData.financeType === 'hp' || formData.financeType === 'pcp') && (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Label>Deposit</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Initial payment. Higher deposits reduce monthly payments and interest charges.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <CurrencyInput
                      value={formData.deposit || 0}
                      onChange={(value) => updateFormData('deposit', value)}
                      placeholder="2000"
                      max={formData.purchasePrice || 100000}
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.deposit && formData.purchasePrice 
                        ? `${Math.round((formData.deposit / formData.purchasePrice) * 100)}% of purchase price`
                        : 'Typically 10-20% of purchase price'
                      }
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Label>Loan Term</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Longer terms mean lower monthly payments but more interest paid overall.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <SliderInput
                      label=""
                      value={formData.loanTerm || 60}
                      onChange={(value) => updateFormData('loanTerm', value)}
                      min={12}
                      max={84}
                      step={12}
                      unit=" months"
                      className="mt-0"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Label>Interest Rate (APR)</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Annual Percentage Rate from your lender. Check comparison sites for current rates.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <PercentageInput
                      value={formData.interestRate || 7.5}
                      onChange={(value) => updateFormData('interestRate', value)}
                      placeholder="7.5"
                      min={0}
                      max={20}
                      step={0.1}
                    />
                    <p className="text-xs text-muted-foreground">
                      Current UK average: 6-9% for good credit
                    </p>
                  </div>

                  {/* PCP Balloon Payment */}
                  {formData.financeType === 'pcp' && (
                    <div className="space-y-2 lg:col-span-3">
                      <div className="flex items-center space-x-2">
                        <Label>Balloon Payment</Label>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Final optional payment to own the car. Based on predicted resale value.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <CurrencyInput
                        value={formData.balloonPayment || 0}
                        onChange={(value) => updateFormData('balloonPayment', value)}
                        placeholder="8000"
                        max={formData.purchasePrice || 100000}
                      />
                      <p className="text-xs text-muted-foreground">
                        Suggested: {formData.resaleValue ? formatCurrency(formData.resaleValue) : '£8,000-12,000'} (based on resale value)
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Lease Fields */}
              {formData.financeType === 'lease' && (
                <>
                  <div className="space-y-2">
                    <Label>Lease Term</Label>
                    <SliderInput
                      label=""
                      value={formData.leaseTerm || 36}
                      onChange={(value) => updateFormData('leaseTerm', value)}
                      min={24}
                      max={60}
                      step={12}
                      unit=" months"
                      className="mt-0"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Label>Annual Mileage Allowance</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Exceeding this limit incurs excess mileage charges (typically 10p/mile).</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      type="number"
                      value={formData.leaseMileage || ''}
                      onChange={(e) => updateFormData('leaseMileage', parseInt(e.target.value) || 0)}
                      placeholder="10000"
                      min="5000"
                      max="30000"
                    />
                    {formData.leaseMileage && formData.annualMileage && formData.leaseMileage < formData.annualMileage && (
                      <p className="text-sm text-yellow-600">
                        Warning: Your expected mileage ({formData.annualMileage}) exceeds lease allowance
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Fuel & Energy Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Fuel className="h-5 w-5" />
              <span>Fuel & Energy</span>
            </CardTitle>
            <CardDescription>
              Configure fuel efficiency and pricing for accurate running cost calculations
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="fuelEfficiency">
                  {formData.fuelType === 'electric' ? 'Efficiency (miles per kWh)' : 'Fuel Efficiency (MPG)'}
                </Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {formData.fuelType === 'electric'
                        ? 'Miles you can drive per kWh of electricity consumed'
                        : 'Miles per gallon - use real-world figures for accuracy'
                      }
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="fuelEfficiency"
                type="number"
                step="0.1"
                min="1"
                placeholder={formData.fuelType === 'electric' ? "4.0" : "50"}
                value={formData.fuelEfficiency || ''}
                onChange={(e) => updateFormData('fuelEfficiency', parseFloat(e.target.value) || 0)}
              />
              <p className="text-xs text-muted-foreground">
                {formData.fuelType === 'electric'
                  ? 'Typical range: 3-5 miles/kWh'
                  : formData.fuelType === 'hybrid'
                  ? 'Combined efficiency: 50-80 MPG'
                  : 'Real-world efficiency often 10-20% lower than official figures'
                }
              </p>
            </div>

            {(formData.fuelType === 'petrol' || formData.fuelType === 'diesel' || formData.fuelType === 'hybrid') && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label>Fuel Price (per litre)</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Current fuel price. Prices vary by location and can fluctuate significantly.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <CurrencyInput
                  value={formData.fuelPrice || 1.75}
                  onChange={(value) => updateFormData('fuelPrice', value)}
                  placeholder="1.75"
                  step={0.01}
                  min={0.01}
                  max={3.00}
                />
                <p className="text-xs text-muted-foreground">
                  Current UK average: Petrol £1.75, Diesel £1.80 per litre
                </p>
              </div>
            )}

            {(formData.fuelType === 'electric' || formData.fuelType === 'hybrid') && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label>Electricity Price (per kWh)</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cost per kilowatt-hour. Home charging is typically cheaper than public charging.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <CurrencyInput
                  value={formData.electricityPrice || 0.30}
                  onChange={(value) => updateFormData('electricityPrice', value)}
                  placeholder="0.30"
                  step={0.01}
                  min={0.01}
                  max={1.00}
                />
                <p className="text-xs text-muted-foreground">
                  Home: ~30p/kWh, Public: 40-80p/kWh
                </p>
              </div>
            )}

            {/* EV Specific Fields */}
            {formData.fuelType === 'electric' && (
              <>
                <div className="space-y-3 md:col-span-2">
                  <div className="flex items-center space-x-2">
                    <Label>Home Charging Setup</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Home charging is significantly cheaper than public charging stations.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <RadioGroup
                    value={formData.homeCharging ? 'yes' : 'no'}
                    onValueChange={(value) => updateFormData('homeCharging', value === 'yes')}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="home-yes" />
                      <Label htmlFor="home-yes" className="cursor-pointer">Yes, I have home charging</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="home-no" />
                      <Label htmlFor="home-no" className="cursor-pointer">No, public charging only</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.homeCharging && (
                  <div className="space-y-2 md:col-span-2">
                    <SliderInput
                      label="Public Charging Frequency"
                      value={formData.publicChargingFrequency || 20}
                      onChange={(value) => updateFormData('publicChargingFrequency', value)}
                      min={0}
                      max={100}
                      step={5}
                      unit="% of charging"
                      tooltip="Percentage of charging done at public stations (more expensive)"
                      description="Lower percentages mean more savings from home charging"
                    />
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Advanced Settings Toggle */}
        <div className="flex items-center justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span>{showAdvanced ? 'Hide' : 'Show'} Advanced Settings</span>
          </Button>
        </div>

        {/* Advanced Settings */}
        {showAdvanced && (
          <>
            {/* Insurance & Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Insurance & Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label>Insurance Group</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Insurance groups range from 1-50. Higher groups cost more to insure.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.insuranceGroup || ''}
                    onChange={(e) => updateFormData('insuranceGroup', parseInt(e.target.value) || 0)}
                    placeholder="25"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label>Annual Parking Costs</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Include permits, workplace parking, and regular parking fees.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <CurrencyInput
                    value={formData.annualParking || 0}
                    onChange={(value) => updateFormData('annualParking', value)}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Label>Congestion Zone</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Do you regularly drive in congestion charge zones like London ULEZ? (£12.50/day)</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <RadioGroup
                    value={formData.congestionZone ? 'yes' : 'no'}
                    onValueChange={(value) => updateFormData('congestionZone', value === 'yes')}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="zone-yes" />
                      <Label htmlFor="zone-yes" className="cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="zone-no" />
                      <Label htmlFor="zone-no" className="cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                  {formData.congestionZone && formData.fuelType !== 'electric' && (
                    <p className="text-sm text-yellow-600">
                      ULEZ charge: £12.50/day for non-compliant vehicles
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Maintenance & Ownership */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wrench className="h-5 w-5" />
                  <span>Maintenance & Ownership</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Ownership Period</Label>
                  <SliderInput
                    label=""
                    value={formData.ownershipYears || 5}
                    onChange={(value) => updateFormData('ownershipYears', value)}
                    min={1}
                    max={10}
                    step={1}
                    unit=" years"
                    className="mt-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Annual Maintenance</Label>
                  <CurrencyInput
                    value={formData.annualMaintenance || 500}
                    onChange={(value) => updateFormData('annualMaintenance', value)}
                    placeholder="500"
                  />
                  <p className="text-xs text-muted-foreground">
                    Typical: £300-800/year depending on age
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Expected Resale Value</Label>
                  <CurrencyInput
                    value={formData.resaleValue || 0}
                    onChange={(value) => updateFormData('resaleValue', value)}
                    placeholder="15000"
                    max={formData.purchasePrice || 100000}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.purchasePrice && formData.resaleValue
                      ? `${Math.round((1 - formData.resaleValue / formData.purchasePrice) * 100)}% depreciation`
                      : 'Based on age, mileage, and condition'
                    }
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Road Tax Band</Label>
                  <Select 
                    value={formData.roadTaxBand || 'D'} 
                    onValueChange={(value) => updateFormData('roadTaxBand', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tax band" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Band A (0g/km CO₂) - £0</SelectItem>
                      <SelectItem value="B">Band B (1-50g/km) - £25</SelectItem>
                      <SelectItem value="C">Band C (51-75g/km) - £110</SelectItem>
                      <SelectItem value="D">Band D (76-90g/km) - £150</SelectItem>
                      <SelectItem value="E">Band E (91-100g/km) - £180</SelectItem>
                      <SelectItem value="F">Band F (101-110g/km) - £200</SelectItem>
                      <SelectItem value="G">Band G (111-130g/km) - £240</SelectItem>
                      <SelectItem value="H">Band H (131-150g/km) - £290</SelectItem>
                      <SelectItem value="I">Band I (151-170g/km) - £320</SelectItem>
                      <SelectItem value="J">Band J (171-190g/km) - £365</SelectItem>
                      <SelectItem value="K">Band K (191-225g/km) - £400</SelectItem>
                      <SelectItem value="L">Band L (226-255g/km) - £470</SelectItem>
                      <SelectItem value="M">Band M (256g/km+) - £520</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Warranty Length</Label>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.warrantyLength || ''}
                    onChange={(e) => updateFormData('warrantyLength', parseInt(e.target.value) || 0)}
                    placeholder="3"
                  />
                  <p className="text-xs text-muted-foreground">
                    Years of manufacturer warranty
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Label>Breakdown Cover</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>AA, RAC, or similar breakdown assistance services.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <RadioGroup
                    value={formData.breakdownCover ? 'yes' : 'no'}
                    onValueChange={(value) => updateFormData('breakdownCover', value === 'yes')}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="breakdown-yes" />
                      <Label htmlFor="breakdown-yes" className="cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="breakdown-no" />
                      <Label htmlFor="breakdown-no" className="cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                  {formData.breakdownCover && (
                    <CurrencyInput
                      value={formData.breakdownCost || 150}
                      onChange={(value) => updateFormData('breakdownCost', value)}
                      placeholder="150"
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Economic Assumptions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Economic Assumptions</CardTitle>
                <CardDescription>
                  Adjust these parameters to model different economic scenarios
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Annual Depreciation Rate</Label>
                  <PercentageInput
                    value={formData.depreciationRate || 15}
                    onChange={(value) => updateFormData('depreciationRate', value)}
                    placeholder="15"
                    min={0}
                    max={50}
                    step={0.5}
                  />
                  <p className="text-xs text-muted-foreground">
                    Typical: 20-30% first year, 10-15% thereafter
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Inflation Rate</Label>
                  <PercentageInput
                    value={formData.inflationRate || 2.5}
                    onChange={(value) => updateFormData('inflationRate', value)}
                    placeholder="2.5"
                    min={0}
                    max={10}
                    step={0.1}
                  />
                  <p className="text-xs text-muted-foreground">
                    UK inflation rate affects future costs
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button type="submit" size="lg" className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>Calculate Total Cost</span>
          </Button>
        </div>
      </form>
    </TooltipProvider>
  )
}