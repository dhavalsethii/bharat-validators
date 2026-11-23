"use strict";
/**
 * PAN (Permanent Account Number) validator.
 * Validates format (10 characters: 5 letters, 4 digits, 1 letter)
 * and entity category (4th character).
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pan = exports.isValidPAN = exports.validatePAN = exports.normalizePAN = void 0;
exports.getPANEntityCategory = getPANEntityCategory;
const types_js_1 = require("../utils/types.js");
const PAN_PATTERN = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const PAN_LENGTH = 10;
// Valid entity categories (4th character)
const VALID_ENTITY_CATEGORIES = new Set(Object.values(types_js_1.PANEntityCategory));
/**
 * Normalize a PAN input by converting to uppercase and removing spaces.
 * @param input - Raw input value
 * @returns Normalized PAN string or null if invalid format
 */
const normalizePAN = (input) => {
    if (input === null || input === undefined) {
        return null;
    }
    const str = String(input).trim().toUpperCase().replace(/\s+/g, '');
    return PAN_PATTERN.test(str) ? str : null;
};
exports.normalizePAN = normalizePAN;
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
function getPANEntityCategory(pan) {
    const normalized = (0, exports.normalizePAN)(pan);
    if (!normalized) {
        return null;
    }
    const categoryCode = normalized[3];
    // categoryCode is guaranteed to exist since PAN_PATTERN ensures 10 chars
    const categoryMap = {
        [types_js_1.PANEntityCategory.INDIVIDUAL]: 'Individual',
        [types_js_1.PANEntityCategory.COMPANY]: 'Company',
        [types_js_1.PANEntityCategory.HUF]: 'Hindu Undivided Family (HUF)',
        [types_js_1.PANEntityCategory.FIRM]: 'Firm/Partnership',
        [types_js_1.PANEntityCategory.AOP]: 'Association of Persons (AOP)',
        [types_js_1.PANEntityCategory.BOI]: 'Body of Individuals (BOI)',
        [types_js_1.PANEntityCategory.LOCAL_AUTHORITY]: 'Local Authority',
        [types_js_1.PANEntityCategory.ARTIFICIAL_JURIDICAL_PERSON]: 'Artificial Juridical Person',
        [types_js_1.PANEntityCategory.GOVERNMENT]: 'Government',
        [types_js_1.PANEntityCategory.TRUST]: 'Trust',
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
const validatePAN = (input) => {
    const errors = [];
    if (input === null || input === undefined) {
        errors.push(createError(types_js_1.ValidationErrorCode.NULL_INPUT, 'PAN cannot be null or undefined', input));
        return { valid: false, errors };
    }
    const normalized = (0, exports.normalizePAN)(input);
    if (!normalized) {
        if (typeof input !== 'string' && typeof input !== 'number') {
            errors.push(createError(types_js_1.ValidationErrorCode.INVALID_TYPE, 'PAN must be a string or number', input));
        }
        else {
            const str = String(input).trim();
            if (str.length === 0) {
                errors.push(createError(types_js_1.ValidationErrorCode.EMPTY_INPUT, 'PAN cannot be empty', input));
            }
            else if (!/^[A-Za-z0-9\s]+$/.test(str)) {
                errors.push(createError(types_js_1.ValidationErrorCode.INVALID_CHARACTERS, 'PAN can only contain alphanumeric characters and spaces', input));
            }
            else if (str.replace(/\s+/g, '').length !== PAN_LENGTH) {
                errors.push(createError(types_js_1.ValidationErrorCode.INVALID_LENGTH, `PAN must be exactly ${PAN_LENGTH} characters`, input));
            }
            else {
                errors.push(createError(types_js_1.ValidationErrorCode.INVALID_FORMAT, 'PAN format must be 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)', input));
            }
        }
        return { valid: false, errors };
    }
    // Validate entity category (4th character)
    const entityCategory = normalized[3];
    if (!VALID_ENTITY_CATEGORIES.has(entityCategory)) {
        errors.push(createError(types_js_1.ValidationErrorCode.INVALID_ENTITY_CATEGORY, `Invalid PAN entity category: '${entityCategory}'. 4th character must be one of: ${Array.from(VALID_ENTITY_CATEGORIES).join(', ')}`, input));
        return { valid: false, errors };
    }
    return { valid: true, errors: [], normalized };
};
exports.validatePAN = validatePAN;
/**
 * Quick boolean check for PAN validity.
 * @param input - PAN to validate
 * @returns true if valid, false otherwise
 */
const isValidPAN = (input) => {
    return (0, exports.validatePAN)(input).valid;
};
exports.isValidPAN = isValidPAN;
/**
 * PAN validator API.
 */
exports.pan = {
    validate: exports.validatePAN,
    isValid: exports.isValidPAN,
    normalize: exports.normalizePAN,
    getEntityCategory: getPANEntityCategory,
};
//# sourceMappingURL=pan.js.map