"use strict";
/**
 * IFSC (Indian Financial System Code) validator.
 * Validates format (11 characters: 4 letters bank code + 0 + 6 alphanumeric branch code).
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifsc = exports.isValidIFSC = exports.validateIFSC = exports.normalizeIFSC = void 0;
exports.getIFSCBankCode = getIFSCBankCode;
const types_js_1 = require("../utils/types.js");
const IFSC_PATTERN = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const IFSC_LENGTH = 11;
/**
 * Normalize an IFSC input by converting to uppercase and removing spaces.
 * @param input - Raw input value
 * @returns Normalized IFSC string or null if invalid format
 */
const normalizeIFSC = (input) => {
    if (input === null || input === undefined) {
        return null;
    }
    const str = String(input).trim().toUpperCase().replace(/\s+/g, '');
    return IFSC_PATTERN.test(str) ? str : null;
};
exports.normalizeIFSC = normalizeIFSC;
/**
 * Create a validation error for IFSC.
 */
function createError(code, message, input) {
    return { code, message, input };
}
/**
 * Validate an IFSC with detailed result.
 * Checks format (4 letters + 0 + 6 alphanumeric).
 * @param input - IFSC to validate
 * @returns ValidationResult with validity, errors, and normalized value
 */
const validateIFSC = (input) => {
    const errors = [];
    if (input === null || input === undefined) {
        errors.push(createError(types_js_1.ValidationErrorCode.NULL_INPUT, 'IFSC cannot be null or undefined', input));
        return { valid: false, errors };
    }
    const normalized = (0, exports.normalizeIFSC)(input);
    if (!normalized) {
        if (typeof input !== 'string' && typeof input !== 'number') {
            errors.push(createError(types_js_1.ValidationErrorCode.INVALID_TYPE, 'IFSC must be a string or number', input));
        }
        else {
            const str = String(input).trim();
            if (str.length === 0) {
                errors.push(createError(types_js_1.ValidationErrorCode.EMPTY_INPUT, 'IFSC cannot be empty', input));
            }
            else if (!/^[A-Za-z0-9\s]+$/.test(str)) {
                errors.push(createError(types_js_1.ValidationErrorCode.INVALID_CHARACTERS, 'IFSC can only contain alphanumeric characters and spaces', input));
            }
            else if (str.replace(/\s+/g, '').length !== IFSC_LENGTH) {
                errors.push(createError(types_js_1.ValidationErrorCode.INVALID_LENGTH, `IFSC must be exactly ${IFSC_LENGTH} characters`, input));
            }
            else {
                errors.push(createError(types_js_1.ValidationErrorCode.INVALID_FORMAT, 'IFSC format must be: 4 letters (bank code) + 0 + 6 alphanumeric (branch code)', input));
            }
        }
        return { valid: false, errors };
    }
    return { valid: true, errors: [], normalized };
};
exports.validateIFSC = validateIFSC;
/**
 * Quick boolean check for IFSC validity.
 * @param input - IFSC to validate
 * @returns true if valid, false otherwise
 */
const isValidIFSC = (input) => {
    return (0, exports.validateIFSC)(input).valid;
};
exports.isValidIFSC = isValidIFSC;
/**
 * Get bank code from IFSC.
 * @param ifsc - Valid IFSC string
 * @returns Bank code (first 4 characters) or null if invalid
 */
function getIFSCBankCode(ifsc) {
    const normalized = (0, exports.normalizeIFSC)(ifsc);
    return normalized ? normalized.slice(0, 4) : null;
}
/**
 * IFSC validator API.
 */
exports.ifsc = {
    validate: exports.validateIFSC,
    isValid: exports.isValidIFSC,
    normalize: exports.normalizeIFSC,
    getBankCode: getIFSCBankCode,
};
//# sourceMappingURL=ifsc.js.map