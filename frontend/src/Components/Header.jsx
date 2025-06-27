import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Header = ({ set }) => {
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();
    const toggleProfile = () => {
        setShowProfile(prev => !prev);
    };

    return (
        <div className="relative">
            <div className="border-b flex justify-between px-10 py-4">
                <Link to="/home">
                    <div className="flex justify-center text-2xl font-bold inline">
                        Krishi <div className="flex px-2 text-lime-600">सखा</div>
                    </div>
                </Link>
                <div className="flex items-center">
                    <Link to="/doc">
                        <button
                            type="button"
                            className={`mr-4 ${set === "new" ? "" : "hidden"} text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center`}
                        >
                            Guidance for Crops
                        </button>
                    </Link>
                    <Link to="/new">
                        <button
                            type="button"
                            className={`mr-4 ${set === "new" ? "hidden" : ""} text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center`}
                        >
                            Recommended Fertilizers
                        </button>
                    </Link>
                    <Link to="/history">
                        <button
                            type="button"
                            className="mr-4 text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                        >
                            History
                        </button>
                    </Link>
                    <div className="hover:cursor-pointer	" onClick={toggleProfile}>
                        <Avatar src="/avatar.jpg" size="medium" />
                    </div>
                </div>
            </div>
            {showProfile && (
                <div className="absolute top-16 right-10 z-10 max-w-xs">
                    <div className="bg-white shadow-xl rounded-lg py-3">
                        <div className="photo-wrapper p-2">
                            <img
                                className="w-32 h-32 rounded-full mx-auto"
                                src="/avatar.jpg"
                                alt="John Doe"
                            />
                        </div>
                        <div className="p-2">
                            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">John Doe</h3>
                            <div className="text-center text-gray-400 text-xs font-semibold">
                                <p>Farmer</p>
                            </div>
                            <table className="text-xs my-3">
                                <tbody>
                                    <tr>
                                        <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                                        <td className="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                        <td className="px-2 py-2">+977 9955221114</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                        <td className="px-2 py-2">john@example.com</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center my-3">
                                <button
                                    className="text-lg text-green-800 hover:underline hover:text-green-900 font-medium bg-transparent border-none cursor-pointer"
                                    onClick={() => {
                                        localStorage.clear();
                                        navigate("/signin");
                                    }}
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export function Avatar({ src, size }) {
    return (
        <div
            className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-11 h-11"}`}
        >
            <img
                src={src}
                alt="Avatar"
                className="object-cover w-full h-full rounded-full"
            />
        </div>
    );
}
