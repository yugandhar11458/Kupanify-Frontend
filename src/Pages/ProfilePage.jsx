
// Importing necessary dependencies and components from external sources
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import CouponList from "../components/CouponList";
import Footer from "../components/Footer";
import CouponUploadForm from "../components/CouponUploadForm";
import chatIcon from "../assets/chat.svg";

// Importing the stylesheet for the profile page
import "./profilePage.css";

// Import the config file
import config from '../Config';

// Functional component representing the user's profile page
function ProfilePage({ user, handleSignOut }) {
  // State variables to manage the state of the upload coupon form and coupon data
  const [isUploadCouponFormClicked, setIsUploadCouponFormClicked] =
    useState(false);
  const [availedCoupons, setAvailedCoupons] = useState([]);
  const [uploadedCoupons, setUploadedCoupons] = useState([]);

  // Handler to open the upload coupon form
  const handleUploadCouponFormOpenClick = () => {
    setIsUploadCouponFormClicked(true);
  };

  // Handler to close the upload coupon form
  const handleUploadCouponFormCloseClick = () => {
    setIsUploadCouponFormClicked(false);
  };

  // Effect hook to fetch user's coupon data when the component mounts
  useEffect(() => {
    const apiUrl = `${config.backendIpAddress}/api/user-profile/${user.userId}/`;

    axios
      .get(apiUrl)
      .then((response) => {
        setAvailedCoupons(response.data.availedCoupons);
        setUploadedCoupons(response.data.uploadedCoupons);
      })
      .catch((error) => console.error("Error fetching coupons:", error));
  }, []);

  // Function to refetch user's profile page coupons
  function refetchProfilePageCoupons() {
    const availedApiUrl = `${config.backendIpAddress}/api/user-profile/${user.userId}/`;
    axios
      .get(availedApiUrl)
      .then((response) => {
        setAvailedCoupons(response.data.availedCoupons);
        setUploadedCoupons(response.data.uploadedCoupons);
      })
      .catch((error) => console.error("Error fetching coupons:", error));
  }

  // JSX structure for rendering the profile page
  return (
    <div className="profilepage">
      {/* Navigation bar component */}
      <Navbar showSearchAndCategory={false} user={user} />

      <div className="profile-page-main main-content">
        {/* Section for uploading coupons */}
        <div className="profile-page-upload">
          <p className="profile-page-upload-quote">
            Serve the community by adding the coupons that may be unwanted for
            you...<span>☺️</span>
          </p>
          <button
            className="profile-page-upload-coupon"
            onClick={handleUploadCouponFormOpenClick}
          >
            Upload Coupon ↑
          </button>
        </div>

        {/* Section for displaying availed and uploaded coupons */}
        <div className="profile-page-coupons">
          <p className="profile-page-availed-coupons">Availed Coupons</p>
          <CouponList
            hScroll={true}
            couponsData={availedCoupons}
            couponsType="AvailedCoupons"
            refetchProfilePageCoupons={refetchProfilePageCoupons}
            user={user}
          />
          <p className="profile-page-uploaded-coupons">Uploaded Coupons</p>
          <CouponList
            hScroll={true}
            couponsData={uploadedCoupons}
            couponsType="UploadedCoupons"
            refetchProfilePageCoupons={refetchProfilePageCoupons}
            user={user}
          />
        </div>

        {/* Section for chat and logout buttons */}
        <div className="profile-page-chat-and-logout-btns">
          <Link
            to="/chat"
            style={{ textDecoration: "none", color: "inherit" }}
            className="profile-page-chat-button"
          >
            <p className="chat-btn-text">Chat</p>
            <img src={chatIcon} alt="Chat Icon" className="chat-btn-icon" />
          </Link>
          <Link
            to="/login"
            onClick={handleSignOut}
            style={{ textDecoration: "none", color: "inherit" }}
            className="profile-page-logout-button"
          >
            <p className="logout-btn-text">Logout</p>
          </Link>
        </div>
      </div>

      {/* Footer component */}
      <Footer />

      {/* Render the upload coupon form if the form is clicked */}
      {isUploadCouponFormClicked && (
        <CouponUploadForm
          handleUploadCouponFormCloseClick={handleUploadCouponFormCloseClick}
          refetchProfilePageCoupons={refetchProfilePageCoupons}
          user={user}
        />
      )}
    </div>
  );
}

// Exporting the ProfilePage component as the default export
export default ProfilePage;
