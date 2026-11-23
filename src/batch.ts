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
 * Default batch validation options.
 */
const DEFAULT_BATCH_OPTIONS: Required<BatchValidateOptions> = {
  stopOnFirstInvalid: false,
  maxItems: Infinity,
};

/**
 * Validate multiple values using a validator function.
 * @param inputs - Array of values to validate
 * @param validator - Validator function to use
 * @param options - Batch validation options
 * @returns Array of batch item results
 */
export function validateAll<TInput, TOutput>(
  inputs: TInput[],
  validator: Validator<TInput, TOutput>,
  options: BatchValidateOptions = {}
): BatchItemResult<TOutput>[] {
  const opts = { ...DEFAULT_BATCH_OPTIONS, ...options };
  const results: BatchItemResult<TOutput>[] = [];
  const maxItems = Math.min(inputs.length, opts.maxItems);

  for (let i = 0; i < maxItems; i++) {
    const input = inputs[i]!;
    const result = validator(input);
    results.push({ input, result, index: i });

    if (opts.stopOnFirstInvalid && !result.valid) {
      break;
    }
  }

  return results;
}

/**
 * Synchronous alias for validateAll (for API consistency).
 * @param inputs - Array of values to validate
 * @param validator - Validator function to use
 * @param options - Batch validation options
 * @returns Array of batch item results
 */
export function validateAllSync<TInput, TOutput>(
  inputs: TInput[],
  validator: Validator<TInput, TOutput>,
  options: BatchValidateOptions = {}
): BatchItemResult<TOutput>[] {
  return validateAll(inputs, validator, options);
}

/**
 * Get a summary of batch validation results.
 * @param results - Results from validateAll
 * @returns Summary object
 */
export function getBatchSummary<T>(results: BatchItemResult<T>[]): BatchValidationSummary {
  const valid = results.filter(r => r.result.valid).length;
  const invalid = results.length - valid;
  return {
    total: results.length,
    valid,
    invalid,
    allValid: invalid === 0,
  };
}

/**
 * Filter valid items from batch results.
 * @param results - Results from validateAll
 * @returns Array of normalized valid values
 */
export function getValidValues<T>(results: BatchItemResult<T>[]): T[] {
  return results
    .filter(r => r.result.valid && r.result.normalized !== undefined)
    .map(r => r.result.normalized as T);
}

/**
 * Get only valid normalized values from inputs (convenience function).
 * @param inputs - Array of input values
 * @param isValid - Quick boolean validator
 * @param normalize - Normalization function
 * @returns Array of normalized valid values
 */
export function getValid<TInput, TOutput>(
  inputs: TInput[],
  isValid: IsValidFn<TInput>,
  normalize: NormalizeFn<TInput, TOutput>
): TOutput[] {
  const result: TOutput[] = [];
  for (const input of inputs) {
    if (isValid(input)) {
      const normalized = normalize(input);
      if (normalized !== null) {
        result.push(normalized);
      }
    }
  }
  return result;
}

/**
 * Filter invalid items from batch results.
 * @param results - Results from validateAll
 * @returns Array of invalid items with their errors
 */
export function getInvalidItems<T>(results: BatchItemResult<T>[]): BatchItemResult<T>[] {
  return results.filter(r => !r.result.valid);
}

/**
 * Create a batch validator for a specific type.
 * @param validator - Validator function
 * @param isValid - Quick boolean validator
 * @param normalize - Normalization function
 * @returns Object with batch validation methods
 */
export function createBatchValidator<TInput, TOutput>(
  validator: Validator<TInput, TOutput>,
  isValid: IsValidFn<TInput>,
  normalize: NormalizeFn<TInput, TOutput>
) {
  return {
    /**
     * Validate multiple values.
     */
    validateAll: (inputs: TInput[], options?: BatchValidateOptions) =>
      validateAll(inputs, validator, options),

    /**
     * Validate multiple values (sync alias).
     */
    validateAllSync: (inputs: TInput[], options?: BatchValidateOptions) =>
      validateAllSync(inputs, validator, options),

    /**
     * Quick check if all values are valid.
     */
    allValid: (inputs: TInput[]): boolean =>
      inputs.every(isValid),

    /**
     * Get only valid normalized values from inputs.
     */
    getValid: (inputs: TInput[]): TOutput[] =>
      getValid(inputs, isValid, normalize),

    /**
     * Get validation summary for inputs.
     */
    getSummary: (inputs: TInput[]): BatchValidationSummary => {
      const results = validateAll(inputs, validator);
      return getBatchSummary(results);
    },
  };
}