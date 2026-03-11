/**
 * Unit tests for the Node.js CLI Calculator
 * Tests cover all arithmetic operations (basic and extended) and edge cases
 */

const { calculate, modulo, power, squareRoot } = require('../calculator');

describe('Calculator - Basic Operations', () => {
  
  describe('Addition (+)', () => {
    test('should add two positive numbers: 2 + 3 = 5', () => {
      expect(calculate(2, 3, '+')).toBe(5);
    });

    test('should add two negative numbers: -5 + -3 = -8', () => {
      expect(calculate(-5, -3, '+')).toBe(-8);
    });

    test('should add positive and negative numbers: 10 + -4 = 6', () => {
      expect(calculate(10, -4, '+')).toBe(6);
    });

    test('should add zero to a number: 5 + 0 = 5', () => {
      expect(calculate(5, 0, '+')).toBe(5);
    });

    test('should add two zeros: 0 + 0 = 0', () => {
      expect(calculate(0, 0, '+')).toBe(0);
    });

    test('should add decimal numbers: 2.5 + 3.7 = 6.2', () => {
      expect(calculate(2.5, 3.7, '+')).toBeCloseTo(6.2, 1);
    });

    test('should add large numbers: 1000000 + 2000000 = 3000000', () => {
      expect(calculate(1000000, 2000000, '+')).toBe(3000000);
    });
  });

  describe('Subtraction (-)', () => {
    test('should subtract two positive numbers: 10 - 4 = 6', () => {
      expect(calculate(10, 4, '-')).toBe(6);
    });

    test('should subtract larger number from smaller: 4 - 10 = -6', () => {
      expect(calculate(4, 10, '-')).toBe(-6);
    });

    test('should subtract negative numbers: 10 - (-5) = 15', () => {
      expect(calculate(10, -5, '-')).toBe(15);
    });

    test('should subtract zero: 5 - 0 = 5', () => {
      expect(calculate(5, 0, '-')).toBe(5);
    });

    test('should subtract number from zero: 0 - 5 = -5', () => {
      expect(calculate(0, 5, '-')).toBe(-5);
    });

    test('should subtract number from itself: 7 - 7 = 0', () => {
      expect(calculate(7, 7, '-')).toBe(0);
    });

    test('should subtract decimal numbers: 10.5 - 4.2 = 6.3', () => {
      expect(calculate(10.5, 4.2, '-')).toBeCloseTo(6.3, 1);
    });
  });

  describe('Multiplication (*)', () => {
    test('should multiply two positive numbers: 45 * 2 = 90', () => {
      expect(calculate(45, 2, '*')).toBe(90);
    });

    test('should multiply positive and negative numbers: 5 * -3 = -15', () => {
      expect(calculate(5, -3, '*')).toBe(-15);
    });

    test('should multiply two negative numbers: -4 * -6 = 24', () => {
      expect(calculate(-4, -6, '*')).toBe(24);
    });

    test('should multiply by zero: 5 * 0 = 0', () => {
      expect(calculate(5, 0, '*')).toBe(0);
    });

    test('should multiply by one: 7 * 1 = 7', () => {
      expect(calculate(7, 1, '*')).toBe(7);
    });

    test('should multiply decimal numbers: 2.5 * 4 = 10', () => {
      expect(calculate(2.5, 4, '*')).toBe(10);
    });

    test('should multiply large numbers: 1000 * 2000 = 2000000', () => {
      expect(calculate(1000, 2000, '*')).toBe(2000000);
    });
  });

  describe('Division (/)', () => {
    test('should divide two positive numbers: 20 / 5 = 4', () => {
      expect(calculate(20, 5, '/')).toBe(4);
    });

    test('should divide with decimal result: 10 / 4 = 2.5', () => {
      expect(calculate(10, 4, '/')).toBe(2.5);
    });

    test('should divide positive by negative: 10 / -2 = -5', () => {
      expect(calculate(10, -2, '/')).toBe(-5);
    });

    test('should divide negative by negative: -10 / -2 = 5', () => {
      expect(calculate(-10, -2, '/')).toBe(5);
    });

    test('should divide zero by number: 0 / 5 = 0', () => {
      expect(calculate(0, 5, '/')).toBe(0);
    });

    test('should return null for division by zero: 20 / 0 = null', () => {
      expect(calculate(20, 0, '/')).toBeNull();
    });

    test('should handle very small divisor: 1 / 0.1 = 10', () => {
      expect(calculate(1, 0.1, '/')).toBe(10);
    });

    test('should divide one by itself: 7 / 7 = 1', () => {
      expect(calculate(7, 7, '/')).toBe(1);
    });

    test('should divide decimal numbers: 10.5 / 2.5 = 4.2', () => {
      expect(calculate(10.5, 2.5, '/')).toBeCloseTo(4.2, 1);
    });

    test('should divide large numbers: 1000000 / 1000 = 1000', () => {
      expect(calculate(1000000, 1000, '/')).toBe(1000);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle division by zero gracefully', () => {
      expect(calculate(100, 0, '/')).toBeNull();
    });

    test('should handle unknown operation', () => {
      expect(calculate(5, 3, '&')).toBe(3);
    });

    test('should handle very large numbers', () => {
      expect(calculate(Number.MAX_SAFE_INTEGER, 1, '+')).toBe(Number.MAX_SAFE_INTEGER + 1);
    });

    test('should handle floating point precision', () => {
      expect(calculate(0.1, 0.2, '+')).toBeCloseTo(0.3, 5);
    });

    test('should handle negative zero: -0 + 0 = 0', () => {
      expect(calculate(-0, 0, '+')).toBe(0);
    });
  });

  describe('Operation Chaining Examples', () => {
    test('should handle operation sequence: 2 + 3 then * 2', () => {
      let result = calculate(2, 3, '+');
      result = calculate(result, 2, '*');
      expect(result).toBe(10);
    });

    test('should handle operation sequence: 10 - 4 then * 2', () => {
      let result = calculate(10, 4, '-');
      result = calculate(result, 2, '*');
      expect(result).toBe(12);
    });

    test('should handle operation sequence: 45 * 2 then / 5', () => {
      let result = calculate(45, 2, '*');
      result = calculate(result, 5, '/');
      expect(result).toBe(18);
    });

    test('should handle complex chain: ((10 + 5) - 3) * 2 / 4', () => {
      let result = calculate(10, 5, '+');
      result = calculate(result, 3, '-');
      result = calculate(result, 2, '*');
      result = calculate(result, 4, '/');
      expect(result).toBe(6);
    });
  });

  describe('Modulo (%)', () => {
    test('should return remainder: 5 % 2 = 1', () => {
      expect(calculate(5, 2, '%')).toBe(1);
    });

    test('should handle modulo with positive numbers: 10 % 3 = 1', () => {
      expect(modulo(10, 3)).toBe(1);
    });

    test('should handle modulo with negative dividend: -5 % 2 = -1', () => {
      expect(modulo(-5, 2)).toBe(-1);
    });

    test('should handle modulo with negative divisor: 5 % -2 = 1', () => {
      expect(modulo(5, -2)).toBe(1);
    });

    test('should handle modulo with both negative: -10 % -3 = -1', () => {
      expect(modulo(-10, -3)).toBe(-1);
    });

    test('should return zero when dividend is multiple of divisor: 20 % 5 = 0', () => {
      expect(modulo(20, 5)).toBe(0);
    });

    test('should handle modulo with decimal numbers: 7.5 % 2 = 1.5', () => {
      expect(modulo(7.5, 2)).toBeCloseTo(1.5, 5);
    });

    test('should throw error for modulo by zero', () => {
      expect(() => modulo(10, 0)).toThrow('Cannot perform modulo by zero');
    });

    test('should handle modulo with zero dividend: 0 % 5 = 0', () => {
      expect(modulo(0, 5)).toBe(0);
    });
  });

  describe('Power (^)', () => {
    test('should calculate power: 2 ^ 3 = 8', () => {
      expect(calculate(2, 3, '^')).toBe(8);
    });

    test('should handle positive base and exponent: 5 ^ 2 = 25', () => {
      expect(power(5, 2)).toBe(25);
    });

    test('should handle zero exponent: 10 ^ 0 = 1', () => {
      expect(power(10, 0)).toBe(1);
    });

    test('should handle exponent of one: 7 ^ 1 = 7', () => {
      expect(power(7, 1)).toBe(7);
    });

    test('should handle negative exponent: 2 ^ -2 = 0.25', () => {
      expect(power(2, -2)).toBeCloseTo(0.25, 5);
    });

    test('should handle negative base with even exponent: -3 ^ 2 = 9', () => {
      expect(power(-3, 2)).toBe(9);
    });

    test('should handle negative base with odd exponent: -2 ^ 3 = -8', () => {
      expect(power(-2, 3)).toBe(-8);
    });

    test('should handle decimal base: 2.5 ^ 2 = 6.25', () => {
      expect(power(2.5, 2)).toBeCloseTo(6.25, 5);
    });

    test('should handle decimal exponent: 4 ^ 0.5 = 2', () => {
      expect(power(4, 0.5)).toBeCloseTo(2, 5);
    });

    test('should handle large powers: 2 ^ 10 = 1024', () => {
      expect(power(2, 10)).toBe(1024);
    });

    test('should handle zero base with positive exponent: 0 ^ 5 = 0', () => {
      expect(power(0, 5)).toBe(0);
    });
  });

  describe('Square Root (sqrt)', () => {
    test('should calculate square root: √16 = 4', () => {
      expect(calculate(0, 16, 'sqrt')).toBe(4);
    });

    test('should handle perfect square: sqrt(25) = 5', () => {
      expect(squareRoot(25)).toBe(5);
    });

    test('should handle square root of 0: sqrt(0) = 0', () => {
      expect(squareRoot(0)).toBe(0);
    });

    test('should handle square root of 1: sqrt(1) = 1', () => {
      expect(squareRoot(1)).toBe(1);
    });

    test('should handle square root of decimal: sqrt(2.25) = 1.5', () => {
      expect(squareRoot(2.25)).toBeCloseTo(1.5, 5);
    });

    test('should handle non-perfect square: sqrt(2) ≈ 1.414', () => {
      expect(squareRoot(2)).toBeCloseTo(1.414, 3);
    });

    test('should handle large perfect square: sqrt(10000) = 100', () => {
      expect(squareRoot(10000)).toBe(100);
    });

    test('should handle fractional square root: sqrt(0.25) = 0.5', () => {
      expect(squareRoot(0.25)).toBeCloseTo(0.5, 5);
    });

    test('should throw error for negative number: sqrt(-1)', () => {
      expect(() => squareRoot(-1)).toThrow('Cannot calculate square root of a negative number');
    });

    test('should throw error for negative number in calculate: sqrt(-4)', () => {
      expect(calculate(0, -4, 'sqrt')).toBeNull();
    });
  });

  describe('Extended Operation Chaining', () => {
    test('should chain modulo and power: (5 % 3) ^ 2 = 4', () => {
      let result = calculate(5, 3, '%');
      result = calculate(result, 2, '^');
      expect(result).toBe(4);
    });

    test('should chain power and square root: (2 ^ 4) sqrt = 4', () => {
      let result = calculate(2, 4, '^');
      result = calculate(0, result, 'sqrt');
      expect(result).toBe(4);
    });

    test('should chain all operations: ((10 + 5) % 7) ^ 2 = 1', () => {
      let result = calculate(10, 5, '+');
      result = calculate(result, 7, '%');
      result = calculate(result, 2, '^');
      expect(result).toBe(1);
    });

    test('should handle sqrt then power: sqrt(16) ^ 2 = 16', () => {
      let result = calculate(0, 16, 'sqrt');
      result = calculate(result, 2, '^');
      expect(result).toBe(16);
    });
  });
});
