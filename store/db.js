import Dexie from "dexie";

export const db = new Dexie("PencoDb");

db.version(1).stores({
    cart: '++id, list, lastUpdated, status, email, phone, estimate'
})