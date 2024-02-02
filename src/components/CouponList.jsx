
// Importing styles for the CouponList component
import './couponList.css';

// Importing the Coupon component
import Coupon from './Coupon';

// Importing the image for no coupons
import noCoupons from '../assets/no-coupons.png';

// CouponList component function definition
function CouponList(props) {
    // Checking if there are coupons data and if it's greater than 0
    const hasCoupons = props.couponsData && props.couponsData.length > 0;

    return (
        // Conditional rendering based on whether there are coupons or not
        <div className={hasCoupons ? "coupon-list" : "no-coupons"}>
            {hasCoupons ? (
                // If there are coupons, render the list of coupons
                <div className={props.hScroll ? "horizontal-scroll" : "list"}>
                    {props.couponsData.map(coupon => (
                        // Render each individual Coupon component
                        <Coupon
                            key={coupon.id}
                            coupon={coupon}
                            couponsType={props.couponsType}
                            refetchProfilePageCoupons={props.refetchProfilePageCoupons}
                            user={props.user}
                            refetchHomePageCoupons={props.refetchHomePageCoupons}
                            handleNewChatUserIdUpdate={props.handleNewChatUserIdUpdate}
                        />
                    ))}
                </div>
            ) : (
                // If there are no coupons, render a message with an image
                <div className='no-coupons-main-content'>
                    <img src={noCoupons} alt='No coupons' className='no-coupons-img' />
                    <p className='no-coupons-text'>No Coupons</p>
                </div>
            )}
        </div>
    );
}

// Exporting the CouponList component as the default export
export default CouponList;
