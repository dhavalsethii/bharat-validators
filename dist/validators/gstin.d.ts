/**
 * GSTIN (Goods and Services Tax Identification Number) validator.
 * Validates format (15 characters), state code, PAN structure, and checksum.
 * @packageDocumentation
 */
import { Validator, IsValidFn, NormalizeFn } from '../utils/types.js';
/**
 * Normalize a GSTIN input by converting to uppercase and removing spaces.
 * @param input - Raw input value
 * @returns Normalized GSTIN string or null if invalid format
 */
export declare const normalizeGSTIN: NormalizeFn<unknown, string>;
/**
 * Parse GSTIN components.
 * @param gstin - GSTIN string (will be normalized)
 * @returns Parsed components or null if invalid
 */
export declare function parseGSTIN(gstin: string): {
    stateCode: string;
    stateName: string | undefined;
    pan: string;
    entityCode: string;
    checkDigit: string;
} | null;
/**
 * Validate a GSTIN with detailed result.
 * Checks format, state code, PAN structure, and checksum.
 * @param input - GSTIN to validate
 * @returns ValidationResult with validity, errors, and normalized value
 */
export declare const validateGSTIN: Validator<unknown, string>;
/**
 * Quick boolean check for GSTIN validity.
 * @param input - GSTIN to validate
 * @returns true if valid, false otherwise
 */
export declare const isValidGSTIN: IsValidFn<unknown>;
/**
 * GSTIN validator API.
 */
export declare const gstin: {
    validate: Validator<unknown, string>;
    isValid: IsValidFn<unknown>;
    normalize: NormalizeFn<unknown, string>;
    parse: typeof parseGSTIN;
};
//# sourceMappingURL=gstin.d.ts.map