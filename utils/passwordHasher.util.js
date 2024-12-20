import bcrypt from "bcrypt";
const saltRounds = 10;
const passwordHasher = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw new Error("Error hashing password:" + err.message);
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (err) {
    throw new Error("Error comparing password:" + err.message);
  }
};

export { passwordHasher, comparePassword };
