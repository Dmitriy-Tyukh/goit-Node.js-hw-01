const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs").promises;
require("colors");

const contactsPath = path.join("db", "contacts.json");
/**
 * readContacts
 * @returns {Promise<void>}
 */
const readContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
};
/**
 * writeContacts
 * @param {array <object>} data
 * @param {string} fileName 
 * @returns {Promise<void>}
 */
const writeContacts = async (fileName, data) => {
  try {
    await fs.writeFile(fileName, JSON.stringify(data), "utf8");
  } catch (error) {
    console.log(error.message);
  }
};

// TODO: задокументировать каждую функцию
/**
 * listContacts
 * @returns {array<object>}
 */
async function listContacts() {
  const contacts = await readContacts(contactsPath);
  console.table(contacts);
}
/**
 * getContactById
 * @param {string} contactId 
 * @returns {array<object>}
 */
async function getContactById(contactId) {
    const contacts = await readContacts(contactsPath);
    const contactById = contacts.filter(({ id }) => id === contactId);
   
    if (!contactById.length > 0) {
      console.log(`Contact with id: ${contactId} is not found!`.red);
      return;
    }
  console.table(contactById);
}
/**
 * removeContact
 * @param {string} contactId 
 * @returns {array<object>}
 */
async function removeContact(contactId) {
    const contacts = await readContacts(contactsPath);
    const data = contacts.filter(({ id }) => id !== contactId);
  
    if (data.length === contacts.length) {
      console.log(`Contact with id: ${contactId} is not found!`.red);
      return;
    }
    writeContacts(contactsPath, data);

    console.log(`Contact with id: ${contactId} removed!`.yellow);
    console.table(data);
}
/**
 * addContact
 * @param {string} name 
 * @param {string} email 
 * @param {string} phone 
 * @returns {array<object>}
 */
async function addContact(name, email, phone) {
    const newContact = {
        name,
        email,
        phone,
        id: uuidv4(), 
    }
    const contacts = await readContacts(contactsPath);
    const data = [...contacts, newContact];

    writeContacts(contactsPath, data);

    console.log('Succsess !!! You add new contact'.green)
    console.table(data);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
