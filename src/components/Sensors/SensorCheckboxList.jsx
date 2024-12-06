import { useState, useEffect } from "react";

const SensorCheckboxList = ({ options, onChange }) => {
  const [selectedSensors, setSelectedSensors] = useState([...options]);
  const handleCheckboxChange = (sensor) => {
    setSelectedSensors((prev) => {
      const isAlreadySelected = prev.some((s) => s.id === sensor.id);
      const newSelected = isAlreadySelected
        ? prev.filter((s) => s.id !== sensor.id) // Remove the sensor if already selected
        : [...prev, sensor]; // Add the sensor if not selected
      onChange(newSelected); // Pass the updated value to the onChange handler
      return newSelected;
    });
  };

  return (
    <div className="flex items-center gap-2 px-4">
      {options.map((sensor) => (
        <div
          key={sensor.id}
          className="mx-1 flex items-center hover:opacity-70"
        >
          <input
            type="checkbox"
            checked={selectedSensors.some((s) => s.id === sensor.id)} // Reflect selected state
            onChange={() => {
              handleCheckboxChange(sensor);
            }} // Handle checkbox change
            id={sensor.id}
            className="mr-2 cursor-pointer"
          />
          <div
            style={{ backgroundColor: sensor.color }}
            className="mr-1 h-[2px] w-6"
          ></div>
          <label
            style={{ color: sensor.color }}
            className="text-sm"
            htmlFor={sensor.id}
          >
            {sensor.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SensorCheckboxList;
