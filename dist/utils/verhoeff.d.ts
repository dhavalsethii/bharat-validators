/**
 * Verhoeff algorithm implementation for Aadhaar checksum validation.
 * Based on the algorithm by Jacobus Verhoeff (1969).
 * Uses the dihedral group D5 with correct operation order.
 * @packageDocumentation
 */
/**
 * Calculate the Verhoeff checksum for a given numeric string.
 * @param digits - String of digits to calculate checksum for
 * @returns The check digit (0-9)
 */
export declare function calculateVerhoeffChecksum(digits: string): number;
/**
 * Validate a Verhoeff checksum for a complete number including check digit.
 * @param numberWithChecksum - Complete number string including check digit
 * @returns true if checksum is valid
 */
export declare function validateVerhoeffChecksum(numberWithChecksum: string): boolean;
/**
 * Generate a valid Aadhaar number from first 11 digits by appending check digit.
 * @param first11Digits - First 11 digits of Aadhaar
 * @returns Complete 12-digit Aadhaar number with valid checksum
 */
export declare function generateAadhaarWithChecksum(first11Digits: string): string;
//# sourceMappingURL=verhoeff.d.ts.map