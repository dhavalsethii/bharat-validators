/**
 * GSTIN checksum validation algorithm.
 * Based on the GSTIN check digit calculation as per GST specification.
 * @packageDocumentation
 */
/**
 * Calculate the GSTIN check digit for the first 14 characters.
 * @param gstin14 - First 14 characters of GSTIN (without check digit)
 * @returns The check digit character
 */
export declare function calculateGSTINCheckDigit(gstin14: string): string;
/**
 * Validate the complete 15-character GSTIN checksum.
 * @param gstin - Complete 15-character GSTIN
 * @returns true if checksum is valid
 */
export declare function validateGSTINChecksum(gstin: string): boolean;
/**
 * Generate a valid GSTIN from first 14 characters by appending check digit.
 * @param gstin14 - First 14 characters of GSTIN
 * @returns Complete 15-character GSTIN with valid checksum
 */
export declare function generateGSTINWithChecksum(gstin14: string): string;
//# sourceMappingURL=gstin-checksum.d.ts.map