import React, {useEffect, useState} from 'react';
import Slide from './Slide';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'; // Correggiamo l'importazione per Heroicons v2

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
        <div className="relative flex items-center justify-center h-screen bg-blue-200">
            {/* Freccia sinistra */}
            {currentSlide > 0 && (
                <button
                    onClick={prevSlide}
                    className="absolute left-4 h-16 w-16 bg-transparent flex items-center justify-center"
                >
                    <ChevronLeftIcon className="h-8 w-8" />
                </button>
            )}

            {/* Slide */}
            <div className="w-4/5 h-4/5 bg-white rounded-lg shadow-2xl flex items-center justify-center">
                <Slide content={slides[currentSlide].content} />
            </div>

            {/* Freccia destra */}
            {currentSlide < slides.length - 1 && (
                <button
                    onClick={nextSlide}
                    className="absolute right-4 h-16 w-16 bg-transparent flex items-center justify-center"
                >
                    <ChevronRightIcon className="h-8 w-8" />
                </button>
            )}
        </div>
    );
}

export default Slideshow;
