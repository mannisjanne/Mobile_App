import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from './Config';

// 🔹 Kuunnellaan Firestorea reaaliaikaisesti
export const listenToLocations = (setLocations) => {
  const q = collection(db, 'locations');

  return onSnapshot(q, (snapshot) => {
    const locationsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLocations(locationsArray);
  }, (error) => {
    console.error('❌ Virhe kuunnellessa Firestorea:', error);
  });
};

// 🔹 Funktio sijainnin tallentamiseen Firestoreen
export const addTodo = async (location) => {
  try {
    await addDoc(collection(db, 'locations'), location);
    console.log('✅ Sijainti tallennettu Firestoreen:', location);
  } catch (error) {
    console.error('❌ Virhe tallennettaessa Firestoreen:', error);
    throw error;
  }
};
