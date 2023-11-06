// Import JWT
import jwt from 'jsonwebtoken';
// Importamos Config
import config from '../config/index.js';
// import models
import models from '../models/index.js';
// Import Debug
import debug from 'debug';
const logger = debug('app:helper-JWT');

/**
 *Esta funcion se encargara de si se vence el token
 * y el usuario esta logueado no lo saque de errores de token
 * sino que le generara otro token valido
 * @param {*} token
 * @returns
 */
const checkToken = async (token) => {
  let userID = null;
  try {
    const { _id } = await jwt.decode(token);
    userID = _id;
  } catch (e) {
    logger(e);
    return false;
  }
  const user = await models.user.findOne({ _id: userID, status: true });
  if (user) {
    const token = await encode(user);
    return token;
  }
};

/**
 * Se encarga de generar el token
 * JWT , el metodo sign() recibe 3 paramentro ,
 * el id del usuairo , una clave secreta ,
 * y la duracion del token.
 * @param {*} user
 */
const encode = async (user) => {
  const token = jwt.sign(
    {
      _id: user.id,
      role: user.role
    },
    config.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return token;
};
/**
 *Se encarga de Verficar el Token
 * @param {*} token
 */
const decode = async (token) => {
  try {
    const { _id } = await jwt.verify(token, config.JWT_SECRET);

    const user = await models.user.findOne({ _id, status: true });

    if (user) {
      return user;
    } else {
      return false;
    }
  } catch (e) {
    logger(e);
    const newToken = await checkToken(token);
    return newToken;
  }
};

export { encode, decode };
