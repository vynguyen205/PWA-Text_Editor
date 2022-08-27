import { openDB } from 'idb';

const initdb = async () =>
// Open a database named 'jate'
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // create a connection to the db
  const jateDb = await openDB('jate', 1);

  // create a new transaction
  const tx = jateDb.transaction(`jate`, 'readwrite');

  // get the object store
  const store = tx.objectStore('jate');

  // add the todo to the store
  const req = store.put( { id: 1, value: content });

  // wait for the request to complete
  const res = await req;
  console.log('🚀 - data saved to the database', res);


};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // create a connection to the db
  const jateDb = await openDB('jate', 1);
  // create a new transaction. make sure it is readonly
  const tx = jateDb.transaction(`jate`, 'readonly');

  // get the object store
  const store = tx.objectStore('jate');

  // get all the todos from the store
  const req = store.getAll();
  // wait for the request to complete
  const res = await req;
  console.log('🚀 - data retrieved from the database', res);
  return res;
};

initdb();
