import './loginPage.css';
import couponSharing from '../assets/coupon-sharing.png';
import logo from '../assets/logo.png';
import { useState } from 'react';
import LoginCard from '../components/LoginCard';
import SignUpCard from '../components/SignUpCard';


function LoginPage({setUser}) {

    const [isLoginCardOpened, setIsLoginCardOpened] = useState(false);
    const [isSignUpCardOpened, setIsSignUpCardOpened] = useState(false);

    return (
        <div className="main-container">
            <div className='loginpage'>
                <div className="loginpage-left">
                    <img src={couponSharing} alt="" className="coupon-sharing-img" />
                </div>
                <div className="loginpage-right">
                    <img src={logo} alt="" className="kupanify-logo" />
                    <h2 className="loginpage-main-quote">Elevate Your Savings Game!</h2>
                    <p className="loginpage-sub-quote">Share the joy of savings! Your coupon could be someone's reason to smile.</p>
                    <div className="login-singup-btns">
                        <button onClick={() => setIsSignUpCardOpened(true)} className="signup-btn">SignUp</button>
                        <button onClick={() => setIsLoginCardOpened(true)} className="login-btn">Login</button>
                    </div>
                </div>

            </div>
            {isLoginCardOpened && <LoginCard setIsLoginCardOpened={setIsLoginCardOpened} setUser={setUser}/>}
            {isSignUpCardOpened && <SignUpCard setIsSignUpCardOpened={setIsSignUpCardOpened} setUser={setUser}/>}
        </div>

    );
}

export default LoginPage;