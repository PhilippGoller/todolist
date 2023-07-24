import Dexie from "dexie";

/**
 * The IndexedDB used to store tasks and categories.
 */
const db = new Dexie("MyAwesomeToDoList");
db.version(1).stores({
    tasks: "++id, date, category",
    categories: "++id, name"
});

export default db;