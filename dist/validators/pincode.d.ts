/**
 * Indian PIN code (Postal Index Number) validator.
 * Validates format (6 digits, first digit 1-8).
 * @packageDocumentation
 */
import { Validator, IsValidFn, NormalizeFn } from '../utils/types.js';
/**
 * Normalize a PIN code input by removing spaces.
 * @param input - Raw input value
 * @returns Normalized 6-digit string or null if invalid
 */
export declare const normalizePincode: NormalizeFn<unknown, string>;
/**
 * Validate an Indian PIN code with detailed result.
 * Checks format (6 digits, first digit 1-8).
 * @param input - PIN code to validate
 * @returns ValidationResult with validity, errors, and normalized value
 */
export declare const validatePincode: Validator<unknown, string>;
/**
 * Quick boolean check for PIN code validity.
 * @param input - PIN code to validate
 * @returns true if valid, false otherwise
 */
export declare const isValidPincode: IsValidFn<unknown>;
/**
 * Get postal zone from PIN code (first digit).
 * @param pincode - Valid PIN code
 * @returns Zone description or null if invalid
 */
export declare function getPincodeZone(pincode: string): string | null;
/**
 * PIN code validator API.
 */
export declare const pincode: {
    validate: Validator<unknown, string>;
    isValid: IsValidFn<unknown>;
    normalize: NormalizeFn<unknown, string>;
    getZone: typeof getPincodeZone;
};
//# sourceMappingURL=pincode.d.ts.map