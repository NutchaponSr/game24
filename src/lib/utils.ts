import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function evaluateExpression(expression: string): number {
  const sanitized = expression.replace(/[0-9+\-*/() ]/g, "");
  
  if (sanitized.length > 0) {
    throw new Error("Invalid characters in expression");
  }
  
  try {
    return new Function(`return ${expression}`)();
  } catch {
    throw new Error("Invalid expression");
  }
}

export function usesAllNumbersOnce(expression: string, numbers: number[]): boolean {
  const digitsOnly = expression.replace(/[^0-9]/g, "");
  
  const digits = digitsOnly.split("").map(Number);
  
  const availableNumbers = [...numbers];
  
  for (const digit of digits) {
    const index = availableNumbers.indexOf(digit);
    if (index === -1) {
      return false;
    }
    availableNumbers.splice(index, 1);
  }
  
  return availableNumbers.length === 0;
} 

export function generateAllExpressions(numbers: number[], maxResults: number = 5): string[] {
  const operators = ["+", "-", "*", "/"];
  const results: string[] = [];
  const seen = new Set<string>();

  let foundEnough = false;

  function permute(arr: number[], current: number[] = []) {
    if (foundEnough) return;
    
    if (arr.length === 0) {
      generateExpressionsWithOperators(current, 0, "");
      return;
    }
    
    for (let i = 0; i < arr.length; i++) {
      if (foundEnough) return;
      const newArr = [...arr];
      const removed = newArr.splice(i, 1)[0];
      permute(newArr, [...current, removed]);
    }
  }

  function generateExpressionsWithOperators(nums: number[], index: number, expr: string) {
    if (foundEnough) return;
    
    if (index === nums.length - 1) {
      expr += nums[index];

      try {
        const result = evaluateExpression(expr)
        if (Math.abs(result - 24) < 0.0001) {
          const normalized = expr.replace(/\s+/g, "");

          if (!seen.has(normalized)) {
            results.push(expr)
            seen.add(normalized)
            if (results.length >= maxResults) {
              foundEnough = true;
            }
          }
        }
      } catch {
        // Skip invalid expressions
      }
      return;
    }

    for (const op of operators) {
      if (foundEnough) return;
      generateExpressionsWithOperators(nums, index + 1, expr + nums[index] + op);
    }

    if (index < nums.length - 2) {
      for (const op1 of operators) {
        for (const op2 of operators) {
          if (foundEnough) return;
          generateExpressionsWithOperators(
            nums,
            index + 2,
            expr + "(" + nums[index] + op1 + nums[index + 1] + ")" + op2
          );
        }
      }
    }
  }

  permute(numbers);
  return results;
}
