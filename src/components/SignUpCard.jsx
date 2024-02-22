import React, { useState } from 'react';
import axios from 'axios';
import './signUpCard.css';
import config from '../Config';

function SignUpCard({ setIsSignUpCardOpened, setUser }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match");
            return;
        }

        const formData = new FormData();
        formData.append('userName', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('userImage', profileImage);

        try {
            const response = await axios.post(`${config.backendIpAddress}/api/user-profiles/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                const userDataResponse = await axios.get(`${config.backendIpAddress}/api/user-profile/${email}/`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log(userDataResponse.data);

                if (userDataResponse.status === 200) {
                    setUser({
                        userId: userDataResponse.data.userId,
                        userName: userDataResponse.data.userName,
                        userProfileImage: userDataResponse.data.userImage,
                    });

                    setName('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setProfileImage(null);

                    setIsSignUpCardOpened(false);
                } else {
                    alert("Unable to fetch user data. Please try again.");
                }
            } else {
                alert("Failed to create user profile. Please try again.");
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("This email is already used. Login or use another email address");
            } else {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="signup-form-main overlay">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>SignUp</h2>
                <label htmlFor="username">Name:</label>
                <input type="text" id="username" name="name" required value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="confirm_password">Confirm Password:</label>
                <input type="password" id="confirm_password" name="confirm_password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <label htmlFor="user_image">Profile Image:</label>
                <input type="file" id="user_image" name="profile_image" accept="image/*" required onChange={(e) => setProfileImage(e.target.files[0])} />

                <div className="signup-btns">
                    <button className="signup-cancel" type="button" onClick={() => setIsSignUpCardOpened(false)}>Cancel</button>
                    <button className="signup-submit" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default SignUpCard;
