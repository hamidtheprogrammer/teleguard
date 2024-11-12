import crypto from "crypto";

// Generate a 32-byte (256-bit) key and a 16-byte IV
export const key = Buffer.from(process.env.CRYPTOGRAPHY_KEY as string, "hex"); // 256 bits key for AES-256
export const iv = Buffer.from(process.env.CRYPTOGRAPHY_IV as string, "hex"); // 128 bits IV for AES

// Encryption function
export const encrypt = (text: string) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

// Decryption function
export const decrypt = (encryptedText: string) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
