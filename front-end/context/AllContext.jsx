import { createContext, useEffect, useState } from "react";
import { db } from "../src/config/Firebase";
import { collection, getDocs } from "firebase/firestore";

export const AllContext = createContext();

export const AllProvider = ({ children }) => {
    const [portfolioData, setPortfolioData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ref = await getDocs(collection(db, "portfolio"));
                const documents = [];
                
                ref.forEach((doc) => {
                    const id = doc.id;
                    const artData = doc.data();
                    documents.push({ [id]: artData }); 
                });
                setPortfolioData(documents);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchData();
    }, []);

    return (
        <AllContext.Provider value={{ portfolioData }}>
            {children}
        </AllContext.Provider>
    )
}