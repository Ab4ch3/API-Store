// import models
import models from '../models/index.js';
// Import handleBcrypt
import { compare } from '../helpers/handle_bcrypt.js';
// Import JWT
import { encode } from '../helpers/handle_JWT.js';

export default {
  singIn: async (user) => {
    const selectedUser = await models.user.findOne({
      email: user.email,
      status: true
    });

    if (selectedUser) {
      // Existe un usuario
      // Verifica que el password sea igual
      const checkPassword = await compare(user.password, selectedUser.password);
      if (checkPassword) {
        const result = {
          User: selectedUser,
          Token: await encode(selectedUser)
        };
        return result;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
};
