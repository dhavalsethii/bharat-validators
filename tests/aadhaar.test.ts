/**
 * Aadhaar validator tests.
 */

import {
  validateAadhaar,
  isValidAadhaar,
  normalizeAadhaar,
  aadhaar,
} from '../src/validators/aadhaar';
import { ValidationErrorCode } from '../src/utils/types';

describe('Aadhaar Validator', () => {
  // Valid Aadhaar numbers with correct Verhoeff checksum (starts with 2-9)
  // These are generated test vectors, not real Aadhaar numbers
  const validAadhaars = [
    '234567890124',  // Starts with 2 - valid checksum
    '987654321012',  // Starts with 9 - valid checksum
    '345678901238',  // Starts with 3 - valid checksum
    '456789012341',  // Starts with 4 - valid checksum
    '567890123458',  // Starts with 5 - valid checksum
  ];

  // Invalid checksum Aadhaars (same as valid but last digit changed)
  const invalidChecksumAadhaars = [
    '234567890125',
    '987654321013',
    '345678901239',
    '456789012342',
    '567890123459',
  ];

  describe('isValidAadhaar', () => {
    test.each(validAadhaars)('returns true for valid Aadhaar: %s', (aadhaar) => {
      expect(isValidAadhaar(aadhaar)).toBe(true);
    });

    test.each(invalidChecksumAadhaars)('returns false for invalid checksum: %s', (aadhaar) => {
      expect(isValidAadhaar(aadhaar)).toBe(false);
    });

    test('returns false for wrong length', () => {
      expect(isValidAadhaar('12345678901')).toBe(false);  // 11 digits
      expect(isValidAadhaar('1234567890123')).toBe(false);  // 13 digits
    });

    test('returns false for non-numeric', () => {
      expect(isValidAadhaar('12345678901A')).toBe(false);
      expect(isValidAadhaar('ABCDEFGHIJKL')).toBe(false);
    });

    test('returns false for null/undefined', () => {
      expect(isValidAadhaar(null as any)).toBe(false);
      expect(isValidAadhaar(undefined as any)).toBe(false);
    });

    test('returns false for empty string', () => {
      expect(isValidAadhaar('')).toBe(false);
    });

    test('handles spaces and hyphens', () => {
      expect(isValidAadhaar('2345 6789 0124')).toBe(true);
      expect(isValidAadhaar('2345-6789-0124')).toBe(true);
      expect(isValidAadhaar(' 2345 6789 0124 ')).toBe(true);
    });

    test('handles number input', () => {
      expect(isValidAadhaar(234567890124 as any)).toBe(true);
    });
  });

  describe('validateAadhaar', () => {
    test('returns valid result with normalized value for valid Aadhaar', () => {
      const result = validateAadhaar('234567890124');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.normalized).toBe('234567890124');
    });

    test('returns error for invalid checksum', () => {
      const result = validateAadhaar('234567890125');
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.INVALID_CHECKSUM);
      expect(result.normalized).toBeUndefined();
    });

    test('returns error for wrong length', () => {
      const result = validateAadhaar('12345678901');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.INVALID_LENGTH);
    });

    test('returns error for non-numeric characters', () => {
      const result = validateAadhaar('12345678901A');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.INVALID_CHARACTERS);
    });

    test('returns error for null input', () => {
      const result = validateAadhaar(null as any);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.NULL_INPUT);
    });

    test('returns error for undefined input', () => {
      const result = validateAadhaar(undefined as any);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.NULL_INPUT);
    });

    test('returns error for empty string', () => {
      const result = validateAadhaar('');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.EMPTY_INPUT);
    });

    test('includes input in error', () => {
      const result = validateAadhaar('invalid');
      expect(result.errors[0]?.input).toBe('invalid');
    });
  });

  describe('normalizeAadhaar', () => {
    test.each(validAadhaars)('normalizes valid Aadhaar: %s', (aadhaar) => {
      expect(normalizeAadhaar(aadhaar)).toBe(aadhaar);
    });

    test('normalizes with spaces', () => {
      expect(normalizeAadhaar('2345 6789 0124')).toBe('234567890124');
    });

    test('normalizes with hyphens', () => {
      expect(normalizeAadhaar('2345-6789-0124')).toBe('234567890124');
    });

    test('normalizes with mixed formatting', () => {
      expect(normalizeAadhaar(' 2345-6789 0124 ')).toBe('234567890124');
    });

    test('returns null for invalid format', () => {
      expect(normalizeAadhaar('12345678901')).toBeNull();
      expect(normalizeAadhaar('12345678901A')).toBeNull();
      expect(normalizeAadhaar('')).toBeNull();
    });

    test('returns null for null/undefined', () => {
      expect(normalizeAadhaar(null as any)).toBeNull();
      expect(normalizeAadhaar(undefined as any)).toBeNull();
    });
  });

  describe('aadhaar object API', () => {
    test('exposes all methods', () => {
      expect(typeof aadhaar.validate).toBe('function');
      expect(typeof aadhaar.isValid).toBe('function');
      expect(typeof aadhaar.normalize).toBe('function');
    });

    test('methods work correctly', () => {
      expect(aadhaar.isValid('234567890124')).toBe(true);
      expect(aadhaar.validate('234567890124').valid).toBe(true);
      expect(aadhaar.normalize('2345 6789 0124')).toBe('234567890124');
    });
  });

  describe('Edge cases', () => {
    test('handles very long numbers', () => {
      expect(isValidAadhaar('12345678901234567890')).toBe(false);
    });

    test('handles special characters', () => {
      expect(isValidAadhaar('1234@5678#90')).toBe(false);
    });

    test('handles whitespace only', () => {
      expect(isValidAadhaar('   ')).toBe(false);
    });

    test('rejects numbers starting with 0 or 1', () => {
      // UIDAI rule: Aadhaar cannot start with 0 or 1
      expect(isValidAadhaar('000000000003')).toBe(false);
      expect(isValidAadhaar('111111111115')).toBe(false);
      expect(isValidAadhaar('123456789010')).toBe(false);
      expect(isValidAadhaar('023456789012')).toBe(false);
      expect(normalizeAadhaar('000000000003')).toBeNull();
      expect(normalizeAadhaar('111111111115')).toBeNull();
      expect(normalizeAadhaar('023456789012')).toBeNull();
    });
  });
});