
import { useState } from 'react';
import './coupon.css';
import Beauty from '../assets/beauty.png';
import Electronics from '../assets/electronics.png';
import Entertainment from '../assets/entertainment.png';
import Fashion from '../assets/fashion.png';
import Food from '../assets/food.png';
import Health from '../assets/health.png';
import Appliances from '../assets/appliances.png';
import Travel from '../assets/travel.png';
import Others from '../assets/others.png';

import CouponDetail from './CouponDetail';

// Map category strings to corresponding image paths
const categoryImageMap = {
  Beauty,
  Electronics,
  Entertainment,
  Fashion,
  Food,
  Health,
  Appliances,
  Travel,
  Others,
};

function Coupon({
  coupon,
  couponsType,
  refetchProfilePageCoupons,
  user,
  refetchHomePageCoupons,
  handleNewChatUserIdUpdate,
}) {
  // State to track whether the coupon is in detail mode
  const [isCouponInDetailMode, setIsCouponInDetailMode] = useState(false);

  // Function to handle opening the coupon details
  const handleCouponDetailOpenClick = () => {
    setIsCouponInDetailMode(true);
  };

  // Function to handle closing the coupon details
  const handleCouponDetailCloseClick = () => {
    setIsCouponInDetailMode(false);
  };

  return (
    <>
      {/* Coupon container with click event to open details */}
      <div className='coupon' onClick={handleCouponDetailOpenClick}>
        <div className="coupon-info-1">
          {/* Displaying company name and category */}
          <div className="coupon-title-and-category">
            <p className="coupon-title">{coupon.companyName}</p>
            <p className="coupon-category">{coupon.category}</p>
          </div>
          {/* Displaying category icon */}
          <img src={categoryImageMap[coupon.category]} alt="icon" className="coupon-icon" />
        </div>
        {/* Displaying coupon description */}
        <div className="coupon-info-2">
          <p className="coupon-description">{coupon.description}</p>
        </div>
      </div>
      {/* Conditionally rendering CouponDetail component when in detail mode */}
      {isCouponInDetailMode && (
        <CouponDetail
          coupon={coupon}
          handleCouponDetailCloseClick={handleCouponDetailCloseClick}
          couponsType={couponsType}
          refetchProfilePageCoupons={refetchProfilePageCoupons}
          user={user}
          refetchHomePageCoupons={refetchHomePageCoupons}
          handleNewChatUserIdUpdate={handleNewChatUserIdUpdate}
        />
      )}
    </>
  );
}

export default Coupon;
