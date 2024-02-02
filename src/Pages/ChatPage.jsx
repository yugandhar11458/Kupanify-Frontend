
// Importing necessary components and styles
import Navbar from '../components/Navbar';
import Chat from '../components/Chat'
import Footer from '../components/Footer';
import './chatPage.css';

// React functional component for the ChatPage
function ChatPage({ user, handleNewChatUserIdUpdate, newSelectedChatUserId }) {
  
  // Rendering the ChatPage component
  return (
    <div className='chatpage'>
      {/* Navigation bar with search and category hidden */}
      <Navbar showSearchAndCategory={false} user={user}/>
      
      {/* Chat component with user information and chat handling props */}
      <Chat user={user} handleNewChatUserIdUpdate={handleNewChatUserIdUpdate} newSelectedChatUserId={newSelectedChatUserId} />
      
      {/* Footer component */}
      <Footer />
    </div>
  );
}

// Exporting the ChatPage component for use in other parts of the application
export default ChatPage;
