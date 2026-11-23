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
export { ValidationErrorCode, ValidationError, ValidationResult, Validator, IsValidFn, NormalizeFn, PANEntityCategory, GST_STATE_CODES, isValidGSTStateCode, getGSTStateName, } from './utils/types.js';
export { validateAadhaar, isValidAadhaar, normalizeAadhaar, aadhaar, } from './validators/aadhaar.js';
export { validatePAN, isValidPAN, normalizePAN, pan, getPANEntityCategory, } from './validators/pan.js';
export { validateGSTIN, isValidGSTIN, normalizeGSTIN, gstin, parseGSTIN, } from './validators/gstin.js';
export { validateIFSC, isValidIFSC, normalizeIFSC, ifsc, getIFSCBankCode, } from './validators/ifsc.js';
export { validateMobile, isValidMobile, normalizeMobile, mobile, formatMobile, } from './validators/mobile.js';
export { validatePincode, isValidPincode, normalizePincode, pincode, getPincodeZone, } from './validators/pincode.js';
export { validateAll, validateAllSync, getBatchSummary, getValidValues, getValid, getInvalidItems, createBatchValidator, type BatchItemResult, type BatchValidationSummary, type BatchValidateOptions, } from './batch.js';
export { validateVerhoeffChecksum, calculateVerhoeffChecksum, generateAadhaarWithChecksum, } from './utils/verhoeff.js';
export { validateGSTINChecksum, calculateGSTINCheckDigit, generateGSTINWithChecksum, } from './utils/gstin-checksum.js';
import * as types from './utils/types.js';
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
export declare const validators: {
    readonly aadhaar: {
        readonly validate: types.Validator<unknown, string>;
        readonly isValid: types.IsValidFn<unknown>;
        readonly normalize: types.NormalizeFn<unknown, string>;
    };
    readonly pan: {
        readonly validate: types.Validator<unknown, string>;
        readonly isValid: types.IsValidFn<unknown>;
        readonly normalize: types.NormalizeFn<unknown, string>;
    };
    readonly gstin: {
        readonly validate: types.Validator<unknown, string>;
        readonly isValid: types.IsValidFn<unknown>;
        readonly normalize: types.NormalizeFn<unknown, string>;
    };
    readonly ifsc: {
        readonly validate: types.Validator<unknown, string>;
        readonly isValid: types.IsValidFn<unknown>;
        readonly normalize: types.NormalizeFn<unknown, string>;
    };
    readonly mobile: {
        readonly validate: types.Validator<unknown, string>;
        readonly isValid: types.IsValidFn<unknown>;
        readonly normalize: types.NormalizeFn<unknown, string>;
    };
    readonly pincode: {
        readonly validate: types.Validator<unknown, string>;
        readonly isValid: types.IsValidFn<unknown>;
        readonly normalize: types.NormalizeFn<unknown, string>;
    };
};
/**
 * Version of the package.
 */
export declare const VERSION = "1.0.0";
/**
 * Default export with all validators.
 */
declare const _default: {
    ValidationErrorCode: typeof types.ValidationErrorCode;
    PANEntityCategory: typeof types.PANEntityCategory;
    GST_STATE_CODES: Record<string, string>;
    isValidGSTStateCode: typeof types.isValidGSTStateCode;
    getGSTStateName: typeof types.getGSTStateName;
    validateAadhaar: types.Validator<unknown, string>;
    isValidAadhaar: types.IsValidFn<unknown>;
    normalizeAadhaar: types.NormalizeFn<unknown, string>;
    validatePAN: types.Validator<unknown, string>;
    isValidPAN: types.IsValidFn<unknown>;
    normalizePAN: types.NormalizeFn<unknown, string>;
    getPANEntityCategory: typeof panValidator.getPANEntityCategory;
    validateGSTIN: types.Validator<unknown, string>;
    isValidGSTIN: types.IsValidFn<unknown>;
    normalizeGSTIN: types.NormalizeFn<unknown, string>;
    parseGSTIN: typeof gstinValidator.parseGSTIN;
    validateIFSC: types.Validator<unknown, string>;
    isValidIFSC: types.IsValidFn<unknown>;
    normalizeIFSC: types.NormalizeFn<unknown, string>;
    getIFSCBankCode: typeof ifscValidator.getIFSCBankCode;
    validateMobile: types.Validator<unknown, string>;
    isValidMobile: types.IsValidFn<unknown>;
    normalizeMobile: types.NormalizeFn<unknown, string>;
    formatMobile: typeof mobileValidator.formatMobile;
    validatePincode: types.Validator<unknown, string>;
    isValidPincode: types.IsValidFn<unknown>;
    normalizePincode: types.NormalizeFn<unknown, string>;
    getPincodeZone: typeof pincodeValidator.getPincodeZone;
    validateAll: typeof batch.validateAll;
    validateAllSync: typeof batch.validateAllSync;
    getBatchSummary: typeof batch.getBatchSummary;
    getValidValues: typeof batch.getValidValues;
    getValid: typeof batch.getValid;
    getInvalidItems: typeof batch.getInvalidItems;
    createBatchValidator: typeof batch.createBatchValidator;
    validateVerhoeffChecksum: typeof verhoeff.validateVerhoeffChecksum;
    calculateVerhoeffChecksum: typeof verhoeff.calculateVerhoeffChecksum;
    generateAadhaarWithChecksum: typeof verhoeff.generateAadhaarWithChecksum;
    validateGSTINChecksum: typeof gstinChecksum.validateGSTINChecksum;
    calculateGSTINCheckDigit: typeof gstinChecksum.calculateGSTINCheckDigit;
    generateGSTINWithChecksum: typeof gstinChecksum.generateGSTINWithChecksum;
    validators: {
        readonly aadhaar: {
            readonly validate: types.Validator<unknown, string>;
            readonly isValid: types.IsValidFn<unknown>;
            readonly normalize: types.NormalizeFn<unknown, string>;
        };
        readonly pan: {
            readonly validate: types.Validator<unknown, string>;
            readonly isValid: types.IsValidFn<unknown>;
            readonly normalize: types.NormalizeFn<unknown, string>;
        };
        readonly gstin: {
            readonly validate: types.Validator<unknown, string>;
            readonly isValid: types.IsValidFn<unknown>;
            readonly normalize: types.NormalizeFn<unknown, string>;
        };
        readonly ifsc: {
            readonly validate: types.Validator<unknown, string>;
            readonly isValid: types.IsValidFn<unknown>;
            readonly normalize: types.NormalizeFn<unknown, string>;
        };
        readonly mobile: {
            readonly validate: types.Validator<unknown, string>;
            readonly isValid: types.IsValidFn<unknown>;
            readonly normalize: types.NormalizeFn<unknown, string>;
        };
        readonly pincode: {
            readonly validate: types.Validator<unknown, string>;
            readonly isValid: types.IsValidFn<unknown>;
            readonly normalize: types.NormalizeFn<unknown, string>;
        };
    };
    VERSION: string;
};
export default _default;
//# sourceMappingURL=index.d.ts.map