/**
 * Indian PIN code validator tests.
 */

import {
  validatePincode,
  isValidPincode,
  normalizePincode,
  pincode,
  getPincodeZone,
} from '../src/validators/pincode';
import { ValidationErrorCode } from '../src/utils/types';

describe('PIN Code Validator', () => {
  // Valid PIN codes (6 digits, first digit 1-9)
  const validPincodes = [
    '110001',  // Delhi
    '400001',  // Mumbai
    '560001',  // Bangalore
    '600001',  // Chennai
    '700001',  // Kolkata
    '800001',  // Patna
    '900056',  // Army Postal Service (56 APO)
    '123456',  // Generic valid
    '876543',  // Generic valid
  ];

  // Invalid first digit (0)
  const invalidFirstDigitPincodes = [
    '012345',  // Starts with 0
    '000001',  // Starts with 0
  ];

  describe('isValidPincode', () => {
    test.each(validPincodes)('returns true for valid PIN code: %s', (pincode) => {
      expect(isValidPincode(pincode)).toBe(true);
    });

    test.each(invalidFirstDigitPincodes)('returns false for invalid first digit: %s', (pincode) => {
      expect(isValidPincode(pincode)).toBe(false);
    });

    test('returns false for wrong length', () => {
      expect(isValidPincode('12345')).toBe(false);    // 5 digits
      expect(isValidPincode('1234567')).toBe(false); // 7 digits
    });

    test('returns false for non-numeric', () => {
      expect(isValidPincode('12345A')).toBe(false);
      expect(isValidPincode('ABCDEF')).toBe(false);
    });

    test('returns false for null/undefined', () => {
      expect(isValidPincode(null as any)).toBe(false);
      expect(isValidPincode(undefined as any)).toBe(false);
    });

    test('returns false for empty string', () => {
      expect(isValidPincode('')).toBe(false);
    });

    test('handles spaces', () => {
      expect(isValidPincode('110 001')).toBe(true);
      expect(isValidPincode(' 110001 ')).toBe(true);
    });

    test('handles number input', () => {
      expect(isValidPincode(110001 as any)).toBe(true);
    });
  });

  describe('validatePincode', () => {
    test('returns valid result with normalized value for valid PIN code', () => {
      const result = validatePincode('110001');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.normalized).toBe('110001');
    });

    test('returns error for invalid first digit', () => {
      const result = validatePincode('012345');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.INVALID_FORMAT);
      expect(result.errors[0]?.message).toContain('first digit');
    });

    test('returns error for wrong length', () => {
      const result = validatePincode('12345');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.INVALID_LENGTH);
    });

    test('returns error for non-numeric', () => {
      const result = validatePincode('12345A');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.INVALID_CHARACTERS);
    });

    test('returns error for null input', () => {
      const result = validatePincode(null as any);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.NULL_INPUT);
    });

    test('returns error for empty string', () => {
      const result = validatePincode('');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.EMPTY_INPUT);
    });

    test('normalizes input with spaces', () => {
      const result = validatePincode('110 001');
      expect(result.valid).toBe(true);
      expect(result.normalized).toBe('110001');
    });
  });

  describe('normalizePincode', () => {
    test.each(validPincodes)('normalizes valid PIN code: %s', (pincode) => {
      expect(normalizePincode(pincode)).toBe(pincode);
    });

    test('normalizes with spaces', () => {
      expect(normalizePincode('110 001')).toBe('110001');
      expect(normalizePincode(' 110001 ')).toBe('110001');
    });

    test('returns null for invalid first digit', () => {
      expect(normalizePincode('012345')).toBeNull();
      expect(normalizePincode('000001')).toBeNull();
    });

    test('returns null for wrong length', () => {
      expect(normalizePincode('12345')).toBeNull();
      expect(normalizePincode('1234567')).toBeNull();
    });

    test('returns null for empty string', () => {
      expect(normalizePincode('')).toBeNull();
    });

    test('returns null for null/undefined', () => {
      expect(normalizePincode(null as any)).toBeNull();
      expect(normalizePincode(undefined as any)).toBeNull();
    });
  });

  describe('getPincodeZone', () => {
    test('returns correct zone for each first digit', () => {
      expect(getPincodeZone('110001')).toContain('North');
      expect(getPincodeZone('110001')).toContain('Delhi');

      expect(getPincodeZone('200001')).toContain('North');
      expect(getPincodeZone('200001')).toContain('Uttar Pradesh');

      expect(getPincodeZone('300001')).toContain('West');
      expect(getPincodeZone('300001')).toContain('Rajasthan');

      expect(getPincodeZone('400001')).toContain('West');
      expect(getPincodeZone('400001')).toContain('Maharashtra');

      expect(getPincodeZone('500001')).toContain('South');
      expect(getPincodeZone('500001')).toContain('Andhra Pradesh');

      expect(getPincodeZone('600001')).toContain('South');
      expect(getPincodeZone('600001')).toContain('Tamil Nadu');

      expect(getPincodeZone('700001')).toContain('East');
      expect(getPincodeZone('700001')).toContain('West Bengal');

      expect(getPincodeZone('800001')).toContain('East');
      expect(getPincodeZone('800001')).toContain('Bihar');

      expect(getPincodeZone('900056')).toContain('Army Postal Service');
    });

    test('returns null for invalid PIN code', () => {
      expect(getPincodeZone('012345')).toBeNull();
      expect(getPincodeZone('12345')).toBeNull();
      expect(getPincodeZone('INVALID')).toBeNull();
    });

    test('returns null for null/undefined', () => {
      expect(getPincodeZone(null as any)).toBeNull();
      expect(getPincodeZone(undefined as any)).toBeNull();
    });
  });

  describe('pincode object API', () => {
    test('exposes all methods', () => {
      expect(typeof pincode.validate).toBe('function');
      expect(typeof pincode.isValid).toBe('function');
      expect(typeof pincode.normalize).toBe('function');
      expect(typeof pincode.getZone).toBe('function');
    });
  });

  describe('Edge cases', () => {
    test('handles special characters', () => {
      expect(isValidPincode('12345@')).toBe(false);
    });

    test('handles whitespace only', () => {
      expect(isValidPincode('   ')).toBe(false);
    });

    test('validates all valid first digits (1-9)', () => {
      for (let i = 1; i <= 9; i++) {
        const pincode = `${i}00001`;
        expect(isValidPincode(pincode)).toBe(true);
      }
    });

    test('rejects first digit 0', () => {
      expect(isValidPincode('000001')).toBe(false);
    });
  });
});