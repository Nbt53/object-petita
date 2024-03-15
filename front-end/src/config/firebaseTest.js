
import {  collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from './Firebase';



// Add a new document with a generated id.
export const testFirebase = async () => {
    try {
        const docRef = await addDoc(collection(db, "testCollection"), {
            name: "Test Document",
            createdAt: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);

        // Get all documents in the collection
        const querySnapshot = await getDocs(collection(db, "testCollection"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};