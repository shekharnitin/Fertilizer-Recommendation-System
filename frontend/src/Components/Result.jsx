import React from 'react';

const A = [
    'Urea', 'DAP', 'Chilated Micronutrient', '19:19:19 NPK', 'MOP',
    'SSP', '10:26:26 NPK', 'Magnesium Sulphate', '12:32:16 NPK',
    '13:32:26 NPK', 'Ferrous Sulphate', '50:26:26 NPK', 'White Potash',
    '10:10:10 NPK', '20:20:20 NPK', 'Ammonium Sulphate', '14-35-14',
    '20-20', '18:46:00 NPK', 'Hydrated Lime', '10-26-26', '17-17-17',
    'Sulphur', '28-28'
];

export const Result = ({ data }) => {
    if (!Array.isArray(data) || data.length !== A.length) {
        return (
            <div className="h-full flex justify-center items-center bg-white p-4">
                <div>
                    <h2 className="text-4xl font-bold my-4">Result:</h2>
                    <p className='text-2xl my-4'>No valid data available</p>
                </div>
            </div>
        );
    }

    const pairedData = A.map((fertilizer, index) => ({
        fertilizer,
        value: data[index]
    }));

    // Sort paired data based on values in descending order
    const sortedData = pairedData.sort((a, b) => b.value - a.value);

    // Extract top 3 fertilizers
    const top3Fertilizers = sortedData.slice(0, 3).map(item => item.fertilizer);

    return (
        <div className="h-full flex justify-center items-center bg-white p-4">
            <div>
                <h2 className="text-4xl font-bold my-4">Recommendations:</h2>
                <ol>
                    {top3Fertilizers.map((fertilizer, index) => (
                        <li key={index} className="text-2xl my-4">
                            {index+1}. {fertilizer}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};
