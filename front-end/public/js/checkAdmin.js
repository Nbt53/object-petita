import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export function useAdmin(auth) {
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

            if (currentUser) {
                const response = await fetch(`/isAdmin?uid=${currentUser.uid}`);
                const data = await response.json();
                setAdmin(data.isAdmin);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, [auth]);

    return [admin, loading];
}