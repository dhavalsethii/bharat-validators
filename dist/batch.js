"use strict";
/**
 * Batch validation utilities for validating multiple values at once.
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAll = validateAll;
exports.validateAllSync = validateAllSync;
exports.getBatchSummary = getBatchSummary;
exports.getValidValues = getValidValues;
exports.getValid = getValid;
exports.getInvalidItems = getInvalidItems;
exports.createBatchValidator = createBatchValidator;
/**
 * Default batch validation options.
 */
const DEFAULT_BATCH_OPTIONS = {
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
function validateAll(inputs, validator, options = {}) {
    const opts = { ...DEFAULT_BATCH_OPTIONS, ...options };
    const results = [];
    const maxItems = Math.min(inputs.length, opts.maxItems);
    for (let i = 0; i < maxItems; i++) {
        const input = inputs[i];
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
function validateAllSync(inputs, validator, options = {}) {
    return validateAll(inputs, validator, options);
}
/**
 * Get a summary of batch validation results.
 * @param results - Results from validateAll
 * @returns Summary object
 */
function getBatchSummary(results) {
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
function getValidValues(results) {
    return results
        .filter(r => r.result.valid && r.result.normalized !== undefined)
        .map(r => r.result.normalized);
}
/**
 * Get only valid normalized values from inputs (convenience function).
 * @param inputs - Array of input values
 * @param isValid - Quick boolean validator
 * @param normalize - Normalization function
 * @returns Array of normalized valid values
 */
function getValid(inputs, isValid, normalize) {
    const result = [];
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
function getInvalidItems(results) {
    return results.filter(r => !r.result.valid);
}
/**
 * Create a batch validator for a specific type.
 * @param validator - Validator function
 * @param isValid - Quick boolean validator
 * @param normalize - Normalization function
 * @returns Object with batch validation methods
 */
function createBatchValidator(validator, isValid, normalize) {
    return {
        /**
         * Validate multiple values.
         */
        validateAll: (inputs, options) => validateAll(inputs, validator, options),
        /**
         * Validate multiple values (sync alias).
         */
        validateAllSync: (inputs, options) => validateAllSync(inputs, validator, options),
        /**
         * Quick check if all values are valid.
         */
        allValid: (inputs) => inputs.every(isValid),
        /**
         * Get only valid normalized values from inputs.
         */
        getValid: (inputs) => getValid(inputs, isValid, normalize),
        /**
         * Get validation summary for inputs.
         */
        getSummary: (inputs) => {
            const results = validateAll(inputs, validator);
            return getBatchSummary(results);
        },
    };
}
//# sourceMappingURL=batch.js.map