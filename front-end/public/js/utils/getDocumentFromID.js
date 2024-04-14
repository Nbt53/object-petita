import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../src/config/Firebase";

export const getDocument = async (collectionName, id) => {
    const q = query(collection(db, collectionName), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        return docSnap.id;
    } else {
        console.log("No such document!");
        return null;
    }
}