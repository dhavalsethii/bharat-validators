"use strict";
/**
 * Verhoeff algorithm implementation for Aadhaar checksum validation.
 * Based on the algorithm by Jacobus Verhoeff (1969).
 * Uses the dihedral group D5 with correct operation order.
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateVerhoeffChecksum = calculateVerhoeffChecksum;
exports.validateVerhoeffChecksum = validateVerhoeffChecksum;
exports.generateAadhaarWithChecksum = generateAadhaarWithChecksum;
// Verhoeff multiplication table (d) for dihedral group D5 - 10x10
const MULTIPLICATION_TABLE = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];
// Verhoeff permutation table (p) - 8x10
const PERMUTATION_TABLE = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];
// Inverse table (inv) for dihedral group D5
const INVERSE_TABLE = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];
/**
 * Safe array access for Verhoeff tables.
 */
function getPermutation(row, col) {
    return PERMUTATION_TABLE[row]?.[col] ?? 0;
}
function getMultiplication(check, permuted) {
    return MULTIPLICATION_TABLE[check]?.[permuted] ?? 0;
}
function getInverse(index) {
    return INVERSE_TABLE[index] ?? 0;
}
/**
 * Calculate the Verhoeff checksum for a given numeric string.
 * @param digits - String of digits to calculate checksum for
 * @returns The check digit (0-9)
 */
function calculateVerhoeffChecksum(digits) {
    let check = 0;
    // Process from right to left (least significant digit first)
    // Position starts at 1 (not 0) for the rightmost digit
    for (let i = 0; i < digits.length; i++) {
        const char = digits[digits.length - 1 - i] ?? '0';
        const digit = parseInt(char, 10);
        // Position starts at 1 for rightmost digit
        const permuted = getPermutation((i + 1) % 8, digit);
        check = getMultiplication(check, permuted);
    }
    return getInverse(check);
}
/**
 * Validate a Verhoeff checksum for a complete number including check digit.
 * @param numberWithChecksum - Complete number string including check digit
 * @returns true if checksum is valid
 */
function validateVerhoeffChecksum(numberWithChecksum) {
    if (!/^\d+$/.test(numberWithChecksum)) {
        return false;
    }
    let check = 0;
    // Position 0 for check digit (rightmost), then 1, 2, ... for other digits
    for (let i = 0; i < numberWithChecksum.length; i++) {
        const char = numberWithChecksum[numberWithChecksum.length - 1 - i] ?? '0';
        const digit = parseInt(char, 10);
        // Position i for validation (0 = check digit, 1 = first data digit from right, etc.)
        const permuted = getPermutation(i % 8, digit);
        check = getMultiplication(check, permuted);
    }
    return check === 0;
}
/**
 * Generate a valid Aadhaar number from first 11 digits by appending check digit.
 * @param first11Digits - First 11 digits of Aadhaar
 * @returns Complete 12-digit Aadhaar number with valid checksum
 */
function generateAadhaarWithChecksum(first11Digits) {
    if (first11Digits.length !== 11 || !/^\d{11}$/.test(first11Digits)) {
        throw new Error('Input must be exactly 11 digits');
    }
    const checkDigit = calculateVerhoeffChecksum(first11Digits);
    return first11Digits + checkDigit;
}
//# sourceMappingURL=verhoeff.js.map