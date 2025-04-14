
/**
 * Validate that a loan meets the minimum loan amount requirement
 * @param amount The loan amount to validate
 * @returns Validation result with success status and message if error
 */
export const validateMinimumLoanAmount = (amount: number): { valid: boolean; message?: string } => {
  if (amount < 3500) {
    return {
      valid: false,
      message: `Loan amount does not meet the minimum requirement of $3,500.`
    };
  }
  
  return { valid: true };
};
