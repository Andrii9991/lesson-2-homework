const { program } = require("commander");

const contacts = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.list();
      return console.log(allContacts);

    case "get":
      const oneContact = await contacts.get(id);
      return console.log(oneContact);

    case "add":
      const newContact = await contacts.add({ name, email, phone });
      return console.log(newContact);

    case "remove":
      const removeContact = await contacts.remove(id);
      return console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
program
  .option("-a, --action, <type>")
  .option("-i,--id, <type>")
  .option("-n,--name, <type>")
  .option("-e,--email, <type>")
  .option("-p,--phone, <type>");

program.parse();

const options = program.opts();
invokeAction(options);
