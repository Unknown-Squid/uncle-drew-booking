import React, { useState, useEffect } from 'react';

const SelectMonthField = ({ monthFilter, handleMonthChange, label }) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [currentMonthIndex, setCurrentMonthIndex] = useState(null);

  useEffect(() => {
    const now = new Date();
    setCurrentMonthIndex(now.getMonth()); // 0-11
  }, []);

  const filteredMonths = () => {
    if (currentMonthIndex === null) return [];

    if (label === 'done') {
      return months.slice(0, currentMonthIndex + 1); // Up to current
    } else {
      return months.slice(currentMonthIndex); // From current
    }
  };

  const monthList = filteredMonths();

  return (
    <select
      id="month-filter"
      value={monthFilter}
      onChange={handleMonthChange}
      className="h-[40px] w-[150px] border border-[var(--text-black)] rounded-[10px] px-2 text-[var(--text-black)]"
    >
      {monthList.map((month, index) => (
        <option key={index} value={month}>
          {label !== 'done'
            ? index === 0 ? "This Month" : month
            : index === monthList.length - 1 ? "This Month" : month}
        </option>
      ))}
    </select>
  );
};

export default SelectMonthField;
