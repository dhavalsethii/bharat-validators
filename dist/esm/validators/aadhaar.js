/**
 * Aadhaar number validator.
 * Validates format (12 digits) and Verhoeff checksum.
 * @packageDocumentation
 */
import { validateVerhoeffChecksum } from '../utils/verhoeff.js';
import { ValidationErrorCode, } from '../utils/types.js';
const AADHAAR_PATTERN = /^[2-9]\d{11}$/;
const AADHAAR_LENGTH = 12;
/**
 * Normalize an Aadhaar input by removing spaces and hyphens.
 * @param input - Raw input value
 * @returns Normalized 12-digit string or null if invalid type
 */
export const normalizeAadhaar = (input) => {
    if (input === null || input === undefined) {
        return null;
    }
    const str = String(input).trim().replace(/[\s-]/g, '');
    return AADHAAR_PATTERN.test(str) ? str : null;
};
/**
 * Create a validation error for Aadhaar.
 */
function createError(code, message, input) {
    return { code, message, input };
}
/**
 * Validate an Aadhaar number with detailed result.
 * Checks format (12 digits) and Verhoeff checksum.
 * @param input - Aadhaar number to validate
 * @returns ValidationResult with validity, errors, and normalized value
 */
export const validateAadhaar = (input) => {
    const errors = [];
    if (input === null || input === undefined) {
        errors.push(createError(ValidationErrorCode.NULL_INPUT, 'Aadhaar number cannot be null or undefined', input));
        return { valid: false, errors };
    }
    const normalized = normalizeAadhaar(input);
    if (!normalized) {
        if (typeof input !== 'string' && typeof input !== 'number') {
            errors.push(createError(ValidationErrorCode.INVALID_TYPE, 'Aadhaar number must be a string or number', input));
        }
        else {
            const str = String(input).trim();
            if (str.length === 0) {
                errors.push(createError(ValidationErrorCode.EMPTY_INPUT, 'Aadhaar number cannot be empty', input));
            }
            else if (!/^[\d\s-]+$/.test(str)) {
                errors.push(createError(ValidationErrorCode.INVALID_CHARACTERS, 'Aadhaar number can only contain digits, spaces, and hyphens', input));
            }
            else if (str.replace(/[\s-]/g, '').length !== AADHAAR_LENGTH) {
                errors.push(createError(ValidationErrorCode.INVALID_LENGTH, `Aadhaar number must be exactly ${AADHAAR_LENGTH} digits`, input));
            }
            else {
                errors.push(createError(ValidationErrorCode.INVALID_FORMAT, 'Aadhaar number must be exactly 12 digits', input));
            }
        }
        return { valid: false, errors };
    }
    // Validate Verhoeff checksum
    if (!validateVerhoeffChecksum(normalized)) {
        errors.push(createError(ValidationErrorCode.INVALID_CHECKSUM, 'Aadhaar number has invalid checksum', input));
        return { valid: false, errors };
    }
    return { valid: true, errors: [], normalized };
};
/**
 * Quick boolean check for Aadhaar validity.
 * @param input - Aadhaar number to validate
 * @returns true if valid, false otherwise
 */
export const isValidAadhaar = (input) => {
    return validateAadhaar(input).valid;
};
/**
 * Aadhaar validator API.
 */
export const aadhaar = {
    validate: validateAadhaar,
    isValid: isValidAadhaar,
    normalize: normalizeAadhaar,
};
//# sourceMappingURL=aadhaar.js.map