/**
 * Batch validation tests.
 */

import {
  validateAll,
  validateAllSync,
  getBatchSummary,
  getValidValues,
  getInvalidItems,
  createBatchValidator,
} from '../src/batch';
import { validatePAN, isValidPAN, normalizePAN } from '../src/validators/pan';
import { validateAadhaar } from '../src/validators/aadhaar';

describe('Batch Validation', () => {
  // Valid PANs with correct entity categories at index 3
  const validPANs = ['ABCPA1234F', 'ABCCA2345G', 'ABCHA3456H'];
  const invalidPANs = ['INVALID1', 'ALSOBAD2', 'NOTGOOD3'];
  const mixedPANs = ['ABCPA1234F', 'INVALID1', 'ABCCA2345G', 'ALSOBAD2'];

  describe('validateAll', () => {
    test('validates all items and returns results with index', () => {
      const results = validateAll(validPANs, validatePAN);
      expect(results).toHaveLength(3);
      results.forEach((r, i) => {
        expect(r.index).toBe(i);
        expect(r.input).toBe(validPANs[i]);
        expect(r.result.valid).toBe(true);
        expect(r.result.normalized).toBe(validPANs[i]);
      });
    });

    test('includes invalid items with errors', () => {
      const results = validateAll(invalidPANs, validatePAN);
      expect(results).toHaveLength(3);
      results.forEach(r => {
        expect(r.result.valid).toBe(false);
        expect(r.result.errors.length).toBeGreaterThan(0);
      });
    });

    test('handles mixed valid/invalid', () => {
      const results = validateAll(mixedPANs, validatePAN);
      expect(results).toHaveLength(4);
      expect(results[0]?.result.valid).toBe(true);
      expect(results[1]?.result.valid).toBe(false);
      expect(results[2]?.result.valid).toBe(true);
      expect(results[3]?.result.valid).toBe(false);
    });

    test('stops on first invalid when option set', () => {
      const results = validateAll(mixedPANs, validatePAN, { stopOnFirstInvalid: true });
      expect(results).toHaveLength(2); // First valid, second invalid -> stop
      expect(results[0]?.result.valid).toBe(true);
      expect(results[1]?.result.valid).toBe(false);
    });

    test('limits max items when option set', () => {
      const results = validateAll(validPANs, validatePAN, { maxItems: 2 });
      expect(results).toHaveLength(2);
    });

    test('handles empty array', () => {
      const results = validateAll([], validatePAN);
      expect(results).toHaveLength(0);
    });

    test('works with different validators', () => {
      const aadhaars = ['234567890124', '234567890125'];
      const results = validateAll(aadhaars, validateAadhaar);
      expect(results).toHaveLength(2);
      expect(results[0]?.result.valid).toBe(true);
      expect(results[1]?.result.valid).toBe(false);
    });
  });

  describe('validateAllSync', () => {
    test('is alias for validateAll', () => {
      const results = validateAllSync(validPANs, validatePAN);
      expect(results).toHaveLength(3);
      results.forEach((r) => {
        expect(r?.result.valid).toBe(true);
      });
    });

    test('supports same options', () => {
      const results = validateAllSync(mixedPANs, validatePAN, { stopOnFirstInvalid: true });
      expect(results).toHaveLength(2);
    });
  });

  describe('getBatchSummary', () => {
    test('returns correct summary for all valid', () => {
      const results = validateAll(validPANs, validatePAN);
      const summary = getBatchSummary(results);
      expect(summary.total).toBe(3);
      expect(summary.valid).toBe(3);
      expect(summary.invalid).toBe(0);
      expect(summary.allValid).toBe(true);
    });

    test('returns correct summary for all invalid', () => {
      const results = validateAll(invalidPANs, validatePAN);
      const summary = getBatchSummary(results);
      expect(summary.total).toBe(3);
      expect(summary.valid).toBe(0);
      expect(summary.invalid).toBe(3);
      expect(summary.allValid).toBe(false);
    });

    test('returns correct summary for mixed', () => {
      const results = validateAll(mixedPANs, validatePAN);
      const summary = getBatchSummary(results);
      expect(summary.total).toBe(4);
      expect(summary.valid).toBe(2);
      expect(summary.invalid).toBe(2);
      expect(summary.allValid).toBe(false);
    });

    test('handles empty results', () => {
      const summary = getBatchSummary([]);
      expect(summary.total).toBe(0);
      expect(summary.valid).toBe(0);
      expect(summary.invalid).toBe(0);
      expect(summary.allValid).toBe(true);
    });
  });

  describe('getValidValues', () => {
    test('returns only normalized valid values', () => {
      const results = validateAll(mixedPANs, validatePAN);
      const valid = getValidValues(results);
      expect(valid).toHaveLength(2);
      expect(valid).toEqual(['ABCPA1234F', 'ABCCA2345G']);
    });

    test('returns empty array for all invalid', () => {
      const results = validateAll(invalidPANs, validatePAN);
      const valid = getValidValues(results);
      expect(valid).toHaveLength(0);
    });

    test('returns all values for all valid', () => {
      const results = validateAll(validPANs, validatePAN);
      const valid = getValidValues(results);
      expect(valid).toHaveLength(3);
      expect(valid).toEqual(validPANs);
    });
  });

  describe('getInvalidItems', () => {
    test('returns only invalid items with errors', () => {
      const results = validateAll(mixedPANs, validatePAN);
      const invalid = getInvalidItems(results);
      expect(invalid).toHaveLength(2);
      expect(invalid[0]?.input).toBe('INVALID1');
      expect(invalid[1]?.input).toBe('ALSOBAD2');
      invalid.forEach(item => {
        expect(item?.result.valid).toBe(false);
        expect(item?.result.errors.length).toBeGreaterThan(0);
      });
    });

    test('returns empty array for all valid', () => {
      const results = validateAll(validPANs, validatePAN);
      const invalid = getInvalidItems(results);
      expect(invalid).toHaveLength(0);
    });

    test('returns all items for all invalid', () => {
      const results = validateAll(invalidPANs, validatePAN);
      const invalid = getInvalidItems(results);
      expect(invalid).toHaveLength(3);
    });
  });

  describe('createBatchValidator', () => {
    test('creates batch validator with all methods', () => {
      const batchPan = createBatchValidator(validatePAN, isValidPAN, normalizePAN);
      expect(typeof batchPan.validateAll).toBe('function');
      expect(typeof batchPan.validateAllSync).toBe('function');
      expect(typeof batchPan.allValid).toBe('function');
      expect(typeof batchPan.getValid).toBe('function');
      expect(typeof batchPan.getSummary).toBe('function');
    });

    test('validateAll works', () => {
      const batchPan = createBatchValidator(validatePAN, isValidPAN, normalizePAN);
      const results = batchPan.validateAll(mixedPANs);
      expect(results).toHaveLength(4);
    });

    test('allValid returns true only if all valid', () => {
      const batchPan = createBatchValidator(validatePAN, isValidPAN, normalizePAN);
      expect(batchPan.allValid(validPANs)).toBe(true);
      expect(batchPan.allValid(mixedPANs)).toBe(false);
      expect(batchPan.allValid(invalidPANs)).toBe(false);
    });

    test('getValid returns normalized valid values', () => {
      const batchPan = createBatchValidator(validatePAN, isValidPAN, normalizePAN);
      const valid = batchPan.getValid(mixedPANs);
      expect(valid).toEqual(['ABCPA1234F', 'ABCCA2345G']);
    });

    test('getValid filters out semantically invalid values', () => {
      const batchPan = createBatchValidator(validatePAN, isValidPAN, normalizePAN);
      // 'ABCZE1234F' passes normalizePAN format but fails isValidPAN (invalid entity category)
      const valid = batchPan.getValid(['ABCPA1234F', 'ABCZE1234F']);
      expect(valid).toEqual(['ABCPA1234F']);
    });

    test('getSummary returns summary', () => {
      const batchPan = createBatchValidator(validatePAN, isValidPAN, normalizePAN);
      const summary = batchPan.getSummary(mixedPANs);
      expect(summary.total).toBe(4);
      expect(summary.valid).toBe(2);
      expect(summary.invalid).toBe(2);
      expect(summary.allValid).toBe(false);
    });
  });

  describe('Edge cases', () => {
    test('handles null/undefined in input array', () => {
      const inputs = ['ABCPA1234F', null, 'ABCCA2345G', undefined];
      const results = validateAll(inputs as any, validatePAN);
      expect(results).toHaveLength(4);
      expect(results[0]?.result.valid).toBe(true);
      expect(results[1]?.result.valid).toBe(false);
      expect(results[1]?.result.errors[0]?.code).toBe('NULL_INPUT');
      expect(results[2]?.result.valid).toBe(true);
      expect(results[3]?.result.valid).toBe(false);
      expect(results[3]?.result.errors[0]?.code).toBe('NULL_INPUT');
    });

    test('preserves input reference in results', () => {
      const inputObj = { pan: 'ABCPA1234F' };
      const results = validateAll([inputObj], (input: any) => validatePAN(input.pan));
      expect(results[0]?.input).toBe(inputObj);
    });

    test('works with empty string inputs', () => {
      const results = validateAll(['', 'ABCPA1234F'], validatePAN);
      expect(results[0]?.result.valid).toBe(false);
      expect(results[1]?.result.valid).toBe(true);
    });
  });
});