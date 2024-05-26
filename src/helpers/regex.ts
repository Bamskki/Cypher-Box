export const strongPasswordMessage = "Password must contain at least one digit, one uppercase letter, one lowercase letter, one special character and be between 6 and 20 characters long"

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*]).{6,}$/;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/