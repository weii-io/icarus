export function generateRandomPassword(length = 12) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const specialCharacters = "!@#$%^&*()-_";

  let password = "";

  // Ensure inclusion of at least one character from each type
  password += getRandomChar(lowercaseLetters);
  password += getRandomChar(uppercaseLetters);
  password += getRandomChar(digits);
  password += getRandomChar(specialCharacters);

  // Generate remaining characters randomly
  for (let i = 4; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  // Shuffle the password characters
  password = shuffleString(password);

  return password;
}

// Helper function to get a random character from a string
function getRandomChar(str: string) {
  const randomIndex = Math.floor(Math.random() * str.length);
  return str[randomIndex];
}

// Helper function to shuffle a string
function shuffleString(str: string) {
  const array = str.split("");
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join("");
}
