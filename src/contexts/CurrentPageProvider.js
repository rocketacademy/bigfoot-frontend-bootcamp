import React, { createContext, useState } from "react";

export const CurrentPageContext = createContext(1);

function CurrentPageProvider({ children }) {
    const [currentPage, setCurrentPage] = useState(1);

    const contextObj = {
        currentPage,
        setCurrentPage,
    };

    return (
        <CurrentPageContext.Provider value={contextObj}>
            {children}
        </CurrentPageContext.Provider>
    );
}

export default CurrentPageProvider;
