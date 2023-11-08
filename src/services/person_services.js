// import models
import models from '../models/index.js';

export default {
  /**
   * Return all Persons
   * @param {*} find
   * @returns
   */
  getAllPersons: async (find) => {
    /*  Aplica consultas mas preparadas de mongodb, en este caso no se vera created_at y los demas si se mostraran ademas se filtrara de manera desc el created_at.
    Tambien aplicara busquedas dependiendo del valor q le pasemos  */
    const value = find;
    const result = await models.person
      .find(
        {
          $or: [
            { name: new RegExp(value, 'i') },
            { email: new RegExp(value, 'i') }
          ]
        },
        { created_at: 0 }
      )
      .sort({ created_at: -1 });
    return result;
  },
  /**
   * Return all Client
   * @param {*} find
   * @returns
   */
  getAllClients: async (find) => {
    const value = find;
    const result = await models.person
      .find(
        {
          $or: [
            { name: new RegExp(value, 'i') },
            { email: new RegExp(value, 'i') }
          ],
          type_person: 'Client'
        },
        { created_at: 0 }
      )
      .sort({ created_at: -1 });
    return result;
  },
  /**
   * Return all Providers
   * @param {*} find
   * @returns
   */
  getAllProviders: async (find) => {
    const value = find;
    const result = await models.person
      .find(
        {
          $or: [
            { name: new RegExp(value, 'i') },
            { email: new RegExp(value, 'i') }
          ],
          type_person: 'Provider'
        },
        { created_at: 0 }
      )
      .sort({ created_at: -1 });
    console.log(result);
    return result;
  },
  /**
   * Return one Person
   * @param {*} PersonId
   * @returns
   */
  getPerson: async (PersonId) => {
    const result = await models.person.findById(PersonId);

    return result;
  },
  /**
   * Return Person Created
   * @param {*} person
   * @returns
   */
  createPerson: async (person) => {
    const result = await models.person.create(person);
    return result;
  },
  /**
   * Return Update one person
   * @param {*} PersonId
   * @param {*} person
   * @returns
   */
  updatePerson: async (PersonId, person) => {
    const result = await models.person.findByIdAndUpdate(
      PersonId,
      {
        type_person: person.type_person,
        name: person.name,
        document_type: person.document_type,
        document_num: person.document_num,
        address: person.address,
        phone: person.phone,
        email: person.email
      },
      { new: true }
    );
    return result;
  },
  /**
   * Return Enable one Person
   * @param {*} PersonId
   * @param {*} person
   * @returns
   */
  enablePerson: async (PersonId, person) => {
    const result = await models.person.findByIdAndUpdate(
      PersonId,
      {
        status: person.status
      },
      { new: true }
    );
    return result;
  },
  /**
   * Return Disable one Person
   * @param {*} PersonId
   * @param {*} person
   * @returns
   */
  disablePerson: async (PersonId, person) => {
    const result = await models.person.findByIdAndUpdate(
      PersonId,
      {
        status: person.status
      },
      { new: true }
    );
    return result;
  },
  /**
   * Return Delete one Person
   * @param {*} PersonId
   * @returns
   */
  deletePerson: async (PersonId) => {
    const result = await models.person.findByIdAndDelete(PersonId);

    return result;
  }
};
