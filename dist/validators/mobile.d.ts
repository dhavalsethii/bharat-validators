/**
 * Indian mobile number validator.
 * Validates format (10 digits, starting with 6-9).
 * Supports various input formats: +91, 0 prefix, spaces, hyphens.
 * @packageDocumentation
 */
import { Validator, IsValidFn, NormalizeFn } from '../utils/types.js';
/**
 * Normalize an Indian mobile number to 10-digit format.
 * Handles: +91, 91, 0 prefixes, spaces, hyphens, parentheses.
 * @param input - Raw input value
 * @returns Normalized 10-digit string or null if invalid
 */
export declare const normalizeMobile: NormalizeFn<unknown, string>;
/**
 * Validate an Indian mobile number with detailed result.
 * Checks format (10 digits starting with 6-9).
 * @param input - Mobile number to validate
 * @returns ValidationResult with validity, errors, and normalized value
 */
export declare const validateMobile: Validator<unknown, string>;
/**
 * Quick boolean check for mobile number validity.
 * @param input - Mobile number to validate
 * @returns true if valid, false otherwise
 */
export declare const isValidMobile: IsValidFn<unknown>;
/**
 * Format mobile number for display.
 * @param mobile - Normalized 10-digit mobile number
 * @returns Formatted string (e.g., "+91 98765 43210")
 */
export declare function formatMobile(mobile: string): string;
/**
 * Mobile validator API.
 */
export declare const mobile: {
    validate: Validator<unknown, string>;
    isValid: IsValidFn<unknown>;
    normalize: NormalizeFn<unknown, string>;
    format: typeof formatMobile;
};
//# sourceMappingURL=mobile.d.ts.map