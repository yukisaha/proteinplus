import React,{useState} from 'react';
import '../../styles/product/css/Review.scoped.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Review ({reviewOpen, closeReview, reviews}){
    const [showOnlyPhoto, setShowOnlyPhoto] = useState(false);
    const [expandedReview, setExpandedReview] = useState([]);
    const [sortOption, setSortOption] = useState('latest');

    const handleClose = () => {
        closeReview();
    };

    const handleToggleExpand = (index) => {
        if (expandedReview.includes(index)) {
            setExpandedReview(expandedReview.filter(i => i !== index));
        } else {
            setExpandedReview([...expandedReview, index]);
        }
    };

    const filterReviews = () => {
        if (showOnlyPhoto) {
            return reviews.filter(review => review.reviewImageUrl);
        } else {
            return reviews;
        }
    };

    const getReviewCount = () => {
        if (showOnlyPhoto) {
            return reviews.filter(review => review.reviewImageUrl).length;
        } else {
            return reviews.length;
        }
    };

    const reviewCount = getReviewCount();
    const filteredReviews = filterReviews();

    const renderStars = (rating) => {
        const yellowStars = Math.floor(rating);
        const grayStars = 5 - yellowStars;
        const stars = [];
        for (let i = 0; i < yellowStars; i++) {
            stars.push(<FontAwesomeIcon icon={faStar} key={i} className="yellow-star" />);
        }
        for (let i = 0; i < grayStars; i++) {
            stars.push(<FontAwesomeIcon icon={faStar} key={i + yellowStars} className="gray-star" />);
        }
        return stars;
    };

    const formatDate = (dateString) => {
        const uploadDate = new Date(dateString);
        return `${uploadDate.getFullYear()}-${(uploadDate.getMonth() + 1).toString().padStart(2, '0')}-${uploadDate.getDate().toString().padStart(2, '0')}`;
    };

    const sortReviews = (reviews) => {
        switch (sortOption) {
            case 'latest':
                return reviews.slice().sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
            case 'highestRated':
                return reviews.slice().sort((a, b) => b.rating - a.rating);
            case 'lowestRated':
                return reviews.slice().sort((a, b) => a.rating - b.rating);
            default:
                return reviews;
        }
    };
    const sortedReviews = sortReviews(filteredReviews);

    return (
        <div className={`review-modal-container ${reviewOpen ? 'open' : ''}`}>
            <h3 className="review-title">리뷰
                <span className="review-count">({reviewCount}건)</span>
                <span className="photo-review-checkbox">
                    <input
                        type="checkbox"
                        id="photoReviewCheckbox"
                        checked={showOnlyPhoto}
                        onChange={() => setShowOnlyPhoto(!showOnlyPhoto)}
                    />
                    <label htmlFor="photoReviewCheckbox">포토리뷰만 보기</label>
                </span>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="latest">최신순</option>
                    <option value="highestRated">평점 높은 순</option>
                    <option value="lowestRated">평점 낮은 순</option>
                </select>
            </h3>
            <button className="review-close" onClick={handleClose}>&times;</button>
            <div className="review-list">
                {sortedReviews.length === 0 ? (
                    <p className="no-review">리뷰가 없습니다.</p>
                ) : (
                    sortedReviews.map((review, index) => (
                        <div key={index} className={`review-item ${expandedReview.includes(index) ? 'expanded' : ''}`}>
                            <span className="star">{renderStars(review.rating)}</span>
                            <span> 작성일: {formatDate(review.uploadDate)}</span>
                            <div className="review-content-container">
                                {review.reviewImageUrl && (
                                    <img src={review.reviewImageUrl} alt="포토리뷰" className={`review-image ${expandedReview.includes(index) ? 'expanded' : ''}`} />
                                )}
                                <p className={`review-content ${expandedReview.includes(index) ? 'expanded' : ''}`}>
                                     {expandedReview.includes(index) ? review.content : (review.content.length > 5 ? review.content.substring(0, 5) + '...' : review.content)}
                                </p>
                                {(review.reviewImageUrl || review.content.length > 5) && (
                                    <button className="expand-review-btn" onClick={() => handleToggleExpand(index)}>
                                        {expandedReview.includes(index) ? (
                                        <>
                                            <span className="up-text">접기</span>
                                            <FontAwesomeIcon icon={faChevronUp} />
                                        </>
                                        ) : (
                                        <>
                                            <span className="down-text">펼쳐보기</span>
                                            <FontAwesomeIcon icon={faChevronDown} />
                                        </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Review;