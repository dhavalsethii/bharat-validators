/**
 * Indian mobile number validator tests.
 */

import {
  validateMobile,
  isValidMobile,
  normalizeMobile,
  mobile,
  formatMobile,
} from '../src/validators/mobile';
import { ValidationErrorCode } from '../src/utils/types';

describe('Mobile Validator', () => {
  // Valid Indian mobile numbers (10 digits starting with 6-9)
  const validMobiles = [
    '9876543210',
    '8765432109',
    '7654321098',
    '6543210987',
    '9999999999',
    '6000000000',
  ];

  // Various formatted versions of valid numbers
  const formattedValidMobiles = [
    '+91 9876543210',
    '+91-9876543210',
    '+919876543210',
    '91 9876543210',
    '919876543210',
    '0 9876543210',
    '09876543210',
    '(987) 654-3210',
    '987 654 3210',
    '987-654-3210',
    ' 9876543210 ',
  ];

  describe('isValidMobile', () => {
    test.each(validMobiles)('returns true for valid mobile: %s', (mobile) => {
      expect(isValidMobile(mobile)).toBe(true);
    });

    test.each(formattedValidMobiles)('returns true for formatted valid mobile: %s', (mobile) => {
      expect(isValidMobile(mobile)).toBe(true);
    });

    test('returns false for invalid starting digit', () => {
      expect(isValidMobile('5876543210')).toBe(false);  // Starts with 5
      expect(isValidMobile('4876543210')).toBe(false);  // Starts with 4
      expect(isValidMobile('3876543210')).toBe(false);  // Starts with 3
      expect(isValidMobile('2876543210')).toBe(false);  // Starts with 2
      expect(isValidMobile('1876543210')).toBe(false);  // Starts with 1
      expect(isValidMobile('0876543210')).toBe(false);  // Starts with 0
    });

    test('returns false for wrong length', () => {
      expect(isValidMobile('987654321')).toBe(false);    // 9 digits
      expect(isValidMobile('98765432101')).toBe(false); // 11 digits
    });

    test('returns false for non-numeric', () => {
      expect(isValidMobile('987654321A')).toBe(false);
      expect(isValidMobile('98765ABCDE')).toBe(false);
    });

    test('returns false for null/undefined', () => {
      expect(isValidMobile(null as any)).toBe(false);
      expect(isValidMobile(undefined as any)).toBe(false);
    });

    test('returns false for empty string', () => {
      expect(isValidMobile('')).toBe(false);
    });

    test('handles number input', () => {
      expect(isValidMobile(9876543210 as any)).toBe(true);
    });
  });

  describe('validateMobile', () => {
    test('returns valid result with normalized value for valid mobile', () => {
      const result = validateMobile('9876543210');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.normalized).toBe('9876543210');
    });

    test('returns valid result for formatted input', () => {
      const result = validateMobile('+91 9876543210');
      expect(result.valid).toBe(true);
      expect(result.normalized).toBe('9876543210');
    });

    test('returns error for invalid starting digit', () => {
      const result = validateMobile('5876543210');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.INVALID_FORMAT);
    });

    test('returns error for wrong length', () => {
      const result = validateMobile('987654321');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.INVALID_LENGTH);
    });

    test('returns error for invalid characters', () => {
      const result = validateMobile('987654321A');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.INVALID_CHARACTERS);
    });

    test('returns error for null input', () => {
      const result = validateMobile(null as any);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.NULL_INPUT);
    });

    test('returns error for empty string', () => {
      const result = validateMobile('');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.EMPTY_INPUT);
    });

    test('handles various country code formats', () => {
      expect(validateMobile('+919876543210').normalized).toBe('9876543210');
      expect(validateMobile('919876543210').normalized).toBe('9876543210');
      expect(validateMobile('09876543210').normalized).toBe('9876543210');
    });
  });

  describe('normalizeMobile', () => {
    test.each(validMobiles)('normalizes valid mobile: %s', (mobile) => {
      expect(normalizeMobile(mobile)).toBe(mobile);
    });

    test.each(formattedValidMobiles)('normalizes formatted mobile: %s', (mobile) => {
      expect(normalizeMobile(mobile)).toBe('9876543210');
    });

    test('returns null for invalid starting digit', () => {
      expect(normalizeMobile('5876543210')).toBeNull();
    });

    test('returns null for wrong length', () => {
      expect(normalizeMobile('987654321')).toBeNull();
      expect(normalizeMobile('98765432101')).toBeNull();
    });

    test('returns null for empty string', () => {
      expect(normalizeMobile('')).toBeNull();
    });

    test('returns null for null/undefined', () => {
      expect(normalizeMobile(null as any)).toBeNull();
      expect(normalizeMobile(undefined as any)).toBeNull();
    });
  });

  describe('formatMobile', () => {
    test('formats normalized mobile for display', () => {
      expect(formatMobile('9876543210')).toBe('+91 98765 43210');
      expect(formatMobile('8765432109')).toBe('+91 87654 32109');
    });

    test('handles formatted input', () => {
      expect(formatMobile('+91 9876543210')).toBe('+91 98765 43210');
      expect(formatMobile('919876543210')).toBe('+91 98765 43210');
    });

    test('returns original for invalid input', () => {
      expect(formatMobile('invalid')).toBe('invalid');
      expect(formatMobile('12345')).toBe('12345');
    });
  });

  describe('mobile object API', () => {
    test('exposes all methods', () => {
      expect(typeof mobile.validate).toBe('function');
      expect(typeof mobile.isValid).toBe('function');
      expect(typeof mobile.normalize).toBe('function');
      expect(typeof mobile.format).toBe('function');
    });
  });

  describe('Edge cases', () => {
    test('handles special characters', () => {
      expect(isValidMobile('987654321@')).toBe(false);
    });

    test('handles whitespace only', () => {
      expect(isValidMobile('   ')).toBe(false);
    });

    test('handles very long numbers with country code', () => {
      expect(isValidMobile('+919876543210123')).toBe(false); // Too long
    });

    test('handles multiple spaces and hyphens', () => {
      expect(isValidMobile('+91  987  654  3210')).toBe(true);
      expect(isValidMobile('91--987--654--3210')).toBe(true);
    });

    test('validates all valid starting digits (6-9)', () => {
      for (let i = 6; i <= 9; i++) {
        const mobile = `${i}000000000`;
        expect(isValidMobile(mobile)).toBe(true);
      }
    });
  });
});