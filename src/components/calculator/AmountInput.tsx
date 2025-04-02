
import { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from "@/components/ui/slider";
import { Plan } from '@/types/investment';

interface AmountInputProps {
  amount: number;
  selectedPlan: Plan;
  onAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSliderChange: (value: number[]) => void;
}

const AmountInput = ({
  amount,
  selectedPlan,
  onAmountChange,
  onSliderChange
}: AmountInputProps) => {
  return (
    <div>
      <label className="block text-white font-medium mb-2">
        Investment Amount (${selectedPlan.minAmount.toLocaleString()} - ${selectedPlan.maxAmount.toLocaleString()})
      </label>
      <Input
        type="number"
        value={amount}
        onChange={onAmountChange}
        min={selectedPlan.minAmount}
        max={selectedPlan.maxAmount}
        className="mb-3 bg-white/10 border-unicorn-gold/20 text-white"
      />
      <Slider
        value={[amount]}
        min={selectedPlan.minAmount}
        max={selectedPlan.maxAmount}
        step={(selectedPlan.maxAmount - selectedPlan.minAmount) / 100}
        onValueChange={onSliderChange}
        className="mt-6"
      />
      <div className="flex justify-between text-sm mt-2 text-gray-400">
        <span>${selectedPlan.minAmount.toLocaleString()}</span>
        <span>${selectedPlan.maxAmount.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default AmountInput;
