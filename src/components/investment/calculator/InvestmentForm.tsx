
import { ChangeEvent } from 'react';
import { Plan } from '@/types/investment';

interface InvestmentFormProps {
  selectedPlan: Plan | null;
  plans: { id: string; name: string; range: string; minAmount: number; maxAmount: number; dailyReturn: number; duration: number; totalReturn: number; features: string[]; highlighted?: boolean; }[];
  investmentAmount: number;
  onSelectPlan: (plan: any) => void;
  onAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InvestmentForm = ({ 
  selectedPlan, 
  plans, 
  investmentAmount, 
  onSelectPlan, 
  onAmountChange 
}: InvestmentFormProps) => {
  
  const handlePlanChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const plan = plans.find(p => p.id === e.target.value);
    if (plan) {
      onSelectPlan(plan);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-investment-navy mb-4">Calculate Your Returns</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-2">Select Investment Plan</label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-md"
            value={selectedPlan?.id || ""}
            onChange={handlePlanChange}
          >
            <option value="" disabled>Select a plan</option>
            {plans.map(plan => (
              <option key={plan.id} value={plan.id}>
                {plan.name} ({plan.range})
              </option>
            ))}
          </select>
        </div>
        
        {selectedPlan && (
          <div>
            <label className="block text-gray-600 mb-2">
              Investment Amount (${selectedPlan.minAmount.toLocaleString()} - ${selectedPlan.maxAmount === 1000000 ? "50,000+" : selectedPlan.maxAmount.toLocaleString()})
            </label>
            <input
              type="number"
              value={investmentAmount}
              onChange={onAmountChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              min={selectedPlan.minAmount}
              max={selectedPlan.maxAmount}
            />
            
            <div className="text-sm text-gray-500 mt-1">
              Daily Return: {selectedPlan.dailyReturn}% | Duration: {selectedPlan.duration} days
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentForm;
