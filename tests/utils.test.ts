/**
 * Utility function tests (Verhoeff, GSTIN checksum).
 */

import {
  validateVerhoeffChecksum,
  calculateVerhoeffChecksum,
  generateAadhaarWithChecksum,
} from '../src/utils/verhoeff';
import {
  validateGSTINChecksum,
  calculateGSTINCheckDigit,
  generateGSTINWithChecksum,
} from '../src/utils/gstin-checksum';
import {
  isValidGSTStateCode,
  getGSTStateName,
  GST_STATE_CODES,
} from '../src/utils/types';

describe('Verhoeff Algorithm', () => {
  describe('validateVerhoeffChecksum', () => {
    test('validates known correct Aadhaar checksums', () => {
      // These are generated test vectors with valid Verhoeff checksums
      const validNumbers = [
        '234567890124',
        '987654321012',
        '111111111115',
        '000000000003',
        '123456789010',
      ];
      validNumbers.forEach(num => {
        expect(validateVerhoeffChecksum(num)).toBe(true);
      });
    });

    test('rejects numbers with invalid checksum', () => {
      const invalidNumbers = [
        '234567890125',
        '987654321013',
        '111111111116',
        '000000000004',
        '123456789011',
      ];
      invalidNumbers.forEach(num => {
        expect(validateVerhoeffChecksum(num)).toBe(false);
      });
    });

    test('rejects non-numeric input', () => {
      expect(validateVerhoeffChecksum('12345A')).toBe(false);
      expect(validateVerhoeffChecksum('ABCDEF')).toBe(false);
    });

    test('rejects empty string', () => {
      expect(validateVerhoeffChecksum('')).toBe(false);
    });
  });

  describe('calculateVerhoeffChecksum', () => {
    test('calculates correct check digit for known prefixes', () => {
      // Test vectors: prefix -> expected check digit
      const testVectors: [string, number][] = [
        ['23456789012', 4],
        ['98765432101', 2],
        ['11111111111', 5],
        ['00000000000', 3],
        ['12345678901', 0],
      ];
      testVectors.forEach(([prefix, expected]) => {
        expect(calculateVerhoeffChecksum(prefix)).toBe(expected);
      });
    });

    test('returns check digit for any numeric string (no validation)', () => {
      // The function calculates check digit for any numeric string length
      expect(calculateVerhoeffChecksum('123')).toBeDefined();
      expect(typeof calculateVerhoeffChecksum('123')).toBe('number');
      expect(calculateVerhoeffChecksum('12345')).toBeDefined();
      expect(calculateVerhoeffChecksum('123456789012')).toBeDefined();
    });

    test('handles non-numeric input gracefully', () => {
      // Non-numeric characters are treated as 0 by parseInt
      expect(calculateVerhoeffChecksum('1234567890A')).toBeDefined();
    });
  });

  describe('generateAadhaarWithChecksum', () => {
    test('generates valid Aadhaar from prefix', () => {
      const prefix = '23456789012';
      const aadhaar = generateAadhaarWithChecksum(prefix);
      expect(aadhaar).toBe('234567890124');
      expect(validateVerhoeffChecksum(aadhaar)).toBe(true);
    });

    test('generated Aadhaar passes validation', () => {
      const prefixes = ['12345678901', '98765432101', '11111111111', '00000000000'];
      prefixes.forEach(prefix => {
        const aadhaar = generateAadhaarWithChecksum(prefix);
        expect(validateVerhoeffChecksum(aadhaar)).toBe(true);
      });
    });

    test('throws for invalid prefix', () => {
      expect(() => generateAadhaarWithChecksum('12345')).toThrow();
      expect(() => generateAadhaarWithChecksum('1234567890A')).toThrow();
    });
  });

  describe('Algorithm correctness', () => {
    test('single digit error detection', () => {
      // Verhoeff detects all single digit errors
      const valid = '234567890124';
      for (let i = 0; i < valid.length; i++) {
        for (let d = 0; d <= 9; d++) {
          if (d.toString() !== valid[i]) {
            const mutated = valid.slice(0, i) + d + valid.slice(i + 1);
            expect(validateVerhoeffChecksum(mutated)).toBe(false);
          }
        }
      }
    });

    test('adjacent transposition detection', () => {
      // Verhoeff detects all adjacent transpositions
      const valid = '234567890124';
      for (let i = 0; i < valid.length - 1; i++) {
        if (valid[i] !== valid[i + 1]) {
          const transposed = valid.slice(0, i) + valid[i + 1] + valid[i] + valid.slice(i + 2);
          expect(validateVerhoeffChecksum(transposed)).toBe(false);
        }
      }
    });
  });
});

describe('GSTIN Checksum Algorithm', () => {
  describe('validateGSTINChecksum', () => {
    test('validates known correct GSTIN checksums', () => {
      const validGSTINs = [
        '29AAAAA0000A1ZY',
        '07AAAAA0000A1Z4',
        '27AAAAA0000A1Z2',
        '33AAAAA0000A1Z9',
        '36AAAAA0000A1Z3',
      ];
      validGSTINs.forEach(gstin => {
        expect(validateGSTINChecksum(gstin)).toBe(true);
      });
    });

    test('rejects GSTINs with invalid checksum', () => {
      const invalidGSTINs = [
        '29AAAAA0000A1ZZ',
        '07AAAAA0000A1Z5',
        '27AAAAA0000A1Z3',
      ];
      invalidGSTINs.forEach(gstin => {
        expect(validateGSTINChecksum(gstin)).toBe(false);
      });
    });

    test('rejects wrong length', () => {
      expect(validateGSTINChecksum('29AAAAA0000A1Z')).toBe(false);
      expect(validateGSTINChecksum('29AAAAA0000A1Z55')).toBe(false);
    });

    test('rejects invalid characters', () => {
      expect(validateGSTINChecksum('29AAAAA0000A1Z!')).toBe(false);
    });
  });

  describe('calculateGSTINCheckDigit', () => {
    test('calculates correct check digit for known prefixes', () => {
      const testVectors: [string, string][] = [
        ['29AAAAA0000A1Z', 'Y'],
        ['07AAAAA0000A1Z', '4'],
        ['27AAAAA0000A1Z', '2'],
        ['33AAAAA0000A1Z', '9'],
        ['36AAAAA0000A1Z', '3'],
      ];
      testVectors.forEach(([prefix, expected]) => {
        expect(calculateGSTINCheckDigit(prefix)).toBe(expected);
      });
    });

    test('throws for wrong length', () => {
      expect(() => calculateGSTINCheckDigit('29AAAAA0000A1')).toThrow('exactly 14 characters');
      expect(() => calculateGSTINCheckDigit('29AAAAA0000A1Z5')).toThrow('exactly 14 characters');
    });

    test('throws for invalid characters', () => {
      expect(() => calculateGSTINCheckDigit('29AAAAA0000A1!')).toThrow('Invalid character');
    });
  });

  describe('generateGSTINWithChecksum', () => {
    test('generates valid GSTIN from prefix', () => {
      const prefix = '29AAAAA0000A1Z';
      const gstin = generateGSTINWithChecksum(prefix);
      expect(gstin).toBe('29AAAAA0000A1ZY');
      expect(validateGSTINChecksum(gstin)).toBe(true);
    });

    test('generated GSTIN passes validation', () => {
      const prefixes = ['29AAAAA0000A1Z', '07AAAAA0000A1Z', '27AAAAA0000A1Z'];
      prefixes.forEach(prefix => {
        const gstin = generateGSTINWithChecksum(prefix);
        expect(validateGSTINChecksum(gstin)).toBe(true);
      });
    });

    test('throws for invalid prefix', () => {
      expect(() => generateGSTINWithChecksum('29AAAAA0000A1')).toThrow();
      expect(() => generateGSTINWithChecksum('29AAAAA0000A1!')).toThrow();
    });
  });

  describe('Algorithm correctness', () => {
    test('single digit error detection', () => {
      const valid = '29AAAAA0000A1ZY';
      for (let i = 0; i < valid.length; i++) {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (const c of chars) {
          if (c !== valid[i]) {
            const mutated = valid.slice(0, i) + c + valid.slice(i + 1);
            expect(validateGSTINChecksum(mutated)).toBe(false);
          }
        }
      }
    });
  });
});

describe('GST State Codes', () => {
  describe('isValidGSTStateCode', () => {
    test('returns true for all valid state codes', () => {
      Object.keys(GST_STATE_CODES).forEach(code => {
        expect(isValidGSTStateCode(code)).toBe(true);
      });
    });

    test('returns false for invalid codes', () => {
      expect(isValidGSTStateCode('00')).toBe(false);
      expect(isValidGSTStateCode('40')).toBe(false);
      expect(isValidGSTStateCode('99')).toBe(true);  // Center jurisdiction is valid
      expect(isValidGSTStateCode('AB')).toBe(false);
      expect(isValidGSTStateCode('')).toBe(false);
    });
  });

  describe('getGSTStateName', () => {
    test('returns correct state name for valid codes', () => {
      expect(getGSTStateName('01')).toBe('Jammu & Kashmir');
      expect(getGSTStateName('07')).toBe('Delhi');
      expect(getGSTStateName('26')).toBe('Dadra and Nagar Haveli and Daman and Diu');
      expect(getGSTStateName('27')).toBe('Maharashtra');
      expect(getGSTStateName('28')).toBe('Andhra Pradesh (Old)');
      expect(getGSTStateName('29')).toBe('Karnataka');
      expect(getGSTStateName('30')).toBe('Goa');
      expect(getGSTStateName('31')).toBe('Lakshadweep');
      expect(getGSTStateName('32')).toBe('Kerala');
      expect(getGSTStateName('33')).toBe('Tamil Nadu');
      expect(getGSTStateName('34')).toBe('Puducherry');
      expect(getGSTStateName('35')).toBe('Andaman and Nicobar Islands');
      expect(getGSTStateName('36')).toBe('Telangana');
      expect(getGSTStateName('37')).toBe('Andhra Pradesh');
      expect(getGSTStateName('38')).toBe('Ladakh');
    });

    test('returns undefined for invalid codes', () => {
      expect(getGSTStateName('00')).toBeUndefined();
      expect(getGSTStateName('40')).toBeUndefined();
      expect(getGSTStateName('AB')).toBeUndefined();
    });
  });
});