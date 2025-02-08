import { fakeDB } from "../mock-api/fakeDatabase";

/**
 * Authenticates the user by checking if they exist in the fake database.
 * @param name - The user's name to check.
 * @returns {Promise<boolean>} - Returns true if user exists, false otherwise.
 */
export const loginUser = async (name: string): Promise<boolean> => {
  return !!fakeDB.findUser(name);
};

/**
 * Registers a new user in the fake database.
 * @param name - The name to register.
 * @returns {Promise<boolean>} - Returns true if registration is successful, false otherwise.
 */
export const registerUser = async (name: string): Promise<boolean> => {
  return fakeDB.addUser(name);
};
