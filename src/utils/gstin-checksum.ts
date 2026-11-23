/**
 * GSTIN checksum validation algorithm.
 * Based on the GSTIN check digit calculation as per GST specification.
 * @packageDocumentation
 */

// Character to value mapping for GSTIN checksum
const CHAR_TO_VALUE: Record<string, number> = {
  '0': 0, '1': 1, '2': 2, '3': 3, '4': 4,
  '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
  'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14,
  'F': 15, 'G': 16, 'H': 17, 'I': 18, 'J': 19,
  'K': 20, 'L': 21, 'M': 22, 'N': 23, 'O': 24,
  'P': 25, 'Q': 26, 'R': 27, 'S': 28, 'T': 29,
  'U': 30, 'V': 31, 'W': 32, 'X': 33, 'Y': 34, 'Z': 35,
};

const VALUE_TO_CHAR: string[] = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z',
];

// Weight pattern for GSTIN checksum (alternating 1 and 2, starting from right)
function getWeight(position: number): number {
  // Position 0 is the rightmost character (check digit)
  // Weight alternates: 1, 2, 1, 2, ... from right to left
  return (position % 2 === 0) ? 1 : 2;
}

/**
 * Calculate the GSTIN check digit for the first 14 characters.
 * @param gstin14 - First 14 characters of GSTIN (without check digit)
 * @returns The check digit character
 */
export function calculateGSTINCheckDigit(gstin14: string): string {
  if (gstin14.length !== 14) {
    throw new Error('GSTIN prefix must be exactly 14 characters');
  }

  let sum = 0;
  // Process from right to left (position 0 = rightmost of the 14 chars)
  for (let i = 0; i < 14; i++) {
    const char = gstin14[13 - i];
    // char is guaranteed to exist since we iterate within string bounds
    const value = CHAR_TO_VALUE[char as string];
    if (value === undefined) {
      throw new Error(`Invalid character in GSTIN: ${char}`);
    }
    const weight = getWeight(i + 1); // +1 because check digit would be at position 0
    const product = value * weight;
    // Sum of digits of product
    sum += Math.floor(product / 36) + (product % 36);
  }

  const remainder = sum % 36;
  const checkValue = (36 - remainder) % 36;
  // checkValue is guaranteed to be 0-35
  return VALUE_TO_CHAR[checkValue]!;
}

/**
 * Validate the complete 15-character GSTIN checksum.
 * @param gstin - Complete 15-character GSTIN
 * @returns true if checksum is valid
 */
export function validateGSTINChecksum(gstin: string): boolean {
  if (gstin.length !== 15) {
    return false;
  }

  const prefix = gstin.slice(0, 14);
  const providedCheckDigit = gstin[14];
  const calculatedCheckDigit = calculateGSTINCheckDigit(prefix);
  return providedCheckDigit === calculatedCheckDigit;
}

/**
 * Generate a valid GSTIN from first 14 characters by appending check digit.
 * @param gstin14 - First 14 characters of GSTIN
 * @returns Complete 15-character GSTIN with valid checksum
 */
export function generateGSTINWithChecksum(gstin14: string): string {
  const checkDigit = calculateGSTINCheckDigit(gstin14);
  return gstin14 + checkDigit;
}