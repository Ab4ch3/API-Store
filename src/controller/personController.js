// Import Debug
import debug from "debug";
const logger = debug("app:module-personController");
// Import handlehttpErrors
import httpErrors from "../helpers/handleErrors.js";
// Import Services
import personServices from "../services/personServices.js";

/**
 * Get All Person
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllPersons = async (req, res, next) => {
  const {
    query: { find },
  } = req;
  try {
    const allPersons = await personServices.getAllPersons(find);
    res.status(200).json({
      status: "OK",
      data: allPersons,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_GET_PERSONS");
    next(e);
  }
};

/**
 * Get All Client
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllClients = async (req, res, next) => {
  const {
    query: { find },
  } = req;
  try {
    const allClients = await personServices.getAllClients(find);
    res.status(200).json({
      status: "OK",
      data: allClients,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_GET_CLIENTS");
    next(e);
  }
};

/**
 * Get All Providers
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllProviders = async (req, res, next) => {
  const {
    query: { find },
  } = req;
  try {
    const allProviders = await personServices.getAllProviders(find);
    res.status(200).json({
      status: "OK",
      data: allProviders,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_GET_PROVIDERS");
    next(e);
  }
};

/**
 * Get One Person
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getPerson = async (req, res, next) => {
  try {
    const {
      params: { PersonId },
    } = req;
    const person = await personServices.getPerson(PersonId);
    if (!person) {
      httpErrors(res, "NOT_FOUND", 404);
    } else {
      res.status(200).json({
        status: "OK",
        data: person,
      });
    }
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_GET_PERSON");
    next(e);
  }
};

/**
 * Create Person
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createPerson = async (req, res, next) => {
  try {
    const { body } = req;
    const createdPerson = await personServices.createPerson(body);
    res.status(200).json({
      status: "OK",
      message: "PERSON_CREATED",
      data: createdPerson,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_CREATED_PERSON");
    next(e);
  }
};

/**
 * Update Person
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updatePerson = async (req, res, next) => {
  try {
    const {
      params: { PersonId },
    } = req;
    const { body } = req;
    const updatedPerson = await personServices.updatePerson(PersonId, body);
    if (!updatedPerson) {
      return httpErrors(res, "NOT_FOUND", 404);
    }

    res.status(200).json({
      status: "OK",
      message: "PERSON_UPDATED",
      data: updatedPerson,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_UPDATED_PERSON");
    next(e);
  }
};

/**
 * Enable Person
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const enablePerson = async (req, res, next) => {
  try {
    const {
      params: { PersonId },
    } = req;
    const { body } = req;
    const enabledPerson = await personServices.enablePerson(PersonId, body);
    if (!enabledPerson) {
      return httpErrors(res, "NOT_FOUND", 404);
    }

    res.status(200).json({
      status: "OK",
      message: "PERSON_ENABLED",
      data: enabledPerson,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_ENABLED_PERSON");
    next(e);
  }
};

/**
 * disable Person
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const disablePerson = async (req, res, next) => {
  try {
    const {
      params: { PersonId },
    } = req;
    const { body } = req;
    const disabledPerson = await personServices.disablePerson(PersonId, body);
    if (!disabledPerson) {
      return httpErrors(res, "NOT_FOUND", 404);
    }

    res.status(200).json({
      status: "OK",
      message: "PERSON_DISABLED",
      data: disabledPerson,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_DISABLED_PERSON");
    next(e);
  }
};

/**
 * delete Person
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deletePerson = async (req, res, next) => {
  try {
    const {
      params: { PersonId },
    } = req;
    const deletedPerson = await personServices.deletePerson(PersonId);
    if (!deletedPerson) {
      return httpErrors(res, "NOT_FOUND", 404);
    }

    res.status(200).json({
      status: "OK",
      message: "PERSON_DELETED",
      data: deletedPerson,
    });
  } catch (e) {
    logger(e);
    httpErrors(res, "ERROR_DELETED_PERSON");
    next(e);
  }
};

export {
  getAllPersons,
  getAllClients,
  getAllProviders,
  getPerson,
  createPerson,
  updatePerson,
  enablePerson,
  disablePerson,
  deletePerson,
};
