import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
        setUser(userInfo);
        console.log("userInfo context", userInfo);
    }, []);

    return (
        <ChatContext.Provider
            value={{
                user,
                setUser,
                notification,
                setNotification,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
