export const DISPLAY_NAME_MAX_LENGTH = 50;

export const DISPLAY_NAME_REQUIRED_ERROR = "Display name is required";

export const DISPLAY_NAME_TOO_LONG_ERROR = `Display name must be ${DISPLAY_NAME_MAX_LENGTH} characters or fewer`;

/**
 * Validates a display name. Returns an error message when invalid, or `null`
 * when the trimmed value is acceptable.
 */
export function validateDisplayName(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return DISPLAY_NAME_REQUIRED_ERROR;
  }
  if (trimmed.length > DISPLAY_NAME_MAX_LENGTH) {
    return DISPLAY_NAME_TOO_LONG_ERROR;
  }
  return null;
}
