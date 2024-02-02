
import React, { useState } from 'react';
import axios from 'axios';
import './couponUploadForm.css';

// Import the config file
import config from '../config';

function CouponUploadForm(props) {

  // State to manage form data
  const [formData, setFormData] = useState({
    userId: props.user.userId,
    companyName: '',
    category: '',
    description: '',
    isAvailed: false,
    validityDate: '',
    directUpload: "true",
    couponCode: '',
    screenshots: '',
  });

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let formDataObject;

      // Direct upload case: Use FormData for file upload
      if (formData.directUpload === "true") {
        formDataObject = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataObject.append(key, value);
        });

        // Make Axios POST request for direct upload
        const response = await axios.post(`${config.backendIpAddress}/api/coupons/`, formDataObject, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('API response:', response.data);
      } else if (formData.directUpload === "false") {
        // Chat upload case: Exclude couponCode and screenshots
        formDataObject = {
          userId: formData.userId,
          companyName: formData.companyName,
          category: formData.category,
          description: formData.description,
          isAvailed: formData.isAvailed,
          validityDate: formData.validityDate,
          directUpload: formData.directUpload,
          couponCode: '',
          screenshots: null,
        };

        // Make Axios POST request for chat upload
        const response = await axios.post(`${config.backendIpAddress}/api/coupons/`, formDataObject);
        console.log('API response:', response.data);
      }

      // Close the form and refresh coupons on successful submission
      props.handleUploadCouponFormCloseClick();
      props.refetchProfilePageCoupons();

      // Reset form after successful submission
      setFormData({
        userId: props.user.userId,
        companyName: '',
        category: '',
        description: '',
        isAvailed: false,
        validityDate: '',
        directUpload: "true",
        couponCode: '',
        screenshots: '',
      });
    } catch (error) {
      console.error('API error:', error);
    }
  };

  // Handle input changes in the form
  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    // Update form data based on input type
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  // Handle cancellation of the form
  const handleCancel = () => {
    // Close the form and reset form fields to initial values
    props.handleUploadCouponFormCloseClick();
    setFormData({
      userId: props.user.userId,
      companyName: '',
      category: '',
      description: '',
      isAvailed: false,
      validityDate: '',
      directUpload: "true",
      couponCode: '',
      screenshots: '',
    });
  };

  return (
    <div className="coupon-upload-form-main overlay">
      <form className="coupon-upload-form" onSubmit={handleSubmit}>
        {/* Coupon Product Title */}
        <label>Coupon Product Title</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          required
        />

        {/* Category */}
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value='' disabled>
            Choose a category
          </option>
          <option value='Appliances'>Appliances</option>
          <option value='Beauty'>Beauty</option>
          <option value='Electronics'>Electronics</option>
          <option value='Entertainment'>Entertainment</option>
          <option value='Fashion'>Fashion</option>
          <option value='Food'>Food</option>
          <option value='Health'>Health</option>
          <option value='Travel'>Travel</option>
          <option value='Others'>Others</option>
        </select>

        {/* Coupon Description */}
        <label>Coupon Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        {/* Coupon Expiry Date */}
        <label>Coupon Expiry Date</label>
        <input
          type="date"
          name="validityDate"
          value={formData.validityDate}
          onChange={handleInputChange}
          required
        />

        {/* Upload Type */}
        <label>Upload Type</label>
        <select
          name="directUpload"
          value={formData.directUpload}
          onChange={handleInputChange}
          required
        >
          <option value="true">Direct Upload</option>
          <option value="false">Chat Upload</option>
        </select>

        {/* Conditionally render Coupon Code and Coupon Photos */}
        {formData.directUpload === "true" && (
          <>
            <label>Coupon Code</label>
            <input
              type="text"
              name="couponCode"
              value={formData.couponCode}
              onChange={handleInputChange}
              required
            />

            <label>Coupon Photos</label>
            <input
              type="file"
              accept="image/*"
              name="screenshots"
              onChange={handleInputChange}
            />
          </>
        )}

        {/* Form submission buttons */}
        <div className="coupon-btns">
          {/* Cancel button */}
          <button className="coupon-cancel" type="button" onClick={handleCancel}>Cancel</button>
          {/* Submit button */}
          <button className="coupon-submit" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CouponUploadForm;
