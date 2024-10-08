import React from 'react';

export default function Slide({ slide, length }) {
    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-grow text-center p-16 transition-all duration-500 ease-in-out transform">
                {slide.content}
            </div>
            <div className="flex justify-end items-end w-full p-4 mr-2">
                <div className="bg-custom-black text-gray-300 p-2 rounded-full">
                    {slide.id}/{length}
                </div>
            </div>
        </div>
    );
}
