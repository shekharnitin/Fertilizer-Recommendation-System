import React from 'react';
import { Header } from "../Components/Header";
import Init from "../Components/Init";

export const Home = () => {
    return (
        <div className="relative min-h-screen">
            <div className='bg-white'>
                <Header set={""} />
            </div>
            <div className="">
                <Init />
            </div>
        </div>
    );
}
