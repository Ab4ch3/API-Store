// import models
import models from "../models/index.js";
// Import handleBcrypt
import { encrypt } from "../helpers/handleBcrypt.js";

export default {
  /**
   * Return all Users
   * @param {*} find
   * @returns
   */
  getAllUsers: async (find) => {
    let value = find;
    console.log(value);
    let result = await models.user
      .find(
        {
          $or: [
            { name: new RegExp(value, "i") },
            { email: new RegExp(value, "i") },
          ],
        },
        { created_at: 0 }
      )
      .sort({ created_at: -1 });
    return result;
  },
  /**
   * Return one User
   * @param {*} userId
   * @returns
   */
  getUser: async (userId) => {
    let result = await models.user.findById(userId);
    return result;
  },
  /**
   * Return User Created
   * @param {*} user
   * @returns
   */
  createUser: async (user) => {
    /* Encriptamos el password antes de crearlo
     */
    user.password = await encrypt(user.password);
    let result = await models.user.create(user);
    return result;
  },
  /**
   * Return Update one user
   * @param {*} userId
   * @param {*} user
   * @returns
   */
  updateUsers: async (userId, user) => {
    let result = await models.user.findByIdAndUpdate(
      userId,
      {
        role: user.role,
        name: user.name,
        document_type: user.document_type,
        document_num: user.document_num,
        address: user.address,
        phone: user.phone,
        email: user.email,
      },
      { new: true }
    );
    return result;
  },
  /**
   *  Return Update User Password
   * @param {*} userId
   * @param {*} user
   * @returns
   */
  updatePassword: async (userId, user) => {
    let pass = user.password;
    const selectedUser = await models.user.findById(userId);

    if (pass != selectedUser.password) {
      user.password = await encrypt(user.password);
    }

    let result = await models.user.findByIdAndUpdate(
      userId,
      {
        password: user.password,
      },
      {
        new: true,
      }
    );
    return result;
  },

  /**
   * Return Enable one user
   * @param {*} userId
   * @param {*} user
   * @returns
   */
  enableUser: async (userId, user) => {
    let result = await models.user.findByIdAndUpdate(
      userId,
      {
        status: user.status,
      },
      { new: true }
    );
    return result;
  },
  /**
   * Return disabled one user
   * @param {*} userId
   * @param {*} user
   * @returns
   */
  disableUser: async (userId, user) => {
    let result = await models.user.findByIdAndUpdate(
      userId,
      {
        status: user.status,
      },
      { new: true }
    );
    return result;
  },
  /**
   * Return Delete one user
   * @param {*} userId
   * @returns
   */
  deleteUser: async (userId) => {
    let result = await models.user.findByIdAndDelete(userId);

    return result;
  },
};
