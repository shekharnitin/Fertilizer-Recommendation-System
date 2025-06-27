import React, { useState, useEffect } from 'react';

const Init = () => {
    const images = [
        "/home1.jpg", 
        "/home2.png",
        "/home3.png",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
                setFade(false);
            }, 500); 
        }, 2000); 

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="flex items-center justify-center bg-white p-8 rounded-lg max-w-7xl mx-auto">
            <div className="w-1/2 pr-8">
                <h1 className="text-6xl font-bold text-gray-900">KEEP YOUR</h1>
                <h1 className="text-6xl font-bold text-gray-900">CROPS HEALTHY</h1>
                <p className="text-gray-600 text-xl mt-6">
                    Use Only The Trusted Composition Of Fertilizers For Your Crops!
                </p>
                <p className="text-gray-600 text-xl mt-2">
                    For More Information Head Over To The Dashboard Section!
                </p>
                <button className="mt-6 text-xl px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700">
                    Read More
                </button>
            </div>
            <div className="w-1/2 flex items-center justify-center">
                <img
                    src={images[currentIndex]}
                    alt="Farmer in the field"
                    className={`rounded-3xl shadow-lg transition-opacity duration-500 ease-in-out ${fade ? 'opacity-0' : 'opacity-100'}`}
                />
            </div>
        </div>
    );
};

export default Init;
