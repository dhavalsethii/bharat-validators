"use strict";
/**
 * Indian PIN code (Postal Index Number) validator.
 * Validates format (6 digits, first digit 1-8).
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pincode = exports.isValidPincode = exports.validatePincode = exports.normalizePincode = void 0;
exports.getPincodeZone = getPincodeZone;
const types_js_1 = require("../utils/types.js");
const PINCODE_PATTERN = /^[1-9]\d{5}$/;
const PINCODE_LENGTH = 6;
/**
 * Normalize a PIN code input by removing spaces.
 * @param input - Raw input value
 * @returns Normalized 6-digit string or null if invalid
 */
const normalizePincode = (input) => {
    if (input === null || input === undefined) {
        return null;
    }
    const str = String(input).trim().replace(/\s+/g, '');
    return PINCODE_PATTERN.test(str) ? str : null;
};
exports.normalizePincode = normalizePincode;
/**
 * Create a validation error for PIN code.
 */
function createError(code, message, input) {
    return { code, message, input };
}
/**
 * Validate an Indian PIN code with detailed result.
 * Checks format (6 digits, first digit 1-8).
 * @param input - PIN code to validate
 * @returns ValidationResult with validity, errors, and normalized value
 */
const validatePincode = (input) => {
    const errors = [];
    if (input === null || input === undefined) {
        errors.push(createError(types_js_1.ValidationErrorCode.NULL_INPUT, 'PIN code cannot be null or undefined', input));
        return { valid: false, errors };
    }
    const normalized = (0, exports.normalizePincode)(input);
    if (!normalized) {
        if (typeof input !== 'string' && typeof input !== 'number') {
            errors.push(createError(types_js_1.ValidationErrorCode.INVALID_TYPE, 'PIN code must be a string or number', input));
        }
        else {
            const str = String(input).trim();
            if (str.length === 0) {
                errors.push(createError(types_js_1.ValidationErrorCode.EMPTY_INPUT, 'PIN code cannot be empty', input));
            }
            else if (!/^[\d\s]+$/.test(str)) {
                errors.push(createError(types_js_1.ValidationErrorCode.INVALID_CHARACTERS, 'PIN code can only contain digits and spaces', input));
            }
            else if (str.replace(/\s+/g, '').length !== PINCODE_LENGTH) {
                errors.push(createError(types_js_1.ValidationErrorCode.INVALID_LENGTH, `PIN code must be exactly ${PINCODE_LENGTH} digits`, input));
            }
            else {
                const cleaned = str.replace(/\s+/g, '');
                if (cleaned[0] === '0') {
                    errors.push(createError(types_js_1.ValidationErrorCode.INVALID_FORMAT, 'PIN code first digit cannot be 0', input));
                }
                else {
                    errors.push(createError(types_js_1.ValidationErrorCode.INVALID_FORMAT, 'PIN code must be 6 digits with first digit 1-9', input));
                }
            }
        }
        return { valid: false, errors };
    }
    return { valid: true, errors: [], normalized };
};
exports.validatePincode = validatePincode;
/**
 * Quick boolean check for PIN code validity.
 * @param input - PIN code to validate
 * @returns true if valid, false otherwise
 */
const isValidPincode = (input) => {
    return (0, exports.validatePincode)(input).valid;
};
exports.isValidPincode = isValidPincode;
/**
 * Get postal zone from PIN code (first digit).
 * @param pincode - Valid PIN code
 * @returns Zone description or null if invalid
 */
function getPincodeZone(pincode) {
    const normalized = (0, exports.normalizePincode)(pincode);
    if (!normalized || normalized.length === 0)
        return null;
    const zones = {
        '1': 'North (Delhi, Haryana, Punjab, Himachal Pradesh, Jammu & Kashmir, Ladakh, Chandigarh)',
        '2': 'North (Uttar Pradesh, Uttarakhand)',
        '3': 'West (Rajasthan, Gujarat)',
        '4': 'West (Maharashtra, Madhya Pradesh, Chhattisgarh, Goa)',
        '5': 'South (Andhra Pradesh, Karnataka, Telangana)',
        '6': 'South (Tamil Nadu, Kerala, Puducherry, Lakshadweep)',
        '7': 'East (West Bengal, Odisha, Assam, North East states)',
        '8': 'East (Bihar, Jharkhand)',
        '9': 'Army Postal Service (APS) / Field Post Office (FPO)',
    };
    const firstDigit = normalized[0];
    return firstDigit ? zones[firstDigit] || null : null;
}
/**
 * PIN code validator API.
 */
exports.pincode = {
    validate: exports.validatePincode,
    isValid: exports.isValidPincode,
    normalize: exports.normalizePincode,
    getZone: getPincodeZone,
};
//# sourceMappingURL=pincode.js.map