# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-23

### Added
- **Aadhaar validator**: Format validation (12 digits) and Verhoeff checksum verification
- **PAN validator**: Structural validation (10 chars: 5 letters, 4 digits, 1 letter) and entity category validation (4th character)
- **GSTIN validator**: Format validation (15 chars), state code validation, embedded PAN structure validation, and checksum verification
- **IFSC validator**: Structural validation (11 chars: 4 letters bank code + 0 + 6 alphanumeric branch code)
- **Indian Mobile Number validator**: Format validation (10 digits starting with 6-9) with support for +91, 91, 0 prefixes and various formatting
- **Indian PIN Code validator**: Format validation (6 digits, first digit 1-8) with postal zone lookup
- **Batch validation utilities**: `validateAll`, `validateAllSync`, `getBatchSummary`, `getValidValues`, `getInvalidItems`, `createBatchValidator`
- **TypeScript declarations**: Full type definitions for all public APIs
- **Dual module support**: CommonJS and ES Module builds
- **Comprehensive test suite**: Unit tests for valid, invalid, and edge cases
- **JSDoc documentation**: Complete API documentation
- **Zero runtime dependencies**: Lightweight, no external dependencies

### Validator Details

#### Aadhaar
- Validates 12-digit numeric format
- Verhoeff checksum algorithm implementation
- Normalizes input (removes spaces, hyphens)
- Returns detailed validation errors

#### PAN
- Validates 10-character format: `[A-Z]{5}[0-9]{4}[A-Z]`
- Validates entity category (4th character): P, C, H, F, A, B, L, J, G, T
- Case-insensitive input handling
- Entity category lookup with descriptions

#### GSTIN
- Validates 15-character format: `[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z][A-Z][0-9A-Z]`
- Validates state code (first 2 digits) against official GST state code list
- Validates embedded PAN structure (characters 3-12)
- Validates entity code (13th character) ≠ '0'
- GSTIN checksum algorithm implementation
- GSTIN parsing with component extraction

#### IFSC
- Validates 11-character format: `[A-Z]{4}0[A-Z0-9]{6}`
- Validates 5th character is '0'
- Bank code extraction (first 4 characters)
- Does not validate against bank registry (allows new banks)

#### Mobile
- Validates 10-digit format starting with 6-9
- Handles +91, 91, 0 country code prefixes
- Normalizes various formats (spaces, hyphens, parentheses)
- Display formatting utility

#### PIN Code
- Validates 6-digit format with first digit 1-8
- Postal zone lookup from first digit
- Normalizes input (removes spaces)

### Development
- TypeScript 5.4+ with strict mode
- Jest 29 with ts-jest for testing
- ESLint for code quality
- npm pack dry-run verification

## [Unreleased]

### Planned
- UPI ID validator
- Vehicle registration number validator
- Driving license number validator
- Voter ID (EPIC) validator
- Passport number validator
- Performance benchmarks
- Browser bundle (UMD/IIFE)