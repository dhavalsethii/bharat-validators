"use strict";
/**
 * Shared types for all validators in bharat-validators.
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GST_STATE_CODES = exports.PANEntityCategory = exports.ValidationErrorCode = void 0;
exports.isValidGSTStateCode = isValidGSTStateCode;
exports.getGSTStateName = getGSTStateName;
/**
 * Standard validation error codes used across all validators.
 */
var ValidationErrorCode;
(function (ValidationErrorCode) {
    /** Input is null or undefined */
    ValidationErrorCode["NULL_INPUT"] = "NULL_INPUT";
    /** Input is not a string (after normalization) */
    ValidationErrorCode["INVALID_TYPE"] = "INVALID_TYPE";
    /** Input string is empty */
    ValidationErrorCode["EMPTY_INPUT"] = "EMPTY_INPUT";
    /** Input does not match the expected format/pattern */
    ValidationErrorCode["INVALID_FORMAT"] = "INVALID_FORMAT";
    /** Input length does not match expected length */
    ValidationErrorCode["INVALID_LENGTH"] = "INVALID_LENGTH";
    /** Checksum validation failed */
    ValidationErrorCode["INVALID_CHECKSUM"] = "INVALID_CHECKSUM";
    /** Invalid state code (GSTIN) */
    ValidationErrorCode["INVALID_STATE_CODE"] = "INVALID_STATE_CODE";
    /** Invalid entity category (PAN) */
    ValidationErrorCode["INVALID_ENTITY_CATEGORY"] = "INVALID_ENTITY_CATEGORY";
    /** Invalid bank code (IFSC) */
    ValidationErrorCode["INVALID_BANK_CODE"] = "INVALID_BANK_CODE";
    /** Input contains invalid characters */
    ValidationErrorCode["INVALID_CHARACTERS"] = "INVALID_CHARACTERS";
})(ValidationErrorCode || (exports.ValidationErrorCode = ValidationErrorCode = {}));
/**
 * Entity categories for PAN validation (4th character).
 */
var PANEntityCategory;
(function (PANEntityCategory) {
    PANEntityCategory["INDIVIDUAL"] = "P";
    PANEntityCategory["COMPANY"] = "C";
    PANEntityCategory["HUF"] = "H";
    PANEntityCategory["FIRM"] = "F";
    PANEntityCategory["AOP"] = "A";
    PANEntityCategory["BOI"] = "B";
    PANEntityCategory["LOCAL_AUTHORITY"] = "L";
    PANEntityCategory["ARTIFICIAL_JURIDICAL_PERSON"] = "J";
    PANEntityCategory["GOVERNMENT"] = "G";
    PANEntityCategory["TRUST"] = "T";
})(PANEntityCategory || (exports.PANEntityCategory = PANEntityCategory = {}));
/**
 * Valid Indian state/UT codes for GSTIN (first 2 digits).
 * As per GST state code list.
 */
exports.GST_STATE_CODES = {
    '01': 'Jammu & Kashmir',
    '02': 'Himachal Pradesh',
    '03': 'Punjab',
    '04': 'Chandigarh',
    '05': 'Uttarakhand',
    '06': 'Haryana',
    '07': 'Delhi',
    '08': 'Rajasthan',
    '09': 'Uttar Pradesh',
    '10': 'Bihar',
    '11': 'Sikkim',
    '12': 'Arunachal Pradesh',
    '13': 'Nagaland',
    '14': 'Manipur',
    '15': 'Mizoram',
    '16': 'Tripura',
    '17': 'Meghalaya',
    '18': 'Assam',
    '19': 'West Bengal',
    '20': 'Jharkhand',
    '21': 'Odisha',
    '22': 'Chhattisgarh',
    '23': 'Madhya Pradesh',
    '24': 'Gujarat',
    '25': 'Daman and Diu',
    '26': 'Dadra and Nagar Haveli and Daman and Diu',
    '27': 'Maharashtra',
    '28': 'Andhra Pradesh (Old)',
    '29': 'Karnataka',
    '30': 'Goa',
    '31': 'Lakshadweep',
    '32': 'Kerala',
    '33': 'Tamil Nadu',
    '34': 'Puducherry',
    '35': 'Andaman and Nicobar Islands',
    '36': 'Telangana',
    '37': 'Andhra Pradesh',
    '38': 'Ladakh',
    '97': 'Other Territory',
    '99': 'Center Jurisdiction',
};
/**
 * Check if a string is a valid GST state code.
 */
function isValidGSTStateCode(code) {
    return code in exports.GST_STATE_CODES;
}
/**
 * Get state name from GST state code.
 */
function getGSTStateName(code) {
    return exports.GST_STATE_CODES[code];
}
//# sourceMappingURL=types.js.map