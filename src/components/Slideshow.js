import React, { useEffect, useState } from 'react';
import Slide from './Slide';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { ArrowsPointingOutIcon, XMarkIcon, ArrowsPointingInIcon } from '@heroicons/react/24/outline';

import slides from "../slides";

export default function Slideshow() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(false);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        }
    };

    const enterFullScreen = () => {
        if (!isFullscreen) {
            document.documentElement.requestFullscreen();
        }
    };

    const exitFullScreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                nextSlide();
            } else if (event.key === 'ArrowLeft') {
                prevSlide();
            } else if (event.key === 'Escape') {
                exitFullScreen();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        const handleFullScreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, [currentSlide, isFullscreen]);

    useEffect(() => {
        let timeoutId;

        const handleMouseMove = () => {
            setShowControls(true);

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                setShowControls(false);
            }, 500);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className="relative text-gray-300 flex items-center justify-center h-screen bg-custom-black">
            {/* Barra per entrare in full screen solo se non è già in full screen */}
            {!isFullscreen && showControls && (
                <div className="absolute bottom-0 w-full p-4 bg-custom-black bg-opacity-50 flex justify-end pr-8">
                    <button onClick={enterFullScreen} className="text-white px-4 py-2 bg-transparent rounded">
                        <ArrowsPointingOutIcon className="h-8 w-8" />
                    </button>
                </div>
            )}

            {/* Barra per uscire dal full screen, appare in alto solo quando siamo in full screen */}
            {isFullscreen && showControls && (
                <div className="absolute top-0 w-full p-4 bg-custom-black bg-opacity-50 flex justify-end pr-8">
                    <button onClick={exitFullScreen} className="text-white px-4 py-2 bg-transparent rounded">
                        <XMarkIcon className="h-8 w-8" />
                    </button>
                </div>
            )}

            {/* Freccia sinistra */}
            {currentSlide > 0 && (
                <button onClick={prevSlide} className="absolute left-4 text-gray-300 h-16 w-16 bg-transparent flex items-center justify-center">
                    <ChevronLeftIcon className="h-8 w-8" />
                </button>
            )}

            {/* Slide */}
            <div className="w-4/5 h-auto bg-custom-gray rounded-lg shadow-2xl flex items-center justify-center" style={{ aspectRatio: '16 / 9', maxWidth: '90vw', maxHeight: '90vh' }}>
                <Slide slide={slides[currentSlide]} length={slides.length} />
            </div>

            {/* Freccia destra */}
            {currentSlide < slides.length - 1 && (
                <button onClick={nextSlide} className="absolute right-4 text-gray-300 h-16 w-16 bg-transparent flex items-center justify-center">
                    <ChevronRightIcon className="h-8 w-8" />
                </button>
            )}
        </div>
    );
}
