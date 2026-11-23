/**
 * Batch validation utilities for validating multiple values at once.
 * @packageDocumentation
 */
import { ValidationResult, Validator, IsValidFn, NormalizeFn } from './utils/types.js';
/**
 * Result of batch validation for a single item.
 */
export interface BatchItemResult<T = unknown> {
    /** The original input value */
    input: unknown;
    /** Validation result */
    result: ValidationResult<T>;
    /** Index in the original array */
    index: number;
}
/**
 * Summary of batch validation results.
 */
export interface BatchValidationSummary {
    /** Total number of items validated */
    total: number;
    /** Number of valid items */
    valid: number;
    /** Number of invalid items */
    invalid: number;
    /** Whether all items are valid */
    allValid: boolean;
}
/**
 * Options for batch validation.
 */
export interface BatchValidateOptions {
    /** Stop on first invalid item (default: false) */
    stopOnFirstInvalid?: boolean;
    /** Maximum number of items to process (default: no limit) */
    maxItems?: number;
}
/**
 * Validate multiple values using a validator function.
 * @param inputs - Array of values to validate
 * @param validator - Validator function to use
 * @param options - Batch validation options
 * @returns Array of batch item results
 */
export declare function validateAll<TInput, TOutput>(inputs: TInput[], validator: Validator<TInput, TOutput>, options?: BatchValidateOptions): BatchItemResult<TOutput>[];
/**
 * Synchronous alias for validateAll (for API consistency).
 * @param inputs - Array of values to validate
 * @param validator - Validator function to use
 * @param options - Batch validation options
 * @returns Array of batch item results
 */
export declare function validateAllSync<TInput, TOutput>(inputs: TInput[], validator: Validator<TInput, TOutput>, options?: BatchValidateOptions): BatchItemResult<TOutput>[];
/**
 * Get a summary of batch validation results.
 * @param results - Results from validateAll
 * @returns Summary object
 */
export declare function getBatchSummary<T>(results: BatchItemResult<T>[]): BatchValidationSummary;
/**
 * Filter valid items from batch results.
 * @param results - Results from validateAll
 * @returns Array of normalized valid values
 */
export declare function getValidValues<T>(results: BatchItemResult<T>[]): T[];
/**
 * Get only valid normalized values from inputs (convenience function).
 * @param inputs - Array of input values
 * @param isValid - Quick boolean validator
 * @param normalize - Normalization function
 * @returns Array of normalized valid values
 */
export declare function getValid<TInput, TOutput>(inputs: TInput[], isValid: IsValidFn<TInput>, normalize: NormalizeFn<TInput, TOutput>): TOutput[];
/**
 * Filter invalid items from batch results.
 * @param results - Results from validateAll
 * @returns Array of invalid items with their errors
 */
export declare function getInvalidItems<T>(results: BatchItemResult<T>[]): BatchItemResult<T>[];
/**
 * Create a batch validator for a specific type.
 * @param validator - Validator function
 * @param isValid - Quick boolean validator
 * @param normalize - Normalization function
 * @returns Object with batch validation methods
 */
export declare function createBatchValidator<TInput, TOutput>(validator: Validator<TInput, TOutput>, isValid: IsValidFn<TInput>, normalize: NormalizeFn<TInput, TOutput>): {
    /**
     * Validate multiple values.
     */
    validateAll: (inputs: TInput[], options?: BatchValidateOptions) => BatchItemResult<TOutput>[];
    /**
     * Validate multiple values (sync alias).
     */
    validateAllSync: (inputs: TInput[], options?: BatchValidateOptions) => BatchItemResult<TOutput>[];
    /**
     * Quick check if all values are valid.
     */
    allValid: (inputs: TInput[]) => boolean;
    /**
     * Get only valid normalized values from inputs.
     */
    getValid: (inputs: TInput[]) => TOutput[];
    /**
     * Get validation summary for inputs.
     */
    getSummary: (inputs: TInput[]) => BatchValidationSummary;
};
//# sourceMappingURL=batch.d.ts.map