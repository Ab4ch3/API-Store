// Import bcrypt
import bcrypt from "bcrypt";

/**
 * Funcion que se encarga de encriptar el password
 * @param {*} password Constrase#a sin encriptar
 * @returns
 */
const encrypt = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};
/**
 *Funcion que decodifica la contrase#a , pasar contra#ena y contra#ena encriptada
 * @param {*} password
 * @param {*} hashPassword
 */
const compare = async (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};

export { encrypt, compare };
