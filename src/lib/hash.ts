import bcrypt from "bcryptjs";

/**
 * Hash a plain password
 * @param password - plain text password
 * @returns hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Compare plain password with hashed password
 * @param password - plain text password
 * @param hash - hashed password
 * @returns boolean - true if match
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
