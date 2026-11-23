"use strict";
/**
 * Indian mobile number validator.
 * Validates format (10 digits, starting with 6-9).
 * Supports various input formats: +91, 0 prefix, spaces, hyphens.
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mobile = exports.isValidMobile = exports.validateMobile = exports.normalizeMobile = void 0;
exports.formatMobile = formatMobile;
const types_js_1 = require("../utils/types.js");
const MOBILE_PATTERN = /^[6-9]\d{9}$/;
/**
 * Normalize an Indian mobile number to 10-digit format.
 * Handles: +91, 91, 0 prefixes, spaces, hyphens, parentheses.
 * @param input - Raw input value
 * @returns Normalized 10-digit string or null if invalid
 */
const normalizeMobile = (input) => {
    if (input === null || input === undefined) {
        return null;
    }
    let str = String(input).trim();
    // Remove common formatting characters
    str = str.replace(/[\s\-\(\)]/g, '');
    // Handle country code prefixes
    if (str.startsWith('+91')) {
        str = str.slice(3);
    }
    else if (str.startsWith('91') && str.length === 12) {
        str = str.slice(2);
    }
    else if (str.startsWith('0') && str.length === 11) {
        str = str.slice(1);
    }
    return MOBILE_PATTERN.test(str) ? str : null;
};
exports.normalizeMobile = normalizeMobile;
/**
 * Create a validation error for mobile.
 */
function createError(code, message, input) {
    return { code, message, input };
}
/**
 * Validate an Indian mobile number with detailed result.
 * Checks format (10 digits starting with 6-9).
 * @param input - Mobile number to validate
 * @returns ValidationResult with validity, errors, and normalized value
 */
const validateMobile = (input) => {
    const errors = [];
    if (input === null || input === undefined) {
        errors.push(createError(types_js_1.ValidationErrorCode.NULL_INPUT, 'Mobile number cannot be null or undefined', input));
        return { valid: false, errors };
    }
    const normalized = (0, exports.normalizeMobile)(input);
    if (!normalized) {
        if (typeof input !== 'string' && typeof input !== 'number') {
            errors.push(createError(types_js_1.ValidationErrorCode.INVALID_TYPE, 'Mobile number must be a string or number', input));
        }
        else {
            const str = String(input).trim();
            if (str.length === 0) {
                errors.push(createError(types_js_1.ValidationErrorCode.EMPTY_INPUT, 'Mobile number cannot be empty', input));
            }
            else {
                // Check for invalid characters after removing formatting
                const cleaned = str.replace(/[\s\-\(\)]/g, '');
                if (!/^[\d+]+$/.test(cleaned)) {
                    errors.push(createError(types_js_1.ValidationErrorCode.INVALID_CHARACTERS, 'Mobile number can only contain digits, +, spaces, hyphens, and parentheses', input));
                }
                else if (cleaned.length < 10) {
                    errors.push(createError(types_js_1.ValidationErrorCode.INVALID_LENGTH, 'Mobile number must have at least 10 digits', input));
                }
                else if (cleaned.length > 13) {
                    errors.push(createError(types_js_1.ValidationErrorCode.INVALID_LENGTH, 'Mobile number is too long', input));
                }
                else {
                    // Check if it starts with valid digit after normalization
                    let testStr = cleaned;
                    if (testStr.startsWith('+91'))
                        testStr = testStr.slice(3);
                    else if (testStr.startsWith('91') && testStr.length === 12)
                        testStr = testStr.slice(2);
                    else if (testStr.startsWith('0') && testStr.length === 11)
                        testStr = testStr.slice(1);
                    if (!MOBILE_PATTERN.test(testStr)) {
                        errors.push(createError(types_js_1.ValidationErrorCode.INVALID_FORMAT, 'Indian mobile number must be 10 digits starting with 6, 7, 8, or 9', input));
                    }
                }
            }
        }
        return { valid: false, errors };
    }
    return { valid: true, errors: [], normalized };
};
exports.validateMobile = validateMobile;
/**
 * Quick boolean check for mobile number validity.
 * @param input - Mobile number to validate
 * @returns true if valid, false otherwise
 */
const isValidMobile = (input) => {
    return (0, exports.validateMobile)(input).valid;
};
exports.isValidMobile = isValidMobile;
/**
 * Format mobile number for display.
 * @param mobile - Normalized 10-digit mobile number
 * @returns Formatted string (e.g., "+91 98765 43210")
 */
function formatMobile(mobile) {
    const normalized = (0, exports.normalizeMobile)(mobile);
    if (!normalized)
        return mobile;
    return `+91 ${normalized.slice(0, 5)} ${normalized.slice(5)}`;
}
/**
 * Mobile validator API.
 */
exports.mobile = {
    validate: exports.validateMobile,
    isValid: exports.isValidMobile,
    normalize: exports.normalizeMobile,
    format: formatMobile,
};
//# sourceMappingURL=mobile.js.map