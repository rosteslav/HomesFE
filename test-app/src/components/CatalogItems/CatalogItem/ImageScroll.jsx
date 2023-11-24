import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ImageScroll.css';

const ImageScroll = ({ images, propertyId }) => {
    const [startIndex, setStartIndex] = useState();
    const [endIndex, setEndIndex] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleTouchStart = (e) => {
        setEndIndex('');
        setStartIndex(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setEndIndex(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (endIndex) {
            const direction = Math.sign(endIndex - startIndex);
            console.log(direction);
            setCurrentIndex(
                (prevCurrIndex) => (prevCurrIndex - direction + images.length) % images.length
            );
        }
    };

    const handleOnClick = (ev) => {
        let direction = 0;
        if (ev.target.textContent === '>') {
            direction = 1;
        } else {
            direction = -1;
        }
        if (direction === 1) {
            if (currentIndex === images.length - 1) {
                setCurrentIndex(0);
            } else {
                setCurrentIndex((prevCurrIndex) => prevCurrIndex + 1);
            }
        } else {
            if (currentIndex === 0) {
                setCurrentIndex(images.length - 1);
            } else {
                setCurrentIndex((prevCurrIndex) => prevCurrIndex - 1);
            }
        }
    };

    const navigationHandler = (ev) => {
        if (ev.target.tagName !== 'BUTTON') {
            navigate(`/${propertyId}`);
        }
    };

    return (
        <div
            className='container relative h-64 w-full cursor-pointer overflow-hidden'
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={navigationHandler}
        >
            <div className='relative flex h-full overflow-hidden'>
                <img
                    className='flex-1 object-cover'
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                />
                <div className='card-buttons action-buttons absolute flex h-full w-full items-center justify-between px-7'>
                    <button onClick={handleOnClick} className='h-10 w-10 rounded-full bg-white'>
                        &lt;
                    </button>
                    <button onClick={handleOnClick} className='h-10 w-10 rounded-full bg-white'>
                        &gt;
                    </button>
                </div>

                <div className='card-buttons absolute bottom-4 flex w-full justify-center'>
                    {images.map((_, inx) => {
                        return (
                            <button
                                key={inx}
                                onClick={() => setCurrentIndex(inx)}
                                className={`m-1 h-4 w-4 cursor-pointer rounded-full  ${
                                    currentIndex === inx ? 'bg-white' : 'bg-black'
                                }`}
                            ></button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ImageScroll;
