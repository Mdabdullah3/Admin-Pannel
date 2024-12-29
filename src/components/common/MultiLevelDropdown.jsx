import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const MultiLevelDropdown = ({ options, placeholder, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hoveredOption, setHoveredOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        className="w-full p-2 border rounded-md bg-white flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <FaChevronDown
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <ul className="absolute z-10 bg-white border rounded-md mt-2 w-full shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li key={option.value} className="relative">
              <button
                className="w-full p-2 hover:bg-gray-100 flex justify-between items-center"
                onClick={() => handleOptionClick(option)}
                onMouseEnter={() => setHoveredOption(option.value)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <span>{option.label}</span>
                {option.subCategories && (
                  <FaChevronRight
                    className={`transform transition-transform duration-300 ${
                      hoveredOption === option.value ? "rotate-90" : ""
                    }`}
                  />
                )}
              </button>
              {option.subCategories && hoveredOption === option.value && (
                <ul className="absolute left-full top-0 bg-white border rounded-md mt-[-1px] ml-1 shadow-lg">
                  {option.subCategories.map((subOption) => (
                    <li key={subOption.value}>
                      <button
                        className="w-full p-2 hover:bg-gray-100"
                        onClick={() => handleOptionClick(subOption)}
                      >
                        {subOption.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiLevelDropdown;
