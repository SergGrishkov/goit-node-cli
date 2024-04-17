import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
console.log(contactsPath);

export async function listContacts() {
  try {
    return JSON.parse(await fs.readFile(contactsPath, "utf8"));
  } catch (error) {
    throw error;
  }
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const res = contacts.filter((f) => f.id === contactId);
  if (res.length === 0) {
    return null;
  } else {
    return res;
  }
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  } else {
    const deletedData = contacts.splice(index, 1)[0];
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return deletedData;
  }
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const contact = { id: nanoid(), name, email, phone };
  contacts.push(contact);
  try {
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return contact;
  } catch (error) {
    throw error;    
  }
}
