/**
 * IFSC (Indian Financial System Code) validator.
 * Validates format (11 characters: 4 letters bank code + 0 + 6 alphanumeric branch code).
 * @packageDocumentation
 */
import { Validator, IsValidFn, NormalizeFn } from '../utils/types.js';
/**
 * Normalize an IFSC input by converting to uppercase and removing spaces.
 * @param input - Raw input value
 * @returns Normalized IFSC string or null if invalid format
 */
export declare const normalizeIFSC: NormalizeFn<unknown, string>;
/**
 * Validate an IFSC with detailed result.
 * Checks format (4 letters + 0 + 6 alphanumeric).
 * @param input - IFSC to validate
 * @returns ValidationResult with validity, errors, and normalized value
 */
export declare const validateIFSC: Validator<unknown, string>;
/**
 * Quick boolean check for IFSC validity.
 * @param input - IFSC to validate
 * @returns true if valid, false otherwise
 */
export declare const isValidIFSC: IsValidFn<unknown>;
/**
 * Get bank code from IFSC.
 * @param ifsc - Valid IFSC string
 * @returns Bank code (first 4 characters) or null if invalid
 */
export declare function getIFSCBankCode(ifsc: string): string | null;
/**
 * IFSC validator API.
 */
export declare const ifsc: {
    validate: Validator<unknown, string>;
    isValid: IsValidFn<unknown>;
    normalize: NormalizeFn<unknown, string>;
    getBankCode: typeof getIFSCBankCode;
};
//# sourceMappingURL=ifsc.d.ts.map