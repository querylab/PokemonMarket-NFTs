import { useContext, useState, useEffect } from 'react';

import { NFTContext } from '../context/NFTcontext';

const Input = ({ inputType, title, placeholder, handleClick, validation, submitAttempted }) => {
  const [inputValue, setInputValue] = useState('');
  const { nftCurrency } = useContext(NFTContext);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { value } = e.target;
    if (submitAttempted) {
      const errorMsg = validation ? validation(value) : null;
      setError(errorMsg);
    }
    setInputValue(value);
    handleClick(e);
  };

  useEffect(() => {
    if (submitAttempted) {
      const errorMsg = validation ? validation(inputValue) : null;
      setError(errorMsg);
    }
  }, [submitAttempted, inputValue, validation]);

  return (
    <div className="mt-10 w-full">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">{title}</p>

      {inputType === 'number' ? (
        <div>
          <div
            className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row"
          >
            <input
              type="number"
              step={0.01}
              min={0}
              placeholder={placeholder}
              onChange={handleChange}
              className="flex w-full dark:bg-nft-black-1 bg-white outline-none"
            />
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">{nftCurrency}</p>
          </div>
          {/* <p className="dark:text-nft-gray-1 text-nft-gray-3 mt-2 ml-1 text-sm">0.01-5000 {nftCurrency}</p> */}
        </div>
      ) : inputType === 'textarea' ? (
        <div>
          <textarea
            rows={6}
            placeholder={placeholder}
            onChange={handleChange}
            className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 transition-all duration-200 ease-linear"
          />
          <p className="dark:text-nft-gray-1 text-nft-gray-3 mt-2 ml-1 text-sm">Maximum 200 symbols</p>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
            className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          />
          <p className="dark:text-nft-gray-1 text-nft-gray-3 mt-2 ml-1 text-sm">2-20 symbols</p>
        </div>
      )}

      {!!error && (
        <p className="text-red-500 mt-2 ml-1 text-sm">{error}</p>
      )}
    </div>
  );
};

export default Input;
