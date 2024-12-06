import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Direction, Range, getTrackBackground } from "react-range";

const VerticalTemperatureRangeSlider = ({
  minTemp,
  maxTemp,
  handleTemperatureChange,
  height,
}) => {
  const [MIN, setMin] = useState(minTemp);
  const [MAX, setMax] = useState(maxTemp);
  const [values, setValues] = useState([minTemp, maxTemp]);
  const STEP = 0.5;
  const rtl = false;

  // Set the min and max values when the component loads or when minTemp and maxTemp change
  useEffect(() => {
    const adjustedRangeMax = MAX + 100;
    const adjustedRangeMin = MIN + 100;
    const adjustedLowerValue = values[0] + 100;
    const adjustedUpperValue = values[1] + 100;

    handleTemperatureChange([
      MIN + (adjustedRangeMax - adjustedUpperValue),
      MAX - (adjustedLowerValue - adjustedRangeMin),
    ]);
  }, [values]);

  if (MIN === null || MAX === null) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const handleTempSliderChange = (values) => {
    setValues(values);
  };

  return (
    <div
      className="flex h-full w-10 select-none flex-col items-center justify-center"
      style={{
        height: `${height * 0.75}px`,
      }}
    >
      <Range
        draggableTrack
        direction={Direction.Down}
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(values) => handleTempSliderChange(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,

              width: "6px",
              display: "flex",
              height: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                width: "7px",
                height: `${height * 0.75}px`,
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#d6d3d1", "#a8a29e", "#d6d3d1"],
                  min: MIN,
                  max: MAX,
                  direction: Direction.Down,
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
                  height: "3px",
                  width: "12px",
                  backgroundColor: isDragged ? "#78716c" : "#CCC",
                }}
              />
            </div>
          );
        }}
      />
      {
        // <output
        //   className="text-xs"
        //   style={{ marginTop: "50px", width: "56px" }}
        //   id="output"
        // >
        //   {`${values[0]} - ${values[1]}`}
        // </output>
      }
    </div>
  );
};

VerticalTemperatureRangeSlider.propTypes = {
  minTemp: PropTypes.number.isRequired,
  maxTemp: PropTypes.number.isRequired,
  handleTempChange: PropTypes.func.isRequired,
};

export default VerticalTemperatureRangeSlider;
