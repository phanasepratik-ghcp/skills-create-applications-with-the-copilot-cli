/**
 * Unit tests for the Node.js CLI Calculator
 * Tests cover all four basic arithmetic operations and edge cases
 */

const { calculate } = require('../calculator');

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
      expect(calculate(5, 3, '^')).toBe(3);
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
});
