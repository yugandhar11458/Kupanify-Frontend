
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './couponDetail.css';
import copyIcon from '../assets/copy.svg';

// Import the config file
import config from '../config';

// Main component for displaying detailed coupon information
function CouponDetail({ coupon, handleCouponDetailCloseClick, couponsType, refetchProfilePageCoupons, user, refetchHomePageCoupons, handleNewChatUserIdUpdate }) {
    // State for handling the image expansion
    const [isImageExpanded, setImageExpanded] = useState(false);
    // State to store fetched coupon details
    const [couponDetails, setCouponDetails] = useState({});

    // Fetch coupon details when component mounts
    useEffect(() => {
        axios.get(`${config.backendIpAddress}/api/coupons/${coupon.id}/`)
            .then(response => setCouponDetails(response.data))
            .catch(error => console.error('Error fetching coupon details:', error));
    }, []);

    // Handler to expand the coupon image
    const handleImageOpenClick = () => {
        setImageExpanded(true);
    };

    // Handler to close the expanded coupon image
    const handleImageCloseClick = () => {
        setImageExpanded(false);
    };

    // Function to copy coupon code to clipboard
    const copyToClipboard = () => {
        const element = document.querySelector('.coupon-code');

        if (element) {
            const textToCopy = element.textContent || element.innerText;

            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => alert('Copied successfully'))
                    .catch((err) => console.error('Unable to copy to clipboard', err));
            }
        }
    };

    // Function to avail a coupon
    const availCoupon = async () => {
        try {
            await axios.post(`${config.backendIpAddress}/api/coupons/${coupon.id}/avail/${user.userId}/`);
            handleCouponDetailCloseClick();
            couponsType === 'HomePageCoupons' ? refetchHomePageCoupons() : refetchProfilePageCoupons();
        } catch (error) {
            console.error('Error availing coupon:', error);
        }
    };

    // Function to avail a coupon and initiate a chat
    const availCouponWithChat = async () => {
        try {
            await axios.get(
                `${config.backendIpAddress}/api/chat/messages/${user.userId}/${coupon.userId}/`
            );
            await handleNewChatUserIdUpdate(coupon.userId);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Function to disavail a coupon
    const disavailCoupon = async () => {
        try {
            await axios.post(`${config.backendIpAddress}/api/coupons/${coupon.id}/disavail/${user.userId}/`);
            handleCouponDetailCloseClick();
            couponsType === 'HomePageCoupons' ? refetchHomePageCoupons() : refetchProfilePageCoupons();
        } catch (error) {
            console.error('Error disavailing coupon:', error);
        }
    };

    // Function to delete a coupon
    const deleteCoupon = async () => {
        try {
            await axios.delete(`${config.backendIpAddress}/api/coupons/${coupon.id}/`);
            handleCouponDetailCloseClick();
            couponsType === 'HomePageCoupons' ? refetchHomePageCoupons() : refetchProfilePageCoupons();
        } catch (error) {
            console.error('Error deleting coupon:', error);
        }
    };

    return (
        <div className="coupon-detail-main overlay">
            <div className='coupon-detail'>
                {/* Display coupon details using couponDetails state */}
                <p className="coupon-title">{couponDetails.companyName}</p>
                <p className="coupon-category">{couponDetails.category}</p>
                <p className="coupon-description">{couponDetails?.description}</p>
                <p className="coupon-expiry">Coupon expires on: <b>{couponDetails?.validityDate}</b></p>

                {/* Display coupon code and image based on coupon type */}
                {couponsType !== 'HomePageCoupons' && (
                    <>
                        {couponDetails.couponCode && (
                            <div className="coupon-code-field">
                                <p className="coupon-code">{couponDetails?.couponCode}</p>
                                <img src={copyIcon} alt="copy" className="coupon-copy-icon" onClick={copyToClipboard} />
                            </div>
                        )}

                        {couponDetails.screenshots && (
                            <img
                                src={`${config.backendIpAddress}${couponDetails?.screenshots}`}
                                alt="Coupon details img"
                                className="coupon-image"
                                onClick={handleImageOpenClick}
                            />
                        )}
                    </>
                )}

                {/* Display expanded image when isImageExpanded is true */}
                {isImageExpanded && (
                    <div className="overlay">
                        <img src={`${config.backendIpAddress}${couponDetails?.screenshots}`}
                            alt="Expanded Image"
                            className="coupon-expanded-image" />
                        <span className="close-btn" onClick={handleImageCloseClick}>&times;</span>
                    </div>
                )}

                {/* Display coupon action buttons based on coupon type */}
                <div className="coupon-btns">
                    <button className="coupon-cancel" onClick={handleCouponDetailCloseClick}>Cancel</button>

                    {(couponsType === 'HomePageCoupons') && (
                        (couponDetails.directUpload === true) ? (
                            <button className="coupon-avail" onClick={availCoupon}>Avail</button>
                        ) : (
                            <Link to="/chat" style={{ textDecoration: 'none', color: 'inherit' }} onClick={availCouponWithChat}><button className="coupon-avail">Chat</button></Link>
                        )
                    )}

                    {(couponsType === 'AvailedCoupons') && (
                        <button className="coupon-avail" onClick={disavailCoupon}>Disavail</button>
                    )}

                    {(couponsType === 'UploadedCoupons') && (
                        <button className="coupon-avail" onClick={deleteCoupon}>Delete</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CouponDetail;
