
import { ChangeEvent } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plan } from '@/types/investment';

interface InvestmentPlanSelectorProps {
  plans: Plan[];
  selectedPlan: Plan;
  onPlanChange: (value: string) => void;
}

const InvestmentPlanSelector = ({ 
  plans, 
  selectedPlan, 
  onPlanChange 
}: InvestmentPlanSelectorProps) => {
  return (
    <div>
      <label className="block text-white font-medium mb-2">Select Plan</label>
      <Select
        value={selectedPlan.name}
        onValueChange={onPlanChange}
      >
        <SelectTrigger className="w-full bg-white/10 border-unicorn-gold/20 text-white">
          <SelectValue placeholder="Select a plan" />
        </SelectTrigger>
        <SelectContent className="bg-unicorn-darkPurple text-white border-unicorn-gold/20">
          {plans.map((plan) => (
            <SelectItem key={plan.name} value={plan.name} className="focus:bg-unicorn-purple/20 focus:text-unicorn-gold">
              {plan.name} (${plan.minAmount.toLocaleString()} - ${plan.maxAmount.toLocaleString()})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm text-unicorn-gold mt-2">
        {selectedPlan.dailyReturn}% daily for {selectedPlan.duration} days
      </p>
    </div>
  );
};

export default InvestmentPlanSelector;
