/**
 * GSTIN (Goods and Services Tax Identification Number) validator.
 * Validates format (15 characters), state code, PAN structure, and checksum.
 * @packageDocumentation
 */
import { validateGSTINChecksum } from '../utils/gstin-checksum.js';
import { ValidationErrorCode, isValidGSTStateCode, getGSTStateName, } from '../utils/types.js';
const GSTIN_PATTERN = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;
const GSTIN_LENGTH = 15;
/**
 * Normalize a GSTIN input by converting to uppercase and removing spaces.
 * @param input - Raw input value
 * @returns Normalized GSTIN string or null if invalid format
 */
export const normalizeGSTIN = (input) => {
    if (input === null || input === undefined) {
        return null;
    }
    const str = String(input).trim().toUpperCase().replace(/\s+/g, '');
    return GSTIN_PATTERN.test(str) ? str : null;
};
/**
 * Create a validation error for GSTIN.
 */
function createError(code, message, input) {
    return { code, message, input };
}
/**
 * Parse GSTIN components.
 * @param gstin - GSTIN string (will be normalized)
 * @returns Parsed components or null if invalid
 */
export function parseGSTIN(gstin) {
    const normalized = normalizeGSTIN(gstin);
    if (!normalized) {
        return null;
    }
    // GSTIN_PATTERN ensures 15 characters, so indices 12 and 14 are valid
    return {
        stateCode: normalized.slice(0, 2),
        stateName: getGSTStateName(normalized.slice(0, 2)),
        pan: normalized.slice(2, 12),
        entityCode: normalized[12],
        checkDigit: normalized[14],
    };
}
/**
 * Validate a GSTIN with detailed result.
 * Checks format, state code, PAN structure, and checksum.
 * @param input - GSTIN to validate
 * @returns ValidationResult with validity, errors, and normalized value
 */
export const validateGSTIN = (input) => {
    const errors = [];
    if (input === null || input === undefined) {
        errors.push(createError(ValidationErrorCode.NULL_INPUT, 'GSTIN cannot be null or undefined', input));
        return { valid: false, errors };
    }
    const normalized = normalizeGSTIN(input);
    if (!normalized) {
        if (typeof input !== 'string' && typeof input !== 'number') {
            errors.push(createError(ValidationErrorCode.INVALID_TYPE, 'GSTIN must be a string or number', input));
        }
        else {
            const str = String(input).trim();
            if (str.length === 0) {
                errors.push(createError(ValidationErrorCode.EMPTY_INPUT, 'GSTIN cannot be empty', input));
            }
            else if (!/^[A-Za-z0-9\s]+$/.test(str)) {
                errors.push(createError(ValidationErrorCode.INVALID_CHARACTERS, 'GSTIN can only contain alphanumeric characters and spaces', input));
            }
            else if (str.replace(/\s+/g, '').length !== GSTIN_LENGTH) {
                errors.push(createError(ValidationErrorCode.INVALID_LENGTH, `GSTIN must be exactly ${GSTIN_LENGTH} characters`, input));
            }
            else {
                errors.push(createError(ValidationErrorCode.INVALID_FORMAT, 'GSTIN format must be: 2 digits (state) + 5 letters + 4 digits + 1 letter + 1 alphanumeric + 1 letter + 1 alphanumeric', input));
            }
        }
        return { valid: false, errors };
    }
    // Validate state code (first 2 digits)
    const stateCode = normalized.slice(0, 2);
    if (!isValidGSTStateCode(stateCode)) {
        errors.push(createError(ValidationErrorCode.INVALID_STATE_CODE, `Invalid GST state code: '${stateCode}'`, input));
        return { valid: false, errors };
    }
    // Validate PAN structure within GSTIN (characters 3-12)
    const embeddedPan = normalized.slice(2, 12);
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (!panPattern.test(embeddedPan)) {
        errors.push(createError(ValidationErrorCode.INVALID_FORMAT, 'Invalid PAN structure within GSTIN (characters 3-12)', input));
        return { valid: false, errors };
    }
    // Validate entity code (13th character) - should be 1-9 or A-Z (not 0)
    const entityCode = normalized[12];
    if (entityCode === '0') {
        errors.push(createError(ValidationErrorCode.INVALID_FORMAT, 'Entity code (13th character) cannot be 0', input));
        return { valid: false, errors };
    }
    // Validate checksum
    if (!validateGSTINChecksum(normalized)) {
        errors.push(createError(ValidationErrorCode.INVALID_CHECKSUM, 'GSTIN has invalid checksum', input));
        return { valid: false, errors };
    }
    return { valid: true, errors: [], normalized };
};
/**
 * Quick boolean check for GSTIN validity.
 * @param input - GSTIN to validate
 * @returns true if valid, false otherwise
 */
export const isValidGSTIN = (input) => {
    return validateGSTIN(input).valid;
};
/**
 * GSTIN validator API.
 */
export const gstin = {
    validate: validateGSTIN,
    isValid: isValidGSTIN,
    normalize: normalizeGSTIN,
    parse: parseGSTIN,
};
//# sourceMappingURL=gstin.js.map