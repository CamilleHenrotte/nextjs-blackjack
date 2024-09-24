"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const DropdownMenu = ({ options, onSelect, customStyles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative flex items-center justify-center pr-3 pl-2"
      ref={dropdownRef}
    >
      <button onClick={toggleDropdown}>
        {isOpen ? (
          <Image
            src="../../images/arrowUp.svg"
            alt="arrow up"
            width={15}
            height={15}
          />
        ) : (
          <Image
            src="../../images/arrowDown.svg"
            alt="arrow down"
            width={15}
            height={15}
          />
        )}
      </button>

      {isOpen && (
        <ul className="absolute left-[-10rem] top-full mt-2 bg-white border border-gray-300 shadow-lg  w-[200px] rounded-lg">
          {options.map((option, index) => (
            <li
              key={index}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer  ${
                customStyles[index]?.className || ""
              } `}
              onClick={() => {
                onSelect(index); // Pass the index of the selected item
                setIsOpen(false); // Close dropdown after selection
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
