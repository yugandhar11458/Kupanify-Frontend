
import { useState } from "react";
import { Link } from 'react-router-dom';
import "./navbar.css";
import searchIcon from "../assets/search.svg";
import logo from "../assets/logo.png";
import config from '../Config';

// Navbar component with props for various functionalities
function Navbar(props) {

  console.log("Navbar",props.user);
  // State to manage the search input value
  const [searchValue, setSearchValue] = useState('');

  // Handler for search input changes
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    // Pass the search value to the parent component
    props.onSearchChange(value);
  };

  // Handler for category dropdown changes
  const handleCategoryChange = (event) => {
    const value = event.target.value;
    // Pass the selected category to the parent component
    props.onCategoryChange(value);
  };

  // JSX structure for the Navbar component
  return (
    <div className="navbar">
      {/* Link to home with the Kupanify logo */}
      <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="logo">
          <img
            className="logo-title"
            src={logo}
            alt="kupanify"
          />
        </div>
      </Link>

      {/* Display search bar and icon if specified by props */}
      {props.showSearchAndCategory && (
        <div className='search-bar'>
          {/* Input field for search */}
          <input
            className='search-bar-input-field'
            type='text'
            placeholder='Search...'
            value={searchValue}
            onChange={handleSearchChange}
          />
          {/* Search icon */}
          <img
            className='search-bar-search-icon'
            src={searchIcon}
            alt='Search Icon'
          />
        </div>
      )}

      {/* Display category dropdown if specified by props */}
      {props.showSearchAndCategory && (
        <div className='category-dropdown'>
          {/* Dropdown for selecting category */}
          <select defaultValue='' onChange={handleCategoryChange}>
            <option value='' disabled>
              Category
            </option>
            <option value='Appliances'>Appliances</option>
            <option value='Beauty'>Beauty</option>
            <option value='Electronics'>Electronics</option>
            <option value='Entertainment'>Entertainment</option>
            <option value='Fashion'>Fashion</option>
            <option value='Food'>Food</option>
            <option value='Health'>Health</option>
            <option value='Travel'>Travel</option>
            <option value='Others'>Others</option>
          </select>
        </div>
      )}

      {/* Link to user profile with username and profile image */}
      <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="profile">
          <p className="profile-name">{props.user.userName}</p>
          <img
            className="profile-image"
            src={`${config.backendIpAddress}${props.user.userProfileImage}`}
            alt="profile-image"
            referrerPolicy="no-referrer"
          />
        </div>
      </Link>

    </div>
  );
}

// Export the Navbar component as the default export
export default Navbar;
