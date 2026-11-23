/**
 * Aadhaar number validator.
 * Validates format (12 digits) and Verhoeff checksum.
 * @packageDocumentation
 */
import { Validator, IsValidFn, NormalizeFn } from '../utils/types.js';
/**
 * Normalize an Aadhaar input by removing spaces and hyphens.
 * @param input - Raw input value
 * @returns Normalized 12-digit string or null if invalid type
 */
export declare const normalizeAadhaar: NormalizeFn<unknown, string>;
/**
 * Validate an Aadhaar number with detailed result.
 * Checks format (12 digits) and Verhoeff checksum.
 * @param input - Aadhaar number to validate
 * @returns ValidationResult with validity, errors, and normalized value
 */
export declare const validateAadhaar: Validator<unknown, string>;
/**
 * Quick boolean check for Aadhaar validity.
 * @param input - Aadhaar number to validate
 * @returns true if valid, false otherwise
 */
export declare const isValidAadhaar: IsValidFn<unknown>;
/**
 * Aadhaar validator API.
 */
export declare const aadhaar: {
    validate: Validator<unknown, string>;
    isValid: IsValidFn<unknown>;
    normalize: NormalizeFn<unknown, string>;
};
//# sourceMappingURL=aadhaar.d.ts.map