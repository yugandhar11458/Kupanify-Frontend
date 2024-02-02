
// Importing the necessary styles for the login page
import './loginPage.css';

// Importing images for the login page
import couponSharing from '../assets/coupon-sharing.png';
import logo from '../assets/logo.png';

// Functional component for the login page
function LoginPage({ handleSignInWithGoogle }) {
    return (
        // Overall container for the login page
        <div className='loginpage'>
            {/* Left section containing an image */}
            <div className="loginpage-left">
                <img src={couponSharing} alt="" className="coupon-sharing-img" />
            </div>

            {/* Right section containing logo, quotes, and login button */}
            <div className="loginpage-right">
                {/* Logo for the application */}
                <img src={logo} alt="" className="kupanify-logo" />

                {/* Main heading for the login page */}
                <h2 className="loginpage-main-quote">Elevate Your Savings Game!</h2>

                {/* Subheading providing additional information */}
                <p className="loginpage-sub-quote">Share the joy of savings! Your coupon could be someone's reason to smile.</p>

                {/* Button triggering the Google login functionality */}
                <button onClick={handleSignInWithGoogle} className="login-btn">Login with Google</button>
            </div>
        </div>
    );
}

// Exporting the LoginPage component as the default export
export default LoginPage;
