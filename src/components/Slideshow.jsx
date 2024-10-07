import React, { useState } from 'react';
import Slide from './Slide'; // Crea anche questo file dopo

const slides = [
    { id: 1, content: <h1>Welcome to my presentation!</h1> },
    { id: 2, content: <h2>React is amazing</h2> },
    { id: 3, content: <h3>Let's create something cool!</h3> },
];

function Slideshow() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div>
            <Slide content={slides[currentSlide].content} />
            <button onClick={prevSlide}>Previous</button>
            <button onClick={nextSlide}>Next</button>
        </div>
    );
}

export default Slideshow;
