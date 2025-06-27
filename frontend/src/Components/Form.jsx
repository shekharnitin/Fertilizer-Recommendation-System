import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
const stateCityData = {
    "Andhra Pradesh": [
        "Visakhapatnam", "Vijayawada", "Guntur", "Kakinada", "Tirupati",
        "Nellore", "Rajahmundry", "Anantapur", "Chittoor", "Srikakulam",
        "Kurnool", "Ongole", "Eluru", "Bhimavaram", "Machilipatnam",
        "Kadapa", "Proddatur", "Jammalamadugu", "Narsapur", "Peddaganjam",
        "Bapatla", "Puttur"
    ],
    "Assam": [
        "Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon",
        "Tezpur", "Bongaigaon", "Karimganj", "Haflong", "Kokrajhar",
        "Sivasagar", "Dhemaji", "Barpeta", "Golaghat", "Mangaldoi",
        "Jorhat", "Dibrugarh", "Tinsukia", "Lakhimpur", "Nalbari",
        "Sonitpur", "Kamrup"
    ],
    "Bihar": [
        "Patna", "Gaya", "Bhagalpur", "Munger", "Muzaffarpur",
        "Purnia", "Darbhanga", "Sasaram", "Arrah", "Katihar",
        "Begusarai", "Chhapra", "Samastipur", "Sitamarhi", "Motihari",
        "Khagaria", "Nalanda", "Jehanabad", "Vaishali", "Supaul",
        "Bettiah", "Buxar"
    ],
    "Gujarat": [
        "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar",
        "Bhavnagar", "Junagadh", "Anand", "Nadiad", "Navsari",
        "Dahod", "Mehsana", "Gondal", "Veraval", "Porbandar",
        "Upleta", "Vapi", "Valsad", "Palanpur", "Himmatnagar",
        "Amreli", "Sihor"
    ],
    "Karnataka": [
        "Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Dharwad",
        "Belagavi", "Shivamogga", "Tumkur", "Bagalkot", "Chikkamagalur",
        "Kolar", "Hassan", "Raichur", "Bidar", "Ballari",
        "Karwar", "Gadag", "Chitradurga", "Haveri", "Yadgir",
        "Mandya", "Bijapur"
    ],
    "Maharashtra": [
        "Mumbai", "Pune", "Nagpur", "Aurangabad", "Nashik",
        "Thane", "Kalyan", "Solapur", "Jalgaon", "Kolhapur",
        "Amravati", "Malegaon", "Chandrapur", "Ratnagiri", "Satara",
        "Bhiwandi", "Sangli", "Latur", "Washim", "Wardha",
        "Parbhani", "Akola"
    ],
    "Punjab": [
        "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Mohali",
        "Bathinda", "Ferozepur", "Moga", "Hoshiarpur", "Kapurthala",
        "Sri Muktsar Sahib", "Rupnagar", "Nawanshahr", "Faridkot", "Fatehgarh Sahib",
        "Zirakpur", "Rajpura", "Malerkotla", "Abohar", "Sangrur",
        "Barnala", "Jagraon"
    ],
    "Rajasthan": [
        "Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer",
        "Bikaner", "Bhilwara", "Sikar", "Alwar", "Tonk",
        "Pali", "Nagaur", "Jhunjhunu", "Barmer", "Sawai Madhopur",
        "Churu", "Dungarpur", "Jaisalmer", "Hanumangarh", "Ratangarh",
        "Jalore", "Banswara"
    ],
    "Tamil Nadu": [
        "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
        "Tirunelveli", "Erode", "Vellore", "Tiruppur", "Dindigul",
        "Nagercoil", "Kanchipuram", "Chengalpattu", "Cuddalore", "Dharmapuri",
        "Karur", "Kumbakonam", "Sivakasi", "Ramanathapuram", "Sankarankoil",
        "Thanjavur", "Pudukkottai"
    ],
    "Uttar Pradesh": [
        "Lucknow", "Kanpur", "Varanasi", "Agra", "Ghaziabad",
        "Meerut", "Bareilly", "Aligarh", "Moradabad", "Jaunpur",
        "Saharanpur", "Muzaffarnagar", "Firozabad", "Shahjahanpur", "Rampur",
        "Etawah", "Budaun", "Unnao", "Sitapur", "Ballia",
        "Azamgarh", "Lalitpur"
    ],
    "West Bengal": [
        "Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri",
        "Kharagpur", "Jalpaiguri", "Haldia", "Midnapore", "Bardhaman",
        "Berhampore", "Malda", "Cooch Behar", "Kaliyaganj", "Suri",
        "Kolkata", "Bankura", "Purulia", "Jhargram", "Alipurduar",
        "Nadia", "Hooghly"
    ],
};
export const Form = () => {
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setCities(stateCityData[state] || []);
        setSelectedCity(''); // Reset city selection when state changes
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const resp = await axios.post("http://localhost:8080/api/v1/user/signup", {
                name,
                phone,
                state: selectedState,
                city: selectedCity,
                password,
            });

            localStorage.setItem("token", resp.data.token);
            localStorage.setItem("user", resp.data.user);
            navigate("/home");
        } catch (error) {
            console.error("Sign up failed", error);
            // Add any error handling logic you need here
        }
    };

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="bg-white py-10 px-12 rounded-3xl drop-shadow-lg">
                    <div className="px-10">
                        <div className="text-3xl font-extrabold text-center">
                            Create an account
                        </div>
                        <div className="text-slate-500 text-center">
                            Already have an account?
                            <Link to={"/signin"} className="pl-2 underline">Log In</Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        <Input
                            label={"Name"}
                            placeholder={"Rohil"}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            label={"Phone Number"}
                            placeholder={"1234567890"}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <label className="block text-sm font-semibold text-black mb-2 pt-4">State</label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Select State"
                            required
                            value={selectedState}
                            onChange={handleStateChange}
                        >
                            <option value="">Select State</option>
                            {Object.keys(stateCityData).map((state, index) => (
                                <option key={index} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                        <label className="block text-sm font-semibold text-black mb-2 pt-4">City</label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Select City"
                            required
                            value={selectedCity}
                            onChange={handleCityChange}
                            disabled={!selectedState}
                        >
                            <option value="">Select City</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>

                        <Input
                            label={"Password"}
                            type={'password'}
                            placeholder={"*sh17*"}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                        >
                            Sign Up
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