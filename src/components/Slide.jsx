import React from 'react';

function Slide({ content }) {
    return (
        <div className="text-center p-8 transition-all duration-500 ease-in-out transform">
            {content}
        </div>
    );
}

export default Slide;
