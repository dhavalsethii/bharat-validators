/**
 * PAN (Permanent Account Number) validator.
 * Validates format (10 characters: 5 letters, 4 digits, 1 letter)
 * and entity category (4th character).
 * @packageDocumentation
 */
import { Validator, IsValidFn, NormalizeFn } from '../utils/types.js';
/**
 * Normalize a PAN input by converting to uppercase and removing spaces.
 * @param input - Raw input value
 * @returns Normalized PAN string or null if invalid format
 */
export declare const normalizePAN: NormalizeFn<unknown, string>;
/**
 * Get entity category description from PAN.
 * @param pan - PAN string (will be normalized)
 * @returns Entity category code and description
 */
export declare function getPANEntityCategory(pan: string): {
    code: string;
    description: string;
} | null;
/**
 * Validate a PAN with detailed result.
 * Checks format and entity category.
 * @param input - PAN to validate
 * @returns ValidationResult with validity, errors, and normalized value
 */
export declare const validatePAN: Validator<unknown, string>;
/**
 * Quick boolean check for PAN validity.
 * @param input - PAN to validate
 * @returns true if valid, false otherwise
 */
export declare const isValidPAN: IsValidFn<unknown>;
/**
 * PAN validator API.
 */
export declare const pan: {
    validate: Validator<unknown, string>;
    isValid: IsValidFn<unknown>;
    normalize: NormalizeFn<unknown, string>;
    getEntityCategory: typeof getPANEntityCategory;
};
//# sourceMappingURL=pan.d.ts.map