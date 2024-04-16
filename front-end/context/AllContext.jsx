import { createContext, useEffect, useState } from "react";
import { db } from "../src/config/Firebase";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";

export const AllContext = createContext();

export const AllProvider = ({ children }) => {
    const [portfolioData, setPortfolioData] = useState([])
    const [blogs, setBlogs] = useState([])
    const [blogSlugs, setBlogSlugs] = useState([])
    const [portfolioSlugs, setPortfolioSlugs] = useState([])

    ////////////////Fetch Portfolio ///////////////////////

    useEffect(() => {
        const fetchData = () => {
            try {
                const q = query(collection(db, "portfolio"), orderBy("date", "desc"));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const documents = [];

                    querySnapshot.forEach((doc) => {
                        const id = doc.id;
                        const artData = doc.data();
                        documents.push({ [id]: artData });
                    });
                    setPortfolioData(documents);
                });

                // Clean up the onSnapshot listener when the component is unmounted
                return () => unsubscribe();
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchData();
    }, []);

    ////////////////Fetch Blogs ///////////////////////

    useEffect(() => {
        const q = query(collection(db, "blog"), orderBy("date", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const documents = [];

            snapshot.forEach((doc) => {
                const blogData = doc.data();
                documents.push(blogData);
            });

            setBlogs(documents);
        });

        // Clean up the onSnapshot listener when the component is unmounted
        return () => unsubscribe();
    }, []);

    //////////list slugs for validation //////////////////

    useEffect(() => {
        const blogSlugs = blogs.map(blog => blog.slug);
        const portfolioSlugs = portfolioData.map(portfolio => Object.values(portfolio)[0].slug);
        setBlogSlugs(blogSlugs);
        setPortfolioSlugs(portfolioSlugs);
    }, [blogs, portfolioData])


    return (
        <AllContext.Provider value={{
            portfolioData, blogs,
            blogSlugs, portfolioSlugs
        }}>
            {children}
        </AllContext.Provider>
    )
}