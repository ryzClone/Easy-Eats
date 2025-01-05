import React from 'react';
import '../style/Error.css';

export default function Error() {
    const navigateToHome = () => {
        window.location.href = '/'; // Asosiy sahifaga yo'naltirish
    };

    return (
        <div className="error-container">
            <div className="error-message">
                <h2 className="error-title">Something Went Wrong</h2>
                <p className="error-description">We couldn't process your request. Please try again later.</p>
                <button className="error-btn" onClick={navigateToHome}>Go to Home</button>
            </div>
        </div>
    );
}
