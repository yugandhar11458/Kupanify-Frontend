
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./chat.css";
import addIcon from "../assets/add.png";
import sendIcon from "../assets/send.png";
import noMessages from "../assets/no-messages.png";
import tickIcon from "../assets/tick.png";

// Import the config file
import config from '../config';

// Chat component receives user details, new chat user ID, and a function to update new selected chat user ID
function Chat({ user, handleNewChatUserIdUpdate, newSelectedChatUserId }) {
  // State variables for managing user list, selected user, messages, etc.
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserMessages, setSelectedUserMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [expandedMessages, setExpandedMessages] = useState([]);
  const [message, setMessage] = useState({
    content: "",
    image: null,
  });
  const [dataLoaded, setDataLoaded] = useState(false);

  console.log(`chat page: ${newSelectedChatUserId}`);

  // Fetches the list of users when the component mounts or new chat user is selected
  const fetchUsersList = async () => {
    try {
      const response = await axios.get(
        `${config.backendIpAddress}/api/chat/messages/${user.userId}/`
      );
      setUsersList(response.data);
      const selectedUser = response.data.find(
        (user) => user.userId === newSelectedChatUserId
      );
      setSelectedUser(selectedUser);
    } catch (error) {
      console.error("Error fetching users list:", error);
    }
  };

  // Fetches messages for the selected user
  const getSelectedUserMessage = async (selectedUser) => {
    if (selectedUser) {
      try {
        const response = await axios.get(
          `${config.backendIpAddress}/api/chat/messages/${user.userId}/${selectedUser.userId}/`
        );

        setSelectedUserMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };

  // Handles click event to expand image message
  const handleImageOpenClick = (messageId) => {
    setExpandedMessages((prevExpanded) => [...prevExpanded, messageId]);
  };

  // Handles click event to close expanded image
  const handleImageCloseClick = () => {
    setExpandedMessages([]);
  };

  // Handles input change for message content and image
  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setMessage({ ...message, [e.target.name]: e.target.files[0] });
    } else {
      setMessage({ ...message, [e.target.name]: e.target.value });
    }
  };

  // Handles sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      let messageData;

      if (message.image !== null) {
        // If message contains an image, use FormData for sending
        messageData = new FormData();
        messageData.append("content", message.content);
        messageData.append("image", message.image);

        const response = await axios.post(
          `${config.backendIpAddress}/api/chat/messages/${user.userId}/${selectedUser.userId}/`,
          messageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Message sent successfully:", response.data);
      } else if (message.content !== "") {
        // If message is text-based, send as JSON
        messageData = {
          content: message.content,
          image: message.image,
        };

        const response = await axios.post(
          `${config.backendIpAddress}/api/chat/messages/${user.userId}/${selectedUser.userId}/`,
          messageData
        );

        console.log("Message sent successfully:", response.data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    // Reset the message input fields after sending
    setMessage({
      content: "",
      image: null,
    });
  };

  // Handles pressing Enter key to send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage(e);
    }
  };

  // Updates the selected user ID when a user is clicked
  const handleUserClick = (newChatUser) => {
    handleNewChatUserIdUpdate(newChatUser.userId);
  };

  // useEffect to fetch users list and update every second
  useEffect(() => {
    fetchUsersList().then(() => {
      setDataLoaded(true);
    });

    const intervalId = setInterval(() => {
      fetchUsersList();
    }, 1000);

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, [user.userId, newSelectedChatUserId]);

  // useEffect to scroll to the bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto", block: "end" });
    }
  }, [selectedUserMessages]);

  // useEffect to fetch selected user's messages and update every second
  useEffect(() => {
    getSelectedUserMessage(selectedUser);

    const messagesIntervalId = setInterval(() => {
      getSelectedUserMessage(selectedUser);
    }, 1000);

    // Cleanup interval when component unmounts or selected user changes
    return () => clearInterval(messagesIntervalId);
  }, [selectedUser]);

  // Render the chat component
  return (
    <>
      {dataLoaded && (
        <div className="chat-page">
          {usersList && usersList.length > 0 ? (
            <div className="chat-window">
              {/* Display user profiles on the left */}
              <div className="chat-user-profiles">
                {usersList.map((chatUser) => (
                  <div
                    key={chatUser.userId}
                    className="chat-user"
                    onClick={() => handleUserClick(chatUser)}
                  >
                    <img
                      src={chatUser.userImage}
                      alt=""
                      className="chat-user-profile-image"
                      referrerPolicy="no-referrer"
                    />
                    <p className="chat-user-name">{chatUser.userName}</p>
                  </div>
                ))}
              </div>

              {/* Display chat messages on the right */}
              <div className="chat-messages">
                {selectedUser ? (
                  <>
                    {/* Display selected user's profile */}
                    <div className="chat-user-profile-top-bar">
                      <img
                        src={selectedUser.userImage}
                        alt=""
                        className="chat-user-profile-image"
                      />
                      <p className="chat-user-name">{selectedUser.userName}</p>
                    </div>

                    {/* Display selected user's messages */}
                    <div className="chat-messages-window">
                      {selectedUserMessages.map((message) => (
                        (message.content !== "" || message.image !== null) && (
                          <div
                            key={message.id}
                            className={
                              message.sender === user.userId
                                ? "sent-message"
                                : "received-message"
                            }
                          >
                            {message.content && <p>{message.content}</p>}
                            {message.image && (
                              <div className="message-img-container">
                                {/* Display small image with the option to expand */}
                                <img
                                  src={`${config.backendIpAddress}${message?.image}`}
                                  alt=""
                                  className="message-img"
                                  onClick={() =>
                                    handleImageOpenClick(message.id)
                                  }
                                />
                                {/* Display expanded image when clicked */}
                                {expandedMessages.includes(message.id) && (
                                  <div className="overlay">
                                    <img
                                      src={`${config.backendIpAddress}${message?.image}`}
                                      alt="Expanded Image"
                                      className="message-img-expanded"
                                    />
                                    <span
                                      className="close-btn"
                                      onClick={handleImageCloseClick}
                                    >
                                      &times;
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      ))}
                      {/* Ref for scrolling to the bottom of the messages */}
                      <div ref={messagesEndRef}></div>
                    </div>

                    {/* Display input field for typing new messages */}
                    <div>
                      <form
                        className="chat-message-input-field"
                        onSubmit={handleSendMessage}
                      >
                        {/* Image input field */}
                        <label
                          htmlFor="image-input"
                          className="image-input-label"
                        >
                          <img
                            src={message.image === null ? addIcon : tickIcon}
                            alt="Image Input"
                            className="image-input-icon"
                          />
                        </label>
                        <input
                          id="image-input"
                          type="file"
                          accept="image/*"
                          name="image"
                          style={{ display: "none" }}
                          onChange={handleInputChange}
                        />
                        {/* Text input field for message content */}
                        <input
                          type="text"
                          className="chat-message-input-text-field"
                          placeholder="Type your message..."
                          name="content"
                          value={message.content}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                        />
                        {/* Button to send the message */}
                        <button className="send-message-btn" type="submit">
                          <img
                            src={sendIcon}
                            alt="Send Message"
                            className="send-message-icon"
                          />
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  // Display message when no user is selected
                  <p className="chat-no-user-selected">
                    Select a user to start chatting...💭
                  </p>
                )}
              </div>
            </div>
          ) : (
            // Display image when there are no messages
            <img src={noMessages} alt="No messages" className="no-messages" />
          )}
        </div>
      )}
    </>
  );
}

export default Chat;
