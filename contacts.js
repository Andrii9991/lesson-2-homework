const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");
console.log(contactsPath);

const list = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const get = async (id) => {
  const contacts = await list();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

const add = async (data) => {
  const contacts = await list();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const remove = async (id) => {
  const contacts = await list();

  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); // перезаписуємо весь JSON
  return result;
};

module.exports = {
  list,
  get,
  add,
  remove,
};
