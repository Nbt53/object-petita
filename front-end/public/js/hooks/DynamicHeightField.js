import { useEffect } from "react";

export const useDynamicHeightField = (ref, value) => {
    useEffect(() => {
        if (ref.current && ref.current.scrollHeight) {
            ref.current.style.height = "auto";
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    }, [value]);
};