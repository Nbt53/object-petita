import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAdmin(auth) {
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const response = await fetch(`/isAdmin?uid=${currentUser.uid}`);
                const data = await response.json();
                setAdmin(data.isAdmin);
            }
        });

        return unsubscribe;
    }, [auth]);

    return [admin, setAdmin];
}