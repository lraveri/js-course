import React from 'react';

export default function Slide({ slide, length }) {
    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-grow text-center p-16 transition-all duration-500 ease-in-out transform">
                {slide.content}
            </div>
            <div className="flex justify-end items-end w-full p-4 mr-2">
                <div className="text-gray-300">
                    {slide.id}/{length}
                </div>
            </div>
        </div>
    );
}
