import PropTypes from "prop-types";

import { useState, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";

const DateRangeSlider = ({ dataStartEndTimes, handleDateChange }) => {
  const [MIN, setMin] = useState(null);
  const [MAX, setMax] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const rtl = false;
  const STEP = 60 * 60 * 1000;

  // useEffect to handle initial load and updates for dataStartEndTimes
  useEffect(() => {
    if (MIN && MAX) return;
    if (dataStartEndTimes && dataStartEndTimes.start && dataStartEndTimes.end) {
      const startTime = new Date(dataStartEndTimes.start).getTime();
      const endTime = new Date(dataStartEndTimes.end).getTime();
      setValues([startTime, endTime]);
      setMin(startTime);
      setMax(endTime);
    }
  }, [dataStartEndTimes]);

  if (MIN === null || MAX === null) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const handleDateSliderChange = (values) => {
    setValues(values);
    handleDateChange(values[0], values[1]);
  };

  return (
    <div className="mb-3 ml-2 mr-4 flex h-6 w-full flex-col items-center justify-center">
      <output className="mb-2 text-sm" id="output">
        {formatTimestampWithTime(values[0])} -{" "}
        {formatTimestampWithTime(values[1])}
      </output>
      <Range
        draggableTrack
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => handleDateSliderChange(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "0",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "7px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#d6d3d1", "#a8a29e", "#d6d3d1"],
                  min: MIN,
                  max: MAX,
                  rtl,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => {
          const { key, ...restProps } = props; // Extract the key from props
          return (
            <div
              key={key} // Explicitly pass the key
              {...restProps} // Spread the remaining props
              style={{
                ...props.style,
                height: "16px",
                width: "16px",
                borderRadius: "2px",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 4px #AAA",
              }}
            >
              <div
                style={{
                  height: "12px",
                  width: "3px",
                  backgroundColor: isDragged ? "#78716c" : "#CCC",
                }}
              />
            </div>
          );
        }}
      />
    </div>
  );
};

function formatTimestampWithTime(unixTimestamp) {
  const date = new Date(unixTimestamp);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return date.toLocaleString("en-US", options);
}

DateRangeSlider.propTypes = {
  dataStartEndTimes: PropTypes.object.isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

export default DateRangeSlider;
