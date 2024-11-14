'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Searchstocks = () => {
    const [stockSymbol, setStockSymbol] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        setStockSymbol(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (stockSymbol) {
            router.push(`/stock-analysis/${stockSymbol}`);
        }
    };

    return (
        <section>
            <div className="">
                <div className="min-h-screen flex flex-col items-center pt-60 px-4">
                    <div className="mb-4">
                        <h1 className="text-4xl font-semibold text-gray-800">
                            Search Stocks
                        </h1>
                    </div>

                    <div className="w-full max-w-2xl relative mb-6 py-10">
                        <form onSubmit={handleSearch}>
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for a company"
                                    className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                    value={stockSymbol}
                                    onChange={handleChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Searchstocks;
