// import models
import models from "../models/index.js";
// Import handleBcrypt
import { compare } from "../helpers/handleBcrypt.js";
// Import JWT
import { encode } from "../helpers/handleJWT.js";

export default {
  singIn: async (user) => {
    let selectedUser = await models.user.findOne({
      email: user.email,
      status: true,
    });

    if (selectedUser) {
      // Existe un usuario
      // Verifica que el password sea igual
      let checkPassword = await compare(user.password, selectedUser.password);
      if (checkPassword) {
        let result = {
          User: selectedUser,
          Token: await encode(selectedUser),
        };
        return result;
      } else {
        return null;
      }
    } else {
      return null;
    }
  },
};
