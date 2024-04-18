import '../../styles/home/css/ImageSlide.scoped.css';
import React, { useState, useEffect } from 'react';

function ImageSlide ({images}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const index = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(index);
    }

    const nextSlide = () =>{
        const index = (currentIndex + 1) % images.length;
        setCurrentIndex(index);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % images.length;
            setCurrentIndex(nextIndex);
        }, 7000);
        return () => clearInterval(interval);
    }, [currentIndex, images.length]);

    return (
        <div className="image-slide-container">
            {images.map((image, index)=> (
                <div key={index} className={index === currentIndex ? 'slide-active' : 'slide'}>
                    <img src={image} alt={`Slide ${index}`} />
                </div>
            ))}
            <div className="slide-number">{`${currentIndex + 1}/${images.length}`}</div>
            <button className="prev" onClick={prevSlide}>&#10094;</button>
            <button className="next" onClick={nextSlide}>&#10095;</button>
        </div>
    );
}

export default ImageSlide;