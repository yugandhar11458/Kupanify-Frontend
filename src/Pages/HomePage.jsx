
// Import necessary dependencies and components
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import CouponList from '../components/CouponList';
import Footer from '../components/Footer';
import './homePage.css';

// Import the config file
import config from '../config';

// Define the main component for the home page
function HomePage({ user, handleNewChatUserIdUpdate }) {
    // State variables for managing coupons, search term, and selected category
    const [coupons, setCoupons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // useEffect hook to fetch coupons based on search term and selected category
    useEffect(() => {
        // Construct the API endpoint URL based on search term and selected category
        const apiUrl = searchTerm !== '' || selectedCategory !== ''
            ? `${config.backendIpAddress}/api/coupons/?companyName=${searchTerm}&category=${selectedCategory}&userId=${user.userId}`
            : `${config.backendIpAddress}/api/coupons/latest/?userId=${user.userId}`;

        // Fetch coupons from the API and update the state
        axios.get(apiUrl)
            .then(response => setCoupons(response.data))
            .catch(error => console.error('Error fetching coupons:', error));
    }, [searchTerm, selectedCategory]);

    // Function to refetch coupons for the home page
    function refetchHomePageCoupons() {
        // Construct the API endpoint URL for fetching coupons
        const apiUrl = searchTerm !== '' || selectedCategory !== ''
            ? `${config.backendIpAddress}/api/coupons/?companyName=${searchTerm}&category=${selectedCategory}&userId=${user.userId}`
            : `${config.backendIpAddress}/api/coupons/latest/?userId=${user.userId}`;

        // Fetch coupons from the API and update the state
        axios.get(apiUrl)
            .then(response => setCoupons(response.data))
            .catch(error => console.error('Error fetching coupons:', error));
    }

    // Render the home page component
    return (
        <div className='homepage'>
            {/* Render the Navbar component with search and category functionality */}
            <Navbar
                showSearchAndCategory={true}
                onSearchChange={(value) => setSearchTerm(value)}
                onCategoryChange={(value) => setSelectedCategory(value)}
                user={user}
            />
            {/* Main content area displaying the list of coupons */}
            <div className="main-content">
                {/* Render the CouponList component with coupon data and related functionality */}
                <CouponList hScroll={false} couponsData={coupons} couponsType='HomePageCoupons' user={user} refetchHomePageCoupons={refetchHomePageCoupons} handleNewChatUserIdUpdate={handleNewChatUserIdUpdate} />
                <p className='homepage-search-coupons-text'>✮...Search for more coupons...✮</p>
            </div>
            {/* Render the Footer component */}
            <Footer />
        </div>
    );
}

// Export the HomePage component as the default export
export default HomePage;
