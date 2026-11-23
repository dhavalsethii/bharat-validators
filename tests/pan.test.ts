/**
 * PAN validator tests.
 */

import {
  validatePAN,
  isValidPAN,
  normalizePAN,
  pan,
  getPANEntityCategory,
} from '../src/validators/pan';
import { ValidationErrorCode, PANEntityCategory } from '../src/utils/types';

describe('PAN Validator', () => {
  // Valid PANs for each entity category
  // Format: 5 letters (4th is entity category at index 3) + 4 digits + 1 letter
  const validPANs = {
    [PANEntityCategory.INDIVIDUAL]: 'ABCPA1234F',
    [PANEntityCategory.COMPANY]: 'ABCCA1234F',
    [PANEntityCategory.HUF]: 'ABCHA1234F',
    [PANEntityCategory.FIRM]: 'ABCFA1234F',
    [PANEntityCategory.AOP]: 'ABCAA1234F',
    [PANEntityCategory.BOI]: 'ABCBA1234F',
    [PANEntityCategory.LOCAL_AUTHORITY]: 'ABCLA1234F',
    [PANEntityCategory.ARTIFICIAL_JURIDICAL_PERSON]: 'ABCJA1234F',
    [PANEntityCategory.GOVERNMENT]: 'ABCGA1234F',
    [PANEntityCategory.TRUST]: 'ABCTA1234F',
  };

  describe('isValidPAN', () => {
    test.each(Object.values(validPANs))('returns true for valid PAN: %s', (panValue) => {
      expect(isValidPAN(panValue)).toBe(true);
    });

    test('returns false for invalid entity category (4th char)', () => {
      expect(isValidPAN('ABCX1234E')).toBe(false);  // X is not valid
      expect(isValidPAN('ABCE1234E')).toBe(false);  // E is not valid
      expect(isValidPAN('ABCD1234E')).toBe(false);  // D is not valid
      expect(isValidPAN('ABC01234E')).toBe(false);  // 0 is not valid
    });

    test('returns false for wrong format', () => {
      expect(isValidPAN('ABCDE1234')).toBe(false);      // 9 chars
      expect(isValidPAN('ABCDE12345F')).toBe(false);    // 11 chars
      expect(isValidPAN('12345ABCDE')).toBe(false);     // wrong pattern
      expect(isValidPAN('abcde1234f')).toBe(false);     // lowercase (but normalize handles this)
    });

    test('returns false for non-alphanumeric', () => {
      expect(isValidPAN('ABCDE123@F')).toBe(false);
      expect(isValidPAN('ABCD!1234F')).toBe(false);
    });

    test('returns false for null/undefined', () => {
      expect(isValidPAN(null as any)).toBe(false);
      expect(isValidPAN(undefined as any)).toBe(false);
    });

    test('handles case insensitivity', () => {
      expect(isValidPAN('abcpa1234f')).toBe(true);
      expect(isValidPAN('AbCpA1234F')).toBe(true);
    });

    test('handles spaces', () => {
      expect(isValidPAN('ABCPA 1234 F')).toBe(true);
      expect(isValidPAN(' ABCPA1234F ')).toBe(true);
    });

    test('handles number input', () => {
      expect(isValidPAN(1234567890 as any)).toBe(false);  // numbers don't match pattern
    });
  });

  describe('validatePAN', () => {
    test('returns valid result with normalized value for valid PAN', () => {
      const result = validatePAN('ABCPA1234F');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.normalized).toBe('ABCPA1234F');
    });

    test('returns error for invalid entity category', () => {
      // Use a PAN that passes format check but has invalid entity category at index 3
      const result = validatePAN('ABCXA1234F');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.INVALID_ENTITY_CATEGORY);
      expect(result.errors[0]?.message).toContain('X');
    });

    test('returns error for wrong length', () => {
      const result = validatePAN('ABCDE1234');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.INVALID_LENGTH);
    });

    test('returns error for invalid format', () => {
      const result = validatePAN('12345ABCDE');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.INVALID_FORMAT);
    });

    test('returns error for invalid characters', () => {
      const result = validatePAN('ABCDE123@F');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.INVALID_CHARACTERS);
    });

    test('returns error for null input', () => {
      const result = validatePAN(null as any);
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.NULL_INPUT);
    });

    test('returns error for empty string', () => {
      const result = validatePAN('');
      expect(result.valid).toBe(false);
      expect(result.errors[0]?.code).toBe(ValidationErrorCode.EMPTY_INPUT);
    });

    test('normalizes lowercase input', () => {
      const result = validatePAN('abcpa1234f');
      expect(result.valid).toBe(true);
      expect(result.normalized).toBe('ABCPA1234F');
    });
  });

  describe('normalizePAN', () => {
    test.each(Object.values(validPANs))('normalizes valid PAN: %s', (panValue) => {
      expect(normalizePAN(panValue)).toBe(panValue);
    });

    test('normalizes lowercase', () => {
      expect(normalizePAN('abcde1234f')).toBe('ABCDE1234F');
    });

    test('normalizes with spaces', () => {
      expect(normalizePAN('ABCDE 1234 F')).toBe('ABCDE1234F');
      expect(normalizePAN(' ABCDE1234F ')).toBe('ABCDE1234F');
    });

    test('returns null for invalid', () => {
      expect(normalizePAN('ABCX1234E')).toBeNull();
      expect(normalizePAN('12345ABCDE')).toBeNull();
      expect(normalizePAN('')).toBeNull();
    });

    test('returns null for null/undefined', () => {
      expect(normalizePAN(null as any)).toBeNull();
      expect(normalizePAN(undefined as any)).toBeNull();
    });
  });

  describe('getPANEntityCategory', () => {
    test.each([
      [PANEntityCategory.INDIVIDUAL, 'Individual'],
      [PANEntityCategory.COMPANY, 'Company'],
      [PANEntityCategory.HUF, 'Hindu Undivided Family (HUF)'],
      [PANEntityCategory.FIRM, 'Firm/Partnership'],
      [PANEntityCategory.AOP, 'Association of Persons (AOP)'],
      [PANEntityCategory.BOI, 'Body of Individuals (BOI)'],
      [PANEntityCategory.LOCAL_AUTHORITY, 'Local Authority'],
      [PANEntityCategory.ARTIFICIAL_JURIDICAL_PERSON, 'Artificial Juridical Person'],
      [PANEntityCategory.GOVERNMENT, 'Government'],
      [PANEntityCategory.TRUST, 'Trust'],
    ])('returns correct category for %s', (code, description) => {
      const pan = `ABC${code}A1234F`;  // 4th char (index 3) is entity code
      const result = getPANEntityCategory(pan);
      expect(result).not.toBeNull();
      expect(result!.code).toBe(code);
      expect(result!.description).toBe(description);
    });

    test('returns null for invalid PAN', () => {
      expect(getPANEntityCategory('INVALID')).toBeNull();
      expect(getPANEntityCategory('ABCX1234F')).toBeNull();
    });

    test('returns null for null/undefined', () => {
      expect(getPANEntityCategory(null as any)).toBeNull();
      expect(getPANEntityCategory(undefined as any)).toBeNull();
    });
  });

  describe('pan object API', () => {
    test('exposes all methods', () => {
      expect(typeof pan.validate).toBe('function');
      expect(typeof pan.isValid).toBe('function');
      expect(typeof pan.normalize).toBe('function');
      expect(typeof pan.getEntityCategory).toBe('function');
    });
  });

  describe('Edge cases', () => {
    test('handles special characters in input', () => {
      expect(isValidPAN('ABCDE123#F')).toBe(false);
    });

    test('handles whitespace only', () => {
      expect(isValidPAN('   ')).toBe(false);
    });

    test('validates all 10 entity categories', () => {
      const categories = Object.values(PANEntityCategory);
      categories.forEach(cat => {
        const pan = `ABC${cat}A1234F`;
        expect(isValidPAN(pan)).toBe(true);
      });
    });
  });
});