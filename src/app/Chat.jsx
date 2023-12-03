import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import background from "../common/assets/img/commonbackground.jpg";
import "./assets/chat.css";
import { avatarLoader } from "../user/avatar-loader";

export default function Chat({ allowedUsers = [], selectedPangui = -1}){
    const [selectedChat, setSelectedChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [user, setUser] = useState(null);
    const [messageContent, setMessageContent] = useState("");
    const messagesContainerRef = useRef(null);
    const [chatUsers, setChatUsers] = useState([]);

    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/session`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchChats = async (userId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/chats/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Selected pangui:", selectedPangui);
            if (selectedPangui != -1) {
                const panguiChat = response.data.find(chat => chat.PanguiId === selectedPangui);
                if (panguiChat) {
                    setSelectedChat(response.data.indexOf(panguiChat));
                    setChats([panguiChat]);
                }
            } else {
                setChats(response.data);
            }
            console.log("Chats fetched:", response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchCaretakers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/pangui/${selectedPangui}/caretakers`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setChatUsers(response.data.caretakers);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
            fetchChats(user.id);
            fetchCaretakers();
        }
    }, [user]);

    const handleChatClick = (index) => {
        setSelectedChat(index);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    }

    const handleSendMessage = async () => {
        if (!messageContent.trim()) {
            return;
        }
    
        const token = localStorage.getItem("token");
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/messages`, {
                content: messageContent,
                sender: user.id,
                ChatId: chats[selectedChat].id,
                PanguiId: chats[selectedChat].PanguiId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            setMessageContent("");
            fetchChats(user.id);
        } catch (error) {
            console.error(error);
        }
    }

    const filteredChats = chats.filter(chat =>
        allowedUsers.length === 0 ? true : allowedUsers.includes(chat.pangui)
    );

    const getDown = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        getDown();
    }, [selectedChat]);


    useEffect(() => {
        getDown();
    }, [filteredChats[selectedChat]]);

    return (
        <>
            <Image className="background" alt="login background" src={background} />
            <Container className="chat-container">
                <Col className="col-3 users-section">
                    {filteredChats.map((chat, index) => (
                        <div key={"chat-" + index} className={`user-item ${selectedChat === index ? "selected" : ""}`}
                            onClick={() => handleChatClick(index)}>
                            <p>{chat.pangui}</p>
                        </div>
                    ))}
                </Col>

                <Col className="col-9 message-section">
                    {selectedChat !== null && filteredChats[selectedChat] && (
                        <>
                            <div className="message-header">
                                <div className="collage"> {
                                    chatUsers.slice(0, 4).map((user, index) => (
                                        <Image key={"user-" + index} src={avatarLoader(user.avatarId)} alt="pfp"/>))
                                }
                                </div>
                                <p className="h4">Chat de {filteredChats[selectedChat].pangui}</p>
                            </div>

                            <div className="message-body" ref={messagesContainerRef}>
                                {filteredChats[selectedChat].Messages.map((msg, index) => (
                                    <div key={"msg-" + index} className="message-user" style={{ flexDirection: msg.sender === user.id ? "row-reverse" : "row"}}> 
                                        {msg.sender !== user.id && 
                                        <Image className="pfp-chat" src={avatarLoader(msg.senderAvatarId)} alt="pfp"/> 
                                        } {/* TODO: map  and load img of user */}
                                        <div className={`${msg.sender === user.id ? "user-1" : "user-2"}`}>
                                            <p>
                                                {msg.sender !== user.id && 
                                                <p className="sender-name">
                                                    {msg.senderName}
                                                </p>}   
                                                {msg.content}
                                            </p>             
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="message-footer">
                                <input type="text" 
                                    placeholder="Escribe tu mensaje..." 
                                    value={messageContent} 
                                    onChange={(e) => setMessageContent(e.target.value)} 
                                    onKeyDown={handleKeyDown} />
                                <Button variant="primary" onClick={handleSendMessage}>Enviar</Button>
                            </div>
                        </>
                    )}
                </Col>
            </Container>
        </>
    );
}