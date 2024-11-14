'use client';
import { useState, useEffect } from 'react';


async function fetchStockData() {
  const res = await fetch('https://services.niftytrader.in/webapi/Symbol/stock-list', {
    method: 'GET',
    headers: {
      'Authorization': 'Basic bmlmdHlhcGl1c2VyOm5pZnR5YXBpdXNlckAyMTEwIw==',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function StockSearch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [openModal, setModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleModal = (stock) => {
    setSelectedStock(stock); // Set the selected stock's data
    setModal(!openModal); // Toggle modal visibility
  };

  useEffect(() => {
    fetchStockData()
      .then((data) => {
        setData(data.result);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  },[] );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <section className="min-h-screen flex flex-col items-center pt-10 px-4">
        <h1 className="text-4xl font-semibold text-gray-800">Error loading stock data</h1>
        <p>{error}</p>
      </section>
    );
  }

  const filteredData = data.filter((stock) =>
    stock.symbol_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStocks = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getBgColor = (changePercent = 0) => {
    const absChange = Math.abs(changePercent);
    if (changePercent > 0) {
      return absChange >= 5 ? 'bg-green-100' : 'bg-green-50';
    }
    return absChange >= 5 ? 'bg-red-100' : 'bg-red-50';
  };

  const getValueColor = (value = 0) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <section>
      <div className="min-h-screen flex flex-col items-center pt-10 px-4">
        <div className="mb-4">
          <h1 className="text-4xl font-semibold text-gray-800">Search Stocks</h1>
        </div>
        <div className="w-full max-w-2xl relative mb-6 py-10 pb-0">
          <input
            type="text"
            placeholder="Search for a company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {currentStocks.map((stock) => (
              <li
                key={stock.symbol_name}
                className="px-10 py-3 rounded-lg border border-gray-200 hover:border-sky-500 hover:shadow-lg transition-all duration-200 bg-white cursor-pointer"
                type="button"
                onClick={() => handleModal(stock)}
              >
                <div>
                  <span className="font-semibold text-gray-800">{stock.symbol_name}</span>
                  <div className={`mt-2 font-bold text-2xl ${getValueColor(stock.change_value)} `}>₹ {stock.today_close}</div>
                </div>
              </li>
            ))}
          </ul>

          {/* Modal displaying dynamic data */}
          {openModal && selectedStock && (
            <div className="fixed top-0 left-0 w-full h-full bg-transparent flex justify-center items-center">
              <div className="w-[500px] h-[400px] py-2 rounded-lg bg-white shadow-lg " >
                <div className="border-b border-gray-300 flex justify-between items-center px-4 py-3 mb-4">
                  <div className="text-xl font-bold text-gray-700">{selectedStock.symbol_name}</div>
                  <button
                    type="button"
                    className="h-8 px-2 text-sm rounded-md bg-gray-700 text-white"
                    onClick={handleModal}
                  >
                    Close
                  </button>
                </div>
                <div className="px-4 pb-4">
                  <div>
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-gray-600">Current Price</p>
                      <div className="flex items-baseline gap-3">
                        <span className={`text-3xl font-bold ${getValueColor(selectedStock.change_value)}`}>
                          ₹{selectedStock.today_close}
                        </span>
                        <span className={`flex items-center text-lg font-semibold ${getValueColor(selectedStock.change_value)}`}>
                          {selectedStock.change_value > 0 ? '+' : ''}{selectedStock.change_value}
                          <span className="ml-1">
                            ({selectedStock.change_value > 0 ? '+' : ''}{selectedStock.change_percent}%)
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-5">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">Today's High</p>
                        <p className="text-lg font-semibold text-green-600">₹{selectedStock.today_high.toFixed(2)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">Today's Low</p>
                        <p className="text-lg font-semibold text-red-600">₹{selectedStock.today_low.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-5">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">Open Price</p>
                        <p className="text-lg font-semibold text-green-600">₹{selectedStock.today_open}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">Previous Close</p>
                        <p className="text-lg font-semibold text-red-600">₹{selectedStock.prev_close}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="w-full max-w-2xl flex justify-between ">
          <span className="self-center text-lg text-gray-700">Page {currentPage} of {totalPages}</span>
          <div>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-white font-bold bg-sky-600 rounded-md disabled:bg-gray-300"
            >
              Previous
            </button>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 ml-4 text-white font-bold bg-sky-600 rounded-md disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


