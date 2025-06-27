import React, { useState } from 'react';
import axios from 'axios';

const cropList = [
    'Watermelon', 'Sugarcane', 'Lentil', 'MothBeans', 'Tur',
    'Groundnut', 'Wheat', 'Coconut', 'Cotton', 'Mango', 'Jowar',
    'Moong', 'Rice', 'KidneyBeans', 'ChickPea', 'Masoor', 'Jute',
    'Maize', 'Turmeric', 'Coffee', 'Pomegranate', 'Apple',
    'PigeonPeas', 'Muskmelon', 'Orange', 'Urad', 'Grapes', 'Soybean',
    'Gram', 'Banana', 'Blackgram', 'MungBean', 'Papaya', 'Ginger',
    'Ground Nuts', 'Millets', 'Barley', 'Tobacco', 'Paddy',
    'Oil seeds', 'Pulses'
];

function Input({ label, name, placeholder, className, value, onChange }) {
    return (
        <div className={className}>
            <label className="block mb-1 text-lg font-semibold text-black pt-3">{label}</label>
            <input
                name={name}
                value={value}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}

export const Newform = ({ onSubmitData }) => {
    const [formValues, setFormValues] = useState({
        N: '',
        P: '',
        K: '',
        pH: '',
        Rain: '',
        Temp: '',
        Humid: '',
        Crop: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleClick = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post('http://localhost:8080/api/v1/recommendation', formValues);
            if (onSubmitData) {
                onSubmitData(response.data); 
            }
            console.log(response.data);
        } catch (error) {
            console.error('Error making request:', error);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-white p-6 w-full max-w-3xl rounded-2xl drop-shadow-lg">
                <h2 className="font-bold text-2xl mb-4 text-center">Fertilizer Recommendation for Crops</h2>
                <form onSubmit={handleClick} className="space-y-4">
                    <div>
                        <label className="block text-lg font-semibold text-black mr-4 pb-1">Crop Type</label>
                        <select
                            name="Crop"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            value={formValues.Crop}
                            onChange={handleChange}
                        >
                            <option value="">Select Crop</option>
                            {cropList.map((crop, index) => (
                                <option key={index} value={crop}>
                                    {crop}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-between">
                        <Input label="Soil Nitrogen (kg/ha)" name="N" value={formValues.N} onChange={handleChange} placeholder="*Value" className="w-[48%]" />
                        <Input label="Soil Phosphorus (kg/ha)" name="P" value={formValues.P} onChange={handleChange} placeholder="*Value" className="w-[48%]" />
                    </div>

                    <div className="flex justify-between">
                        <Input label="Soil Potassium (kg/ha)" name="K" value={formValues.K} onChange={handleChange} placeholder="*Value" className="w-[48%]" />
                        <Input label="Soil pH" name="pH" value={formValues.pH} onChange={handleChange} placeholder="*Value" className="w-[48%]" />
                    </div>

                    <div className="flex justify-between">
                        <Input label="Humidity (%)" name="Humid" value={formValues.Humid} onChange={handleChange} placeholder="*Value" className="w-[30%]" />
                        <Input label="Rainfall (mm/month)" name="Rain" value={formValues.Rain} onChange={handleChange} placeholder="*Value" className="w-[30%]" />
                        <Input label="Temperature (°C)" name="Temp" value={formValues.Temp} onChange={handleChange} placeholder="*Value" className="w-[30%]" />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-green-500 text-white text-xl border-none rounded-lg mt-2 w-60"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
