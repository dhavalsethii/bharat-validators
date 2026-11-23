/**
 * Shared types for all validators in bharat-validators.
 * @packageDocumentation
 */
/**
 * Standard validation error codes used across all validators.
 */
export declare enum ValidationErrorCode {
    /** Input is null or undefined */
    NULL_INPUT = "NULL_INPUT",
    /** Input is not a string (after normalization) */
    INVALID_TYPE = "INVALID_TYPE",
    /** Input string is empty */
    EMPTY_INPUT = "EMPTY_INPUT",
    /** Input does not match the expected format/pattern */
    INVALID_FORMAT = "INVALID_FORMAT",
    /** Input length does not match expected length */
    INVALID_LENGTH = "INVALID_LENGTH",
    /** Checksum validation failed */
    INVALID_CHECKSUM = "INVALID_CHECKSUM",
    /** Invalid state code (GSTIN) */
    INVALID_STATE_CODE = "INVALID_STATE_CODE",
    /** Invalid entity category (PAN) */
    INVALID_ENTITY_CATEGORY = "INVALID_ENTITY_CATEGORY",
    /** Invalid bank code (IFSC) */
    INVALID_BANK_CODE = "INVALID_BANK_CODE",
    /** Input contains invalid characters */
    INVALID_CHARACTERS = "INVALID_CHARACTERS"
}
/**
 * Represents a validation error with a standard code and message.
 */
export interface ValidationError {
    /** Machine-readable error code */
    code: ValidationErrorCode;
    /** Human-readable error message */
    message: string;
    /** The input value that caused the error (optional, for debugging) */
    input?: unknown;
}
/**
 * Result of a validation operation.
 */
export interface ValidationResult<T = unknown> {
    /** Whether the input is valid */
    valid: boolean;
    /** Array of validation errors (empty if valid) */
    errors: ValidationError[];
    /** The normalized/sanitized input value (if valid) */
    normalized?: T;
}
/**
 * Generic validator function signature.
 */
export type Validator<TInput = unknown, TOutput = string> = (input: TInput) => ValidationResult<TOutput>;
/**
 * Simple boolean validator function signature.
 */
export type IsValidFn<TInput = unknown> = (input: TInput) => boolean;
/**
 * Normalization function signature.
 */
export type NormalizeFn<TInput = unknown, TOutput = string> = (input: TInput) => TOutput | null;
/**
 * Entity categories for PAN validation (4th character).
 */
export declare enum PANEntityCategory {
    INDIVIDUAL = "P",
    COMPANY = "C",
    HUF = "H",
    FIRM = "F",
    AOP = "A",
    BOI = "B",
    LOCAL_AUTHORITY = "L",
    ARTIFICIAL_JURIDICAL_PERSON = "J",
    GOVERNMENT = "G",
    TRUST = "T"
}
/**
 * Valid Indian state/UT codes for GSTIN (first 2 digits).
 * As per GST state code list.
 */
export declare const GST_STATE_CODES: Record<string, string>;
/**
 * Check if a string is a valid GST state code.
 */
export declare function isValidGSTStateCode(code: string): boolean;
/**
 * Get state name from GST state code.
 */
export declare function getGSTStateName(code: string): string | undefined;
//# sourceMappingURL=types.d.ts.map