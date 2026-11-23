"use strict";
/**
 * Bharat Validators - Zero-dependency validators for Indian identifiers.
 *
 * @packageDocumentation
 * @version 1.0.0
 *
 * @example
 * ```typescript
 * import {
 *   isValidAadhaar, validateAadhaar, normalizeAadhaar,
 *   isValidPAN, validatePAN, normalizePAN,
 *   isValidGSTIN, validateGSTIN, normalizeGSTIN,
 *   isValidIFSC, validateIFSC, normalizeIFSC,
 *   isValidMobile, validateMobile, normalizeMobile,
 *   isValidPincode, validatePincode, normalizePincode,
 *   validateAll, createBatchValidator
 * } from 'bharat-validators';
 *
 * // Quick boolean checks
 * if (isValidAadhaar('123456789012')) { ... }
 *
 * // Detailed validation with errors
 * const result = validatePAN('ABCPA1234F');
 * if (!result.valid) {
 *   console.log(result.errors);
 * }
 *
 * // Batch validation
 * const panResults = validateAll(['ABCDE1234F', 'INVALID'], validatePAN);
 * ```
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = exports.validators = exports.generateGSTINWithChecksum = exports.calculateGSTINCheckDigit = exports.validateGSTINChecksum = exports.generateAadhaarWithChecksum = exports.calculateVerhoeffChecksum = exports.validateVerhoeffChecksum = exports.createBatchValidator = exports.getInvalidItems = exports.getValid = exports.getValidValues = exports.getBatchSummary = exports.validateAllSync = exports.validateAll = exports.getPincodeZone = exports.pincode = exports.normalizePincode = exports.isValidPincode = exports.validatePincode = exports.formatMobile = exports.mobile = exports.normalizeMobile = exports.isValidMobile = exports.validateMobile = exports.getIFSCBankCode = exports.ifsc = exports.normalizeIFSC = exports.isValidIFSC = exports.validateIFSC = exports.parseGSTIN = exports.gstin = exports.normalizeGSTIN = exports.isValidGSTIN = exports.validateGSTIN = exports.getPANEntityCategory = exports.pan = exports.normalizePAN = exports.isValidPAN = exports.validatePAN = exports.aadhaar = exports.normalizeAadhaar = exports.isValidAadhaar = exports.validateAadhaar = exports.getGSTStateName = exports.isValidGSTStateCode = exports.GST_STATE_CODES = exports.PANEntityCategory = exports.ValidationErrorCode = void 0;
// Types and errors
var types_js_1 = require("./utils/types.js");
Object.defineProperty(exports, "ValidationErrorCode", { enumerable: true, get: function () { return types_js_1.ValidationErrorCode; } });
Object.defineProperty(exports, "PANEntityCategory", { enumerable: true, get: function () { return types_js_1.PANEntityCategory; } });
Object.defineProperty(exports, "GST_STATE_CODES", { enumerable: true, get: function () { return types_js_1.GST_STATE_CODES; } });
Object.defineProperty(exports, "isValidGSTStateCode", { enumerable: true, get: function () { return types_js_1.isValidGSTStateCode; } });
Object.defineProperty(exports, "getGSTStateName", { enumerable: true, get: function () { return types_js_1.getGSTStateName; } });
// Aadhaar
var aadhaar_js_1 = require("./validators/aadhaar.js");
Object.defineProperty(exports, "validateAadhaar", { enumerable: true, get: function () { return aadhaar_js_1.validateAadhaar; } });
Object.defineProperty(exports, "isValidAadhaar", { enumerable: true, get: function () { return aadhaar_js_1.isValidAadhaar; } });
Object.defineProperty(exports, "normalizeAadhaar", { enumerable: true, get: function () { return aadhaar_js_1.normalizeAadhaar; } });
Object.defineProperty(exports, "aadhaar", { enumerable: true, get: function () { return aadhaar_js_1.aadhaar; } });
// PAN
var pan_js_1 = require("./validators/pan.js");
Object.defineProperty(exports, "validatePAN", { enumerable: true, get: function () { return pan_js_1.validatePAN; } });
Object.defineProperty(exports, "isValidPAN", { enumerable: true, get: function () { return pan_js_1.isValidPAN; } });
Object.defineProperty(exports, "normalizePAN", { enumerable: true, get: function () { return pan_js_1.normalizePAN; } });
Object.defineProperty(exports, "pan", { enumerable: true, get: function () { return pan_js_1.pan; } });
Object.defineProperty(exports, "getPANEntityCategory", { enumerable: true, get: function () { return pan_js_1.getPANEntityCategory; } });
// GSTIN
var gstin_js_1 = require("./validators/gstin.js");
Object.defineProperty(exports, "validateGSTIN", { enumerable: true, get: function () { return gstin_js_1.validateGSTIN; } });
Object.defineProperty(exports, "isValidGSTIN", { enumerable: true, get: function () { return gstin_js_1.isValidGSTIN; } });
Object.defineProperty(exports, "normalizeGSTIN", { enumerable: true, get: function () { return gstin_js_1.normalizeGSTIN; } });
Object.defineProperty(exports, "gstin", { enumerable: true, get: function () { return gstin_js_1.gstin; } });
Object.defineProperty(exports, "parseGSTIN", { enumerable: true, get: function () { return gstin_js_1.parseGSTIN; } });
// IFSC
var ifsc_js_1 = require("./validators/ifsc.js");
Object.defineProperty(exports, "validateIFSC", { enumerable: true, get: function () { return ifsc_js_1.validateIFSC; } });
Object.defineProperty(exports, "isValidIFSC", { enumerable: true, get: function () { return ifsc_js_1.isValidIFSC; } });
Object.defineProperty(exports, "normalizeIFSC", { enumerable: true, get: function () { return ifsc_js_1.normalizeIFSC; } });
Object.defineProperty(exports, "ifsc", { enumerable: true, get: function () { return ifsc_js_1.ifsc; } });
Object.defineProperty(exports, "getIFSCBankCode", { enumerable: true, get: function () { return ifsc_js_1.getIFSCBankCode; } });
// Mobile
var mobile_js_1 = require("./validators/mobile.js");
Object.defineProperty(exports, "validateMobile", { enumerable: true, get: function () { return mobile_js_1.validateMobile; } });
Object.defineProperty(exports, "isValidMobile", { enumerable: true, get: function () { return mobile_js_1.isValidMobile; } });
Object.defineProperty(exports, "normalizeMobile", { enumerable: true, get: function () { return mobile_js_1.normalizeMobile; } });
Object.defineProperty(exports, "mobile", { enumerable: true, get: function () { return mobile_js_1.mobile; } });
Object.defineProperty(exports, "formatMobile", { enumerable: true, get: function () { return mobile_js_1.formatMobile; } });
// PIN code
var pincode_js_1 = require("./validators/pincode.js");
Object.defineProperty(exports, "validatePincode", { enumerable: true, get: function () { return pincode_js_1.validatePincode; } });
Object.defineProperty(exports, "isValidPincode", { enumerable: true, get: function () { return pincode_js_1.isValidPincode; } });
Object.defineProperty(exports, "normalizePincode", { enumerable: true, get: function () { return pincode_js_1.normalizePincode; } });
Object.defineProperty(exports, "pincode", { enumerable: true, get: function () { return pincode_js_1.pincode; } });
Object.defineProperty(exports, "getPincodeZone", { enumerable: true, get: function () { return pincode_js_1.getPincodeZone; } });
// Batch validation
var batch_js_1 = require("./batch.js");
Object.defineProperty(exports, "validateAll", { enumerable: true, get: function () { return batch_js_1.validateAll; } });
Object.defineProperty(exports, "validateAllSync", { enumerable: true, get: function () { return batch_js_1.validateAllSync; } });
Object.defineProperty(exports, "getBatchSummary", { enumerable: true, get: function () { return batch_js_1.getBatchSummary; } });
Object.defineProperty(exports, "getValidValues", { enumerable: true, get: function () { return batch_js_1.getValidValues; } });
Object.defineProperty(exports, "getValid", { enumerable: true, get: function () { return batch_js_1.getValid; } });
Object.defineProperty(exports, "getInvalidItems", { enumerable: true, get: function () { return batch_js_1.getInvalidItems; } });
Object.defineProperty(exports, "createBatchValidator", { enumerable: true, get: function () { return batch_js_1.createBatchValidator; } });
// Utility functions (for advanced use)
var verhoeff_js_1 = require("./utils/verhoeff.js");
Object.defineProperty(exports, "validateVerhoeffChecksum", { enumerable: true, get: function () { return verhoeff_js_1.validateVerhoeffChecksum; } });
Object.defineProperty(exports, "calculateVerhoeffChecksum", { enumerable: true, get: function () { return verhoeff_js_1.calculateVerhoeffChecksum; } });
Object.defineProperty(exports, "generateAadhaarWithChecksum", { enumerable: true, get: function () { return verhoeff_js_1.generateAadhaarWithChecksum; } });
var gstin_checksum_js_1 = require("./utils/gstin-checksum.js");
Object.defineProperty(exports, "validateGSTINChecksum", { enumerable: true, get: function () { return gstin_checksum_js_1.validateGSTINChecksum; } });
Object.defineProperty(exports, "calculateGSTINCheckDigit", { enumerable: true, get: function () { return gstin_checksum_js_1.calculateGSTINCheckDigit; } });
Object.defineProperty(exports, "generateGSTINWithChecksum", { enumerable: true, get: function () { return gstin_checksum_js_1.generateGSTINWithChecksum; } });
// Import all for default export
const types = __importStar(require("./utils/types.js"));
const aadhaarValidator = __importStar(require("./validators/aadhaar.js"));
const panValidator = __importStar(require("./validators/pan.js"));
const gstinValidator = __importStar(require("./validators/gstin.js"));
const ifscValidator = __importStar(require("./validators/ifsc.js"));
const mobileValidator = __importStar(require("./validators/mobile.js"));
const pincodeValidator = __importStar(require("./validators/pincode.js"));
const batch = __importStar(require("./batch.js"));
const verhoeff = __importStar(require("./utils/verhoeff.js"));
const gstinChecksum = __importStar(require("./utils/gstin-checksum.js"));
/**
 * All validators grouped by type for convenient access.
 */
exports.validators = {
    aadhaar: {
        validate: aadhaarValidator.validateAadhaar,
        isValid: aadhaarValidator.isValidAadhaar,
        normalize: aadhaarValidator.normalizeAadhaar,
    },
    pan: {
        validate: panValidator.validatePAN,
        isValid: panValidator.isValidPAN,
        normalize: panValidator.normalizePAN,
    },
    gstin: {
        validate: gstinValidator.validateGSTIN,
        isValid: gstinValidator.isValidGSTIN,
        normalize: gstinValidator.normalizeGSTIN,
    },
    ifsc: {
        validate: ifscValidator.validateIFSC,
        isValid: ifscValidator.isValidIFSC,
        normalize: ifscValidator.normalizeIFSC,
    },
    mobile: {
        validate: mobileValidator.validateMobile,
        isValid: mobileValidator.isValidMobile,
        normalize: mobileValidator.normalizeMobile,
    },
    pincode: {
        validate: pincodeValidator.validatePincode,
        isValid: pincodeValidator.isValidPincode,
        normalize: pincodeValidator.normalizePincode,
    },
};
/**
 * Version of the package.
 */
exports.VERSION = '1.0.0';
/**
 * Default export with all validators.
 */
exports.default = {
    // Types
    ValidationErrorCode: types.ValidationErrorCode,
    PANEntityCategory: types.PANEntityCategory,
    GST_STATE_CODES: types.GST_STATE_CODES,
    isValidGSTStateCode: types.isValidGSTStateCode,
    getGSTStateName: types.getGSTStateName,
    // Aadhaar
    validateAadhaar: aadhaarValidator.validateAadhaar,
    isValidAadhaar: aadhaarValidator.isValidAadhaar,
    normalizeAadhaar: aadhaarValidator.normalizeAadhaar,
    // PAN
    validatePAN: panValidator.validatePAN,
    isValidPAN: panValidator.isValidPAN,
    normalizePAN: panValidator.normalizePAN,
    getPANEntityCategory: panValidator.getPANEntityCategory,
    // GSTIN
    validateGSTIN: gstinValidator.validateGSTIN,
    isValidGSTIN: gstinValidator.isValidGSTIN,
    normalizeGSTIN: gstinValidator.normalizeGSTIN,
    parseGSTIN: gstinValidator.parseGSTIN,
    // IFSC
    validateIFSC: ifscValidator.validateIFSC,
    isValidIFSC: ifscValidator.isValidIFSC,
    normalizeIFSC: ifscValidator.normalizeIFSC,
    getIFSCBankCode: ifscValidator.getIFSCBankCode,
    // Mobile
    validateMobile: mobileValidator.validateMobile,
    isValidMobile: mobileValidator.isValidMobile,
    normalizeMobile: mobileValidator.normalizeMobile,
    formatMobile: mobileValidator.formatMobile,
    // PIN code
    validatePincode: pincodeValidator.validatePincode,
    isValidPincode: pincodeValidator.isValidPincode,
    normalizePincode: pincodeValidator.normalizePincode,
    getPincodeZone: pincodeValidator.getPincodeZone,
    // Batch
    validateAll: batch.validateAll,
    validateAllSync: batch.validateAllSync,
    getBatchSummary: batch.getBatchSummary,
    getValidValues: batch.getValidValues,
    getValid: batch.getValid,
    getInvalidItems: batch.getInvalidItems,
    createBatchValidator: batch.createBatchValidator,
    // Utilities
    validateVerhoeffChecksum: verhoeff.validateVerhoeffChecksum,
    calculateVerhoeffChecksum: verhoeff.calculateVerhoeffChecksum,
    generateAadhaarWithChecksum: verhoeff.generateAadhaarWithChecksum,
    validateGSTINChecksum: gstinChecksum.validateGSTINChecksum,
    calculateGSTINCheckDigit: gstinChecksum.calculateGSTINCheckDigit,
    generateGSTINWithChecksum: gstinChecksum.generateGSTINWithChecksum,
    // Grouped validators
    validators: exports.validators,
    VERSION: exports.VERSION,
};
//# sourceMappingURL=index.js.map