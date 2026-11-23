# Bharat Validators

Zero-dependency, fully-typed validators for Indian identifiers — Aadhaar, PAN, GSTIN, IFSC, Mobile, PIN code.

[![npm version](https://img.shields.io/npm/v/bharat-validators.svg)](https://www.npmjs.com/package/bharat-validators)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Features

- **Zero runtime dependencies** — Lightweight and fast
- **Full TypeScript support** — Complete type definitions included
- **Dual module support** — Works with both CommonJS and ES Modules
- **Comprehensive validation** — Format, checksum, and structural validation
- **Detailed error reporting** — Consistent error codes and messages
- **Batch validation** — Validate multiple values efficiently
- **Normalization** — Clean input handling with flexible formats
- **No network requests** — Fully offline validation

## Installation

```bash
npm install bharat-validators
# or
yarn add bharat-validators
# or
pnpm add bharat-validators
```

## Quick Start

```typescript
import {
  isValidAadhaar, validateAadhaar, normalizeAadhaar,
  isValidPAN, validatePAN, normalizePAN,
  isValidGSTIN, validateGSTIN, normalizeGSTIN,
  isValidIFSC, validateIFSC, normalizeIFSC,
  isValidMobile, validateMobile, normalizeMobile,
  isValidPincode, validatePincode, normalizePincode,
} from 'bharat-validators';

// Quick boolean checks
if (isValidAadhaar('234567890124')) {
  console.log('Valid Aadhaar');
}

// Detailed validation with errors
const result = validatePAN('ABCPA1234F');
if (!result.valid) {
  console.log('Errors:', result.errors);
} else {
  console.log('Normalized:', result.normalized);
}

// Normalize messy input
const clean = normalizeMobile('+91 98765 43210'); // '9876543210'
```

## Validators

### Aadhaar
Validates 12-digit format (first digit 2-9) and **Verhoeff checksum**.

```typescript
import { isValidAadhaar, validateAadhaar, normalizeAadhaar } from 'bharat-validators';

isValidAadhaar('234567890124'); // true (valid checksum)
isValidAadhaar('234567890125'); // false (invalid checksum)

validateAadhaar('2345 6789 0124');
// { valid: true, errors: [], normalized: '234567890124' }

normalizeAadhaar('2345-6789-0124'); // '234567890124'
```

### PAN (Permanent Account Number)
Validates 10-character format (5 letters, 4 digits, 1 letter) and **entity category** (4th character).

```typescript
import { isValidPAN, validatePAN, normalizePAN, getPANEntityCategory } from 'bharat-validators';

isValidPAN('ABCPA1234F'); // true (Individual)
isValidPAN('ABCXA1234F');  // false (invalid entity category)

validatePAN('abcpa1234f');
// { valid: true, errors: [], normalized: 'ABCPA1234F' }

getPANEntityCategory('ABCPA1234F');
// { code: 'P', description: 'Individual' }
```

**Entity Categories:** P (Individual), C (Company), H (HUF), F (Firm), A (AOP), B (BOI), L (Local Authority), J (Artificial Juridical Person), G (Government), T (Trust)

### GSTIN (Goods and Services Tax Identification Number)
Validates 15-character format, **state code**, embedded PAN structure, and **checksum** (14th character must be 'Z').

```typescript
import { isValidGSTIN, validateGSTIN, normalizeGSTIN, parseGSTIN } from 'bharat-validators';

isValidGSTIN('29AAAAA0000A1ZY'); // true
isValidGSTIN('29AAAAA0000A1ZZ'); // false (invalid checksum)

validateGSTIN('29 aaaaa 0000 a1z y');
// { valid: true, errors: [], normalized: '29AAAAA0000A1ZY' }

parseGSTIN('29AAAAA0000A1ZY');
// {
//   stateCode: '29',
//   stateName: 'Karnataka',
//   pan: 'AAAAA0000A',
//   entityCode: '1',
//   checkDigit: 'Y'
// }
```

### IFSC (Indian Financial System Code)
Validates 11-character format (4 letters bank code + 0 + 6 alphanumeric branch code).

```typescript
import { isValidIFSC, validateIFSC, normalizeIFSC, getIFSCBankCode } from 'bharat-validators';

isValidIFSC('SBIN0001234'); // true
isValidIFSC('SBIN1001234'); // false (5th char must be 0)

validateIFSC('sbin0001234');
// { valid: true, errors: [], normalized: 'SBIN0001234' }

getIFSCBankCode('HDFC0001234'); // 'HDFC'
```

### Indian Mobile Number
Validates 10-digit format starting with 6-9. Handles `+91`, `91`, `0` prefixes.

```typescript
import { isValidMobile, validateMobile, normalizeMobile, formatMobile } from 'bharat-validators';

isValidMobile('9876543210'); // true
isValidMobile('5876543210'); // false (starts with 5)

validateMobile('+91 98765 43210');
// { valid: true, errors: [], normalized: '9876543210' }

normalizeMobile('09876543210'); // '9876543210'
formatMobile('9876543210');     // '+91 98765 43210'
```

### PIN Code (Postal Index Number)
Validates 6-digit format with first digit 1-9 (Zones 1-8 for states/UTs, Zone 9 for Army Postal Service).

```typescript
import { isValidPincode, validatePincode, normalizePincode, getPincodeZone } from 'bharat-validators';

isValidPincode('110001'); // true (Delhi)
isValidPincode('900056'); // true (Army Postal Service)
isValidPincode('012345'); // false (starts with 0)

validatePincode('110 001');
// { valid: true, errors: [], normalized: '110001' }

getPincodeZone('110001');
// 'North (Delhi, Haryana, Punjab, Himachal Pradesh, Jammu & Kashmir, Ladakh, Chandigarh)'
```

## API Reference

### Common Patterns

Each validator provides three functions:

| Function | Returns | Description |
|----------|---------|-------------|
| `isValidX(input)` | `boolean` | Quick boolean check |
| `validateX(input)` | `ValidationResult` | Detailed result with errors and normalized value |
| `normalizeX(input)` | `string \| null` | Returns cleaned value or null if invalid |

### ValidationResult

```typescript
interface ValidationResult<T = string> {
  valid: boolean;
  errors: ValidationError[];
  normalized?: T;
}

interface ValidationError {
  code: ValidationErrorCode;
  message: string;
  input?: unknown;
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `NULL_INPUT` | Input is null or undefined |
| `INVALID_TYPE` | Input is not a string/number |
| `EMPTY_INPUT` | Input string is empty |
| `INVALID_FORMAT` | Input doesn't match expected pattern |
| `INVALID_LENGTH` | Input length is incorrect |
| `INVALID_CHECKSUM` | Checksum validation failed |
| `INVALID_STATE_CODE` | Invalid GST state code |
| `INVALID_ENTITY_CATEGORY` | Invalid PAN entity category |
| `INVALID_BANK_CODE` | Invalid IFSC bank code |
| `INVALID_CHARACTERS` | Input contains invalid characters |

## Batch Validation

Validate multiple values efficiently:

```typescript
import { validateAll, getBatchSummary, getValidValues, createBatchValidator } from 'bharat-validators';

const pans = ['ABCPA1234F', 'INVALID', 'ABCCA2345G', 'ALSOBAD'];

// Validate all
const results = validateAll(pans, validatePAN);

// Get summary
const summary = getBatchSummary(results);
// { total: 4, valid: 2, invalid: 2, allValid: false }

// Get only valid values
const valid = getValidValues(results); // ['ABCPA1234F', 'ABCCA2345G']

// Create reusable batch validator
const batchPan = createBatchValidator(validatePAN, isValidPAN, normalizePAN);
batchPan.allValid(pans);        // false
batchPan.getValid(pans);        // ['ABCPA1234F', 'ABCCA2345G']
batchPan.getSummary(pans);      // { total: 4, valid: 2, invalid: 2, allValid: false }
```

## TypeScript

Full type definitions are included. Import types directly:

```typescript
import type {
  ValidationResult,
  ValidationError,
  ValidationErrorCode,
  PANEntityCategory,
  BatchValidationSummary,
} from 'bharat-validators';
```

## Important Notes

> **⚠️ Format validation ≠ Government verification**
>
> This library validates the **format, structure, and checksums** of Indian identifiers. It does **not** verify whether an identifier was actually issued by the government or belongs to a real person/entity. For production systems requiring identity verification, integrate with official government APIs (Aadhaar Verification API, PAN Verification API, GSTIN Verification API, etc.).

## Supported Node.js Versions

- Node.js 18+

## License

MIT © Dhaval Sethi

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.