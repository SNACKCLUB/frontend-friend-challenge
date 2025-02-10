import { fakeDB } from "../mock-api/fakeDatabase";

const generateFakeToken = (name: string): string => {
  const payload = JSON.stringify({ name, exp: Date.now() + 1000 * 60 * 60 });
  const base64Payload = btoa(payload); // Alterado para compatibilidade web
  return `mockedHeader.${base64Payload}.mockedSignature`;
};

/**
 * Authenticates the user by checking if they exist in the fake database.
 * @param name - The user's name to check.
 * @returns {Promise<{success: boolean; token?: string}>} - Returns success and token if user exists.
 */
export const loginUser = async (name: string): Promise<{ success: boolean; token?: string }> => {
  const user = fakeDB.findUser(name);
  if (!user) return { success: false };

  return { success: true, token: generateFakeToken(name) };
};

/**
 * Registers a new user in the fake database.
 * @param name - The name to register.
 * @param avatar - The user's avatar URL.
 * @returns {Promise<boolean>} - Returns true if registration is successful, false otherwise.
 */
export const registerUser = async (name: string, avatar: string): Promise<boolean> => {
  if (!name.trim()) return false; // Evita registros com nome vazio
  return !!fakeDB.addUser(name, avatar); // Garante retorno booleano válido
};
