import React, { useState } from 'react';
import axios from 'axios';
import config from '../Config';
import './loginCard.css';

function LoginCard({ setIsLoginCardOpened, setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        
        try {
            const userDataResponse = await axios.get(`${config.backendIpAddress}/api/user-profile/login/${email}/${password}/`);
            
            if (userDataResponse.status === 200) {
                // Login successful
                console.log("Login successful!");
                
                setUser({
                    userId: userDataResponse.data.userId,
                    userName: userDataResponse.data.userName,
                    userProfileImage: userDataResponse.data.userImage,
                });


                setIsLoginCardOpened(false);
            } else {
                console.log("Login failed. Please try again.");
            }
        } catch (error) {
            if (error.response && (error.response.status === 404 || error.response.status === 401)) {
                alert("Invalid email or password. Please try again.");
            } else {
                console.log(error);
                console.log("An error occurred during login. Please try again.");
            }
        }
    };

    return (
        <div className="login-form-main overlay">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                
                <div className="login-btns">
                    <button className="login-cancel" type="button" onClick={() => setIsLoginCardOpened(false)}>Cancel</button>
                    <button className="login-submit" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default LoginCard;
