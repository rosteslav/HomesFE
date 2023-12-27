import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ImageScroll.css';

const ImageScroll = ({ images: img, propertyId }) => {
    const [images, setImages] = useState([]);
    const [startIndex, setStartIndex] = useState();
    const [endIndex, setEndIndex] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transition, setTransition] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTransition(true);
    }, [currentIndex]);

    useEffect(() => {
        if (img.length > 0) {
            setImages(img);
        } else {
            setImages(['src/assets/images/noImage.jpg']);
        }
    }, [img]);

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

            setCurrentIndex(
                (prevCurrIndex) => (prevCurrIndex - direction + images.length) % images.length
            );
            setTransition(true);
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
        setTransition(true);
    };

    const navigationHandler = (ev) => {
        if (ev.target.tagName !== 'BUTTON') {
            navigate(`/${propertyId}`);
        }
    };

    return (
        <>
            <div
                className={`container relative h-64 w-full ${
                    propertyId ? 'cursor-pointer' : ''
                } overflow-hidden`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={propertyId ? navigationHandler : undefined}
            >
                <div className='relative flex h-64 w-full overflow-hidden'>
                    {images.length > 0 &&
                        images.map((i) => {
                            return (
                                <div key={i} className='w-full flex-shrink-0 flex-grow'>
                                    <img
                                        className='h-full w-full  object-cover'
                                        src={i}
                                        alt={`Image ${i + 1}`}
                                        style={{
                                            transform: `translateX(${-currentIndex * 100}%)`,
                                            transition: transition
                                                ? 'transform 0.5s ease-in-out'
                                                : 'none',
                                        }}
                                        loading='lazy'
                                    />
                                </div>
                            );
                        })}
                    {images.length > 1 && (
                        <>
                            <div className='card-buttons action-buttons absolute top-1/2 z-50 flex  w-full items-center justify-between px-7'>
                                <button
                                    onClick={handleOnClick}
                                    className='h-10 w-10 rounded-full bg-white'
                                >
                                    &lt;
                                </button>
                                <button
                                    onClick={handleOnClick}
                                    className='h-10 w-10 rounded-full bg-white'
                                >
                                    &gt;
                                </button>
                            </div>

                            <div className='card-buttons absolute bottom-4 z-50 flex w-full justify-center'>
                                {images.map((_, inx) => {
                                    return (
                                        <button
                                            key={inx}
                                            aria-label='Следваща снимка'
                                            onClick={() => setCurrentIndex(inx)}
                                            className={`m-1 h-4 w-4 cursor-pointer rounded-full  ${
                                                currentIndex === inx ? 'bg-white' : 'bg-black'
                                            }`}
                                        ></button>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ImageScroll;
