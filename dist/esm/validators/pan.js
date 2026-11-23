/**
 * PAN (Permanent Account Number) validator.
 * Validates format (10 characters: 5 letters, 4 digits, 1 letter)
 * and entity category (4th character).
 * @packageDocumentation
 */
import { ValidationErrorCode, PANEntityCategory, } from '../utils/types.js';
const PAN_PATTERN = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const PAN_LENGTH = 10;
// Valid entity categories (4th character)
const VALID_ENTITY_CATEGORIES = new Set(Object.values(PANEntityCategory));
/**
 * Normalize a PAN input by converting to uppercase and removing spaces.
 * @param input - Raw input value
 * @returns Normalized PAN string or null if invalid format
 */
export const normalizePAN = (input) => {
    if (input === null || input === undefined) {
        return null;
    }
    const str = String(input).trim().toUpperCase().replace(/\s+/g, '');
    return PAN_PATTERN.test(str) ? str : null;
};
/**
 * Create a validation error for PAN.
 */
function createError(code, message, input) {
    return { code, message, input };
}
/**
 * Get entity category description from PAN.
 * @param pan - PAN string (will be normalized)
 * @returns Entity category code and description
 */
export function getPANEntityCategory(pan) {
    const normalized = normalizePAN(pan);
    if (!normalized) {
        return null;
    }
    const categoryCode = normalized[3];
    // categoryCode is guaranteed to exist since PAN_PATTERN ensures 10 chars
    const categoryMap = {
        [PANEntityCategory.INDIVIDUAL]: 'Individual',
        [PANEntityCategory.COMPANY]: 'Company',
        [PANEntityCategory.HUF]: 'Hindu Undivided Family (HUF)',
        [PANEntityCategory.FIRM]: 'Firm/Partnership',
        [PANEntityCategory.AOP]: 'Association of Persons (AOP)',
        [PANEntityCategory.BOI]: 'Body of Individuals (BOI)',
        [PANEntityCategory.LOCAL_AUTHORITY]: 'Local Authority',
        [PANEntityCategory.ARTIFICIAL_JURIDICAL_PERSON]: 'Artificial Juridical Person',
        [PANEntityCategory.GOVERNMENT]: 'Government',
        [PANEntityCategory.TRUST]: 'Trust',
    };
    const description = categoryMap[categoryCode];
    return description ? { code: categoryCode, description } : null;
}
/**
 * Validate a PAN with detailed result.
 * Checks format and entity category.
 * @param input - PAN to validate
 * @returns ValidationResult with validity, errors, and normalized value
 */
export const validatePAN = (input) => {
    const errors = [];
    if (input === null || input === undefined) {
        errors.push(createError(ValidationErrorCode.NULL_INPUT, 'PAN cannot be null or undefined', input));
        return { valid: false, errors };
    }
    const normalized = normalizePAN(input);
    if (!normalized) {
        if (typeof input !== 'string' && typeof input !== 'number') {
            errors.push(createError(ValidationErrorCode.INVALID_TYPE, 'PAN must be a string or number', input));
        }
        else {
            const str = String(input).trim();
            if (str.length === 0) {
                errors.push(createError(ValidationErrorCode.EMPTY_INPUT, 'PAN cannot be empty', input));
            }
            else if (!/^[A-Za-z0-9\s]+$/.test(str)) {
                errors.push(createError(ValidationErrorCode.INVALID_CHARACTERS, 'PAN can only contain alphanumeric characters and spaces', input));
            }
            else if (str.replace(/\s+/g, '').length !== PAN_LENGTH) {
                errors.push(createError(ValidationErrorCode.INVALID_LENGTH, `PAN must be exactly ${PAN_LENGTH} characters`, input));
            }
            else {
                errors.push(createError(ValidationErrorCode.INVALID_FORMAT, 'PAN format must be 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)', input));
            }
        }
        return { valid: false, errors };
    }
    // Validate entity category (4th character)
    const entityCategory = normalized[3];
    if (!VALID_ENTITY_CATEGORIES.has(entityCategory)) {
        errors.push(createError(ValidationErrorCode.INVALID_ENTITY_CATEGORY, `Invalid PAN entity category: '${entityCategory}'. 4th character must be one of: ${Array.from(VALID_ENTITY_CATEGORIES).join(', ')}`, input));
        return { valid: false, errors };
    }
    return { valid: true, errors: [], normalized };
};
/**
 * Quick boolean check for PAN validity.
 * @param input - PAN to validate
 * @returns true if valid, false otherwise
 */
export const isValidPAN = (input) => {
    return validatePAN(input).valid;
};
/**
 * PAN validator API.
 */
export const pan = {
    validate: validatePAN,
    isValid: isValidPAN,
    normalize: normalizePAN,
    getEntityCategory: getPANEntityCategory,
};
//# sourceMappingURL=pan.js.map