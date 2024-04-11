import { createContext, useEffect, useState } from "react";
import { db } from "../src/config/Firebase";
import { collection, getDocs } from "firebase/firestore";

export const AllContext = createContext();

export const AllProvider = ({ children }) => {
    const [portfolioData, setPortfolioData] = useState([])
    const [blogs, setBlogs] = useState([])
    const [slugList, setSlugList] = useState([])

    ////////////////Fetch Portfolio ///////////////////////

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

    ////////////////Fetch Blogs ///////////////////////

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ref = await getDocs(collection(db, "blog"));
                const documents = [];

                ref.forEach((doc) => {

                    const blogData = doc.data();
                    documents.push(blogData);
                });
                setBlogs(documents);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchData();
    }, []);

    //////////list slugs for validation //////////////////

    useEffect(() => {
        const slugs = blogs.map(blog => blog.slug);
        setSlugList(slugs);
    }, [blogs])

    return (
        <AllContext.Provider value={{ portfolioData, blogs, slugList }}>
            {children}
        </AllContext.Provider>
    )
}