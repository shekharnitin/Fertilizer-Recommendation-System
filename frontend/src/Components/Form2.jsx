import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const FormA = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const resp = await axios.post("http://localhost:8080/api/v1/user/signin", {
                phone: username,
                password,
            });
            
            console.log(resp.data);
            localStorage.setItem("token", resp.data.token);
            localStorage.setItem("user", resp.data.user);
            navigate("/home");
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="bg-white py-10 px-12 rounded-3xl drop-shadow-lg">
                    <div className="px-10">
                        <div className="text-3xl font-extrabold text-center">
                            Welcome Back
                        </div>
                        <div className="text-slate-500 text-center">
                            Don't have an account?
                            <Link to={"/signup"} className="pl-2 underline">Create</Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        <Input
                            label={"Phone Number"}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={"1234567890"}
                        />
                        <Input
                            label={"Password"}
                            type={'password'}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={"*sh17*"}
                        />
                        {error && (
                            <div className="text-red-500 text-sm mt-2">
                                {error}
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={handleSignIn}
                            className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Input({ label, placeholder, onChange, type = "text" }) {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold text-black pt-4">
                {label}
            </label>
            <input
                type={type}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
