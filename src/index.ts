/**
 * Bharat Validators - Zero-dependency validators for Indian identifiers.
 *
 * @packageDocumentation
 * @version 1.0.0
 *
 * @example
 * ```typescript
 * import {
 *   isValidAadhaar, validateAadhaar, normalizeAadhaar,
 *   isValidPAN, validatePAN, normalizePAN,
 *   isValidGSTIN, validateGSTIN, normalizeGSTIN,
 *   isValidIFSC, validateIFSC, normalizeIFSC,
 *   isValidMobile, validateMobile, normalizeMobile,
 *   isValidPincode, validatePincode, normalizePincode,
 *   validateAll, createBatchValidator
 * } from 'bharat-validators';
 *
 * // Quick boolean checks
 * if (isValidAadhaar('123456789012')) { ... }
 *
 * // Detailed validation with errors
 * const result = validatePAN('ABCPA1234F');
 * if (!result.valid) {
 *   console.log(result.errors);
 * }
 *
 * // Batch validation
 * const panResults = validateAll(['ABCDE1234F', 'INVALID'], validatePAN);
 * ```
 */

// Types and errors
export {
  ValidationErrorCode,
  ValidationError,
  ValidationResult,
  Validator,
  IsValidFn,
  NormalizeFn,
  PANEntityCategory,
  GST_STATE_CODES,
  isValidGSTStateCode,
  getGSTStateName,
} from './utils/types.js';

// Aadhaar
export {
  validateAadhaar,
  isValidAadhaar,
  normalizeAadhaar,
  aadhaar,
} from './validators/aadhaar.js';

// PAN
export {
  validatePAN,
  isValidPAN,
  normalizePAN,
  pan,
  getPANEntityCategory,
} from './validators/pan.js';

// GSTIN
export {
  validateGSTIN,
  isValidGSTIN,
  normalizeGSTIN,
  gstin,
  parseGSTIN,
} from './validators/gstin.js';

// IFSC
export {
  validateIFSC,
  isValidIFSC,
  normalizeIFSC,
  ifsc,
  getIFSCBankCode,
} from './validators/ifsc.js';

// Mobile
export {
  validateMobile,
  isValidMobile,
  normalizeMobile,
  mobile,
  formatMobile,
} from './validators/mobile.js';

// PIN code
export {
  validatePincode,
  isValidPincode,
  normalizePincode,
  pincode,
  getPincodeZone,
} from './validators/pincode.js';

// Batch validation
export {
  validateAll,
  validateAllSync,
  getBatchSummary,
  getValidValues,
  getValid,
  getInvalidItems,
  createBatchValidator,
  type BatchItemResult,
  type BatchValidationSummary,
  type BatchValidateOptions,
} from './batch.js';

// Utility functions (for advanced use)
export {
  validateVerhoeffChecksum,
  calculateVerhoeffChecksum,
  generateAadhaarWithChecksum,
} from './utils/verhoeff.js';

export {
  validateGSTINChecksum,
  calculateGSTINCheckDigit,
  generateGSTINWithChecksum,
} from './utils/gstin-checksum.js';

// Import all for default export
import * as types from './utils/types.js';
import * as aadhaarValidator from './validators/aadhaar.js';
import * as panValidator from './validators/pan.js';
import * as gstinValidator from './validators/gstin.js';
import * as ifscValidator from './validators/ifsc.js';
import * as mobileValidator from './validators/mobile.js';
import * as pincodeValidator from './validators/pincode.js';
import * as batch from './batch.js';
import * as verhoeff from './utils/verhoeff.js';
import * as gstinChecksum from './utils/gstin-checksum.js';

/**
 * All validators grouped by type for convenient access.
 */
export const validators = {
  aadhaar: {
    validate: aadhaarValidator.validateAadhaar,
    isValid: aadhaarValidator.isValidAadhaar,
    normalize: aadhaarValidator.normalizeAadhaar,
  },
  pan: {
    validate: panValidator.validatePAN,
    isValid: panValidator.isValidPAN,
    normalize: panValidator.normalizePAN,
  },
  gstin: {
    validate: gstinValidator.validateGSTIN,
    isValid: gstinValidator.isValidGSTIN,
    normalize: gstinValidator.normalizeGSTIN,
  },
  ifsc: {
    validate: ifscValidator.validateIFSC,
    isValid: ifscValidator.isValidIFSC,
    normalize: ifscValidator.normalizeIFSC,
  },
  mobile: {
    validate: mobileValidator.validateMobile,
    isValid: mobileValidator.isValidMobile,
    normalize: mobileValidator.normalizeMobile,
  },
  pincode: {
    validate: pincodeValidator.validatePincode,
    isValid: pincodeValidator.isValidPincode,
    normalize: pincodeValidator.normalizePincode,
  },
} as const;

/**
 * Version of the package.
 */
export const VERSION = '1.0.0';

/**
 * Default export with all validators.
 */
export default {
  // Types
  ValidationErrorCode: types.ValidationErrorCode,
  PANEntityCategory: types.PANEntityCategory,
  GST_STATE_CODES: types.GST_STATE_CODES,
  isValidGSTStateCode: types.isValidGSTStateCode,
  getGSTStateName: types.getGSTStateName,

  // Aadhaar
  validateAadhaar: aadhaarValidator.validateAadhaar,
  isValidAadhaar: aadhaarValidator.isValidAadhaar,
  normalizeAadhaar: aadhaarValidator.normalizeAadhaar,

  // PAN
  validatePAN: panValidator.validatePAN,
  isValidPAN: panValidator.isValidPAN,
  normalizePAN: panValidator.normalizePAN,
  getPANEntityCategory: panValidator.getPANEntityCategory,

  // GSTIN
  validateGSTIN: gstinValidator.validateGSTIN,
  isValidGSTIN: gstinValidator.isValidGSTIN,
  normalizeGSTIN: gstinValidator.normalizeGSTIN,
  parseGSTIN: gstinValidator.parseGSTIN,

  // IFSC
  validateIFSC: ifscValidator.validateIFSC,
  isValidIFSC: ifscValidator.isValidIFSC,
  normalizeIFSC: ifscValidator.normalizeIFSC,
  getIFSCBankCode: ifscValidator.getIFSCBankCode,

  // Mobile
  validateMobile: mobileValidator.validateMobile,
  isValidMobile: mobileValidator.isValidMobile,
  normalizeMobile: mobileValidator.normalizeMobile,
  formatMobile: mobileValidator.formatMobile,

  // PIN code
  validatePincode: pincodeValidator.validatePincode,
  isValidPincode: pincodeValidator.isValidPincode,
  normalizePincode: pincodeValidator.normalizePincode,
  getPincodeZone: pincodeValidator.getPincodeZone,

  // Batch
  validateAll: batch.validateAll,
  validateAllSync: batch.validateAllSync,
  getBatchSummary: batch.getBatchSummary,
  getValidValues: batch.getValidValues,
  getValid: batch.getValid,
  getInvalidItems: batch.getInvalidItems,
  createBatchValidator: batch.createBatchValidator,

  // Utilities
  validateVerhoeffChecksum: verhoeff.validateVerhoeffChecksum,
  calculateVerhoeffChecksum: verhoeff.calculateVerhoeffChecksum,
  generateAadhaarWithChecksum: verhoeff.generateAadhaarWithChecksum,
  validateGSTINChecksum: gstinChecksum.validateGSTINChecksum,
  calculateGSTINCheckDigit: gstinChecksum.calculateGSTINCheckDigit,
  generateGSTINWithChecksum: gstinChecksum.generateGSTINWithChecksum,

  // Grouped validators
  validators,
  VERSION,
};