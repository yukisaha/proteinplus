import React from 'react';
import '../../styles/product/css/Review.scoped.css';

function Review ({reviewOpen, closeReview}){
    const handleClose = () => {
        closeReview();
      };

      return (
        <div className={`review-modal-container ${reviewOpen ? 'open' : ''}`}>
        <h4>리뷰</h4>
          <button className="review-close" onClick={handleClose}>&times;</button>
        </div>
      );
};

export default Review;