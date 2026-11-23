/**
 * IFSC (Indian Financial System Code) validator.
 * Validates format (11 characters: 4 letters bank code + 0 + 6 alphanumeric branch code).
 * @packageDocumentation
 */

import {
  ValidationResult,
  ValidationError,
  ValidationErrorCode,
  Validator,
  IsValidFn,
  NormalizeFn,
} from '../utils/types.js';

const IFSC_PATTERN = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const IFSC_LENGTH = 11;

/**
 * Normalize an IFSC input by converting to uppercase and removing spaces.
 * @param input - Raw input value
 * @returns Normalized IFSC string or null if invalid format
 */
export const normalizeIFSC: NormalizeFn<unknown, string> = (input): string | null => {
  if (input === null || input === undefined) {
    return null;
  }
  const str = String(input).trim().toUpperCase().replace(/\s+/g, '');
  return IFSC_PATTERN.test(str) ? str : null;
};

/**
 * Create a validation error for IFSC.
 */
function createError(code: ValidationErrorCode, message: string, input?: unknown): ValidationError {
  return { code, message, input };
}

/**
 * Validate an IFSC with detailed result.
 * Checks format (4 letters + 0 + 6 alphanumeric).
 * @param input - IFSC to validate
 * @returns ValidationResult with validity, errors, and normalized value
 */
export const validateIFSC: Validator<unknown, string> = (input): ValidationResult<string> => {
  const errors: ValidationError[] = [];

  if (input === null || input === undefined) {
    errors.push(createError(ValidationErrorCode.NULL_INPUT, 'IFSC cannot be null or undefined', input));
    return { valid: false, errors };
  }

  const normalized = normalizeIFSC(input);
  if (!normalized) {
    if (typeof input !== 'string' && typeof input !== 'number') {
      errors.push(createError(ValidationErrorCode.INVALID_TYPE, 'IFSC must be a string or number', input));
    } else {
      const str = String(input).trim();
      if (str.length === 0) {
        errors.push(createError(ValidationErrorCode.EMPTY_INPUT, 'IFSC cannot be empty', input));
      } else if (!/^[A-Za-z0-9\s]+$/.test(str)) {
        errors.push(createError(ValidationErrorCode.INVALID_CHARACTERS, 'IFSC can only contain alphanumeric characters and spaces', input));
      } else if (str.replace(/\s+/g, '').length !== IFSC_LENGTH) {
        errors.push(createError(ValidationErrorCode.INVALID_LENGTH, `IFSC must be exactly ${IFSC_LENGTH} characters`, input));
      } else {
        errors.push(createError(ValidationErrorCode.INVALID_FORMAT, 'IFSC format must be: 4 letters (bank code) + 0 + 6 alphanumeric (branch code)', input));
      }
    }
    return { valid: false, errors };
  }

  return { valid: true, errors: [], normalized };
};

/**
 * Quick boolean check for IFSC validity.
 * @param input - IFSC to validate
 * @returns true if valid, false otherwise
 */
export const isValidIFSC: IsValidFn<unknown> = (input): boolean => {
  return validateIFSC(input).valid;
};

/**
 * Get bank code from IFSC.
 * @param ifsc - Valid IFSC string
 * @returns Bank code (first 4 characters) or null if invalid
 */
export function getIFSCBankCode(ifsc: string): string | null {
  const normalized = normalizeIFSC(ifsc);
  return normalized ? normalized.slice(0, 4) : null;
}

/**
 * IFSC validator API.
 */
export const ifsc = {
  validate: validateIFSC,
  isValid: isValidIFSC,
  normalize: normalizeIFSC,
  getBankCode: getIFSCBankCode,
};