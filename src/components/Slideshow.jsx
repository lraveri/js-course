import React, {useEffect, useState} from 'react';
import Slide from './Slide';

const slides = [
    { id: 1, content: <h1 className="text-4xl font-bold text-blue-700">Welcome to my presentation!</h1> },
    { id: 2, content: <h2 className="text-3xl font-semibold text-green-600">React is amazing</h2> },
    { id: 3, content: <h3 className="text-3xl font-semibold text-red-500">Let's create something cool!</h3> },
];

function Slideshow() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if(currentSlide < slides.length -1) {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }
    };

    const prevSlide = () => {
        if(currentSlide > 0) {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                nextSlide();
            } else if (event.key === 'ArrowLeft') {
                prevSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentSlide]);

    return (
        <div className="relative flex items-center justify-center h-screen bg-gray-100">
            {currentSlide > 0 && (
                <button
                    onClick={prevSlide}
                    className="absolute left-4 text-3xl text-gray-600 hover:text-gray-800 transition-transform"
                >
                    &#8592;
                </button>
            )}

            <div className="w-full max-w-2xl p-10 bg-white rounded-lg shadow-lg">
                <Slide content={slides[currentSlide].content} />
            </div>

            {currentSlide < slides.length - 1 && (
                <button
                    onClick={nextSlide}
                    className="absolute right-4 text-3xl text-gray-600 hover:text-gray-800 transition-transform"
                >
                    &#8594;
                </button>
            )}
        </div>
    );
}

export default Slideshow;
