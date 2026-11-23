/**
 * IFSC validator tests.
 */

import {
  validateIFSC,
  isValidIFSC,
  normalizeIFSC,
  ifsc,
  getIFSCBankCode,
} from '../src/validators/ifsc';
import { ValidationErrorCode } from '../src/utils/types';

describe('IFSC Validator', () => {
  // Valid IFSC test vectors (format: 4 letters + 0 + 6 alphanumeric)
  const validIFSCs = [
    'SBIN0001234',
    'HDFC0001234',
    'ICIC0001234',
    'UTIB0001234',
    'PUNB0001234',
    'CNRB0001234',
    'IDIB0001234',
    'BKID0001234',
    'MAHB0001234',
    'SYNB0001234',
    'SBIN000ABCD',  // Branch code can be alphanumeric
    'HDFC0123ABC',
  ];

  describe('isValidIFSC', () => {
    test.each(validIFSCs)('returns true for valid IFSC: %s', (ifscCode) => {
      expect(isValidIFSC(ifscCode)).toBe(true);
    });

    test('returns false for wrong 5th character (not 0)', () => {
      expect(isValidIFSC('SBIN1001234')).toBe(false);
      expect(isValidIFSC('SBINA001234')).toBe(false);
      expect(isValidIFSC('SBIN9001234')).toBe(false);
    });

    test('returns false for wrong length', () => {
      expect(isValidIFSC('SBIN000123')).toBe(false);   // 10 chars
      expect(isValidIFSC('SBIN00012345')).toBe(false); // 12 chars
    });

    test('returns false for invalid bank code (not 4 letters)', () => {
      expect(isValidIFSC('SB1N0001234')).toBe(false);  // Contains digit
      expect(isValidIFSC('SBI00001234')).toBe(false);  // Only 3 letters
      expect(isValidIFSC('SBIN0001234')).toBe(true);   // Valid
    });

    test('returns false for invalid branch code characters', () => {
      expect(isValidIFSC('SBIN000123!')).toBe(false);
      expect(isValidIFSC('SBIN00012#4')).toBe(false);
    });

    test('returns false for null/undefined', () => {
      expect(isValidIFSC(null as any)).toBe(false);
      expect(isValidIFSC(undefined as any)).toBe(false);
    });

    test('handles case insensitivity', () => {
      expect(isValidIFSC('sbin0001234')).toBe(true);
      expect(isValidIFSC('Sbin0001234')).toBe(true);
    });

    test('handles spaces', () => {
      expect(isValidIFSC('SBIN 000 1234')).toBe(true);
      expect(isValidIFSC(' SBIN0001234 ')).toBe(true);
    });
  });

  describe('validateIFSC', () => {
    test('returns valid result with normalized value for valid IFSC', () => {
      const result = validateIFSC('SBIN0001234');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.normalized).toBe('SBIN0001234');
    });

    test('returns error for wrong 5th character', () => {
      const result = validateIFSC('SBIN1001234');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.INVALID_FORMAT);
      expect(result.errors[0]?.message).toContain('IFSC format must be');
    });

    test('returns error for wrong length', () => {
      const result = validateIFSC('SBIN000123');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.INVALID_LENGTH);
    });

    test('returns error for invalid format', () => {
      const result = validateIFSC('12345678901');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.INVALID_FORMAT);
    });

    test('returns error for invalid characters', () => {
      const result = validateIFSC('SBIN000123!');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.INVALID_CHARACTERS);
    });

    test('returns error for null input', () => {
      const result = validateIFSC(null as any);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.NULL_INPUT);
    });

    test('normalizes lowercase input', () => {
      const result = validateIFSC('sbin0001234');
      expect(result.valid).toBe(true);
      expect(result.normalized).toBe('SBIN0001234');
    });
  });

  describe('normalizeIFSC', () => {
    test.each(validIFSCs)('normalizes valid IFSC: %s', (ifscCode) => {
      expect(normalizeIFSC(ifscCode)).toBe(ifscCode);
    });

    test('normalizes lowercase', () => {
      expect(normalizeIFSC('sbin0001234')).toBe('SBIN0001234');
    });

    test('normalizes with spaces', () => {
      expect(normalizeIFSC('SBIN 000 1234')).toBe('SBIN0001234');
    });

    test('returns null for invalid', () => {
      expect(normalizeIFSC('SBIN1001234')).toBeNull();
      expect(normalizeIFSC('SBIN000123')).toBeNull();
      expect(normalizeIFSC('')).toBeNull();
    });

    test('returns null for null/undefined', () => {
      expect(normalizeIFSC(null as any)).toBeNull();
      expect(normalizeIFSC(undefined as any)).toBeNull();
    });
  });

  describe('getIFSCBankCode', () => {
    test('extracts bank code from valid IFSC', () => {
      expect(getIFSCBankCode('SBIN0001234')).toBe('SBIN');
      expect(getIFSCBankCode('HDFC0001234')).toBe('HDFC');
      expect(getIFSCBankCode('ICIC0001234')).toBe('ICIC');
    });

    test('handles lowercase input', () => {
      expect(getIFSCBankCode('sbin0001234')).toBe('SBIN');
    });

    test('returns null for invalid IFSC', () => {
      expect(getIFSCBankCode('INVALID')).toBeNull();
      expect(getIFSCBankCode('SBIN1001234')).toBeNull();
      expect(getIFSCBankCode('')).toBeNull();
    });
  });

  describe('ifsc object API', () => {
    test('exposes all methods', () => {
      expect(typeof ifsc.validate).toBe('function');
      expect(typeof ifsc.isValid).toBe('function');
      expect(typeof ifsc.normalize).toBe('function');
      expect(typeof ifsc.getBankCode).toBe('function');
    });
  });

  describe('Edge cases', () => {
    test('handles special characters', () => {
      expect(isValidIFSC('SBIN@001234')).toBe(false);
    });

    test('handles whitespace only', () => {
      expect(isValidIFSC('   ')).toBe(false);
    });

    test('accepts alphanumeric branch codes', () => {
      expect(isValidIFSC('SBIN0ABCDEF')).toBe(true);
      expect(isValidIFSC('SBIN0123ABZ')).toBe(true);
    });

    test('does not validate bank code against known list (allows new banks)', () => {
      // New bank codes should be valid as long as format is correct
      expect(isValidIFSC('NEWB0001234')).toBe(true);
      expect(isValidIFSC('XYZB0001234')).toBe(true);
    });
  });
});