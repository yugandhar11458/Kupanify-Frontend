
// Import necessary modules and components from external libraries
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

// Import pages/components used in the application
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import ChatPage from "./Pages/ChatPage";

// Import the stylesheet for the App
import './App.css';


// Main App component
function App() {

  // State variables to manage user information, loading state, and selected chat user
  const [user, setUser] = useState({
    userId: null,
    userName: null,
    userImage: null,
  });
  const [newSelectedChatUserId, setNewSelectedChatUserId] = useState(null);

  // Function to update the selected chat user
  const handleNewChatUserIdUpdate = (newChatUserId) => {
    setNewSelectedChatUserId(newChatUserId);
  };


  // Create the router configuration based on user authentication status
  const router = createBrowserRouter([
    {
      path: "/login",
      element: user.userId ? (
        // If user is authenticated, redirect to home
        <Navigate to="/home" />
      ) : (
        // If user is not authenticated, display the login page
        <LoginPage setUser={setUser} />
      ),
    },
    {
      path: "/home",
      element: user.userId ? (
        // If user is authenticated, display the home page
        <HomePage
          user={user}
          handleNewChatUserIdUpdate={handleNewChatUserIdUpdate}
        />
      ) : (
        // If user is not authenticated, redirect to login
        <Navigate to="/login" />
      ),
    },
    {
      path: "/profile",
      element: user.userId ? (
        // If user is authenticated, display the profile page
        <ProfilePage user={user} setUser={setUser}/>
      ) : (
        // If user is not authenticated, redirect to login
        <Navigate to="/login" />
      ),
    },
    {
      path: "/chat",
      element: user.userId ? (
        // If user is authenticated, display the chat page
        <ChatPage
          user={user}
          handleNewChatUserIdUpdate={handleNewChatUserIdUpdate}
          newSelectedChatUserId={newSelectedChatUserId}
        />
      ) : (
        // If user is not authenticated, redirect to login
        <Navigate to="/login" />
      ),
    },
    {
      // Catch-all route, redirect to home if authenticated, otherwise redirect to login
      path: "*",
      element: user.userId ? (
        <Navigate to="/home" />
      ) : (
        <Navigate to="/login" />
      ),
    }
  ]);

  // Wrap the JSX with RouterProvider and return the component
  return <RouterProvider router={router}>{/* other JSX */}</RouterProvider>;
}

// Export the main App component as the default export
export default App;
