const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "db/contacts.json");
 
const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;

};

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    if (!result) {
        return null;
    }
    return result;
};

const addContact = async (name, email, phone) => {
    const data = { name, email, phone, id: uuidv4() };
    const contacts = await listContacts();
    contacts.push(data);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return data;
};

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === contactId);
    if(idx === -1){
        return null;
    }
    const deleteContact = contacts[idx];
    contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deleteContact;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
}