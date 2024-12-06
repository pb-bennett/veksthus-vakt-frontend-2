const formatLocation = (location) => {
  return location
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const formatTime = (time) => {
  const date = new Date(time);
  return date.toLocaleString(); // Format as a readable string
};

const colorGrader = (
  temperature,
  breakpoints = [-10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 99],
  colorRange = [
    "rgba(1, 92, 251, 0.8)",
    "rgba(28, 136, 199, 0.8)",
    "rgba(38, 154, 180, 0.8)",
    "rgba(90, 209, 137, 0.8)",
    "rgba(103, 247, 66, 0.8)",
    "rgba(181, 243, 45, 0.8)",
    "rgba(249, 224, 79, 0.8)",
    "rgba(249, 199, 79, 0.8)",
    "rgba(249, 132, 74, 0.8)",
    "rgba(248, 150, 30, 0.8)",
    "rgba(243, 114, 44, 0.8)",
    "rgba(249, 65, 68, 0.8)",
  ],
  // colorRange = [
  //   "#015CFB",
  //   "#1C88C7",
  //   "#269AB4",
  //   "#5AD189",
  //   "#67F742",
  //   "#B5F32D",
  //   "#f9e04f",
  //   "#F9C74F",
  //   "#F9844A",
  //   "#F8961E",
  //   "#F3722C",
  //   "#F94144",
  // ],
) => {
  if (breakpoints.length !== colorRange.length)
    return console.error("breakpoints and colorRange must be the same length");
  for (let i = 0; i < breakpoints.length; i++) {
    if (parseFloat(temperature) < breakpoints[i]) {
      return colorRange[i];
    }
  }

  // If temperature is above the last breakpoint
  return colorRange[breakpoints.length];
};

// Color pool with RGB colors and 60% opacity (converted to RGBA)
const colorPool = [
  "rgba(255, 99, 71, 0.6)", // Tomato Red
  "rgba(70, 130, 180, 0.6)", // Steel Blue
  "rgba(50, 205, 50, 0.6)", // Lime Green
  "rgba(210, 105, 30, 0.6)", // Chocolate
  "rgba(138, 43, 226, 0.6)", // Blue Violet
  "rgba(255, 215, 0, 0.6)", // Gold
  "rgba(255, 69, 0, 0.6)", // Orange Red
  "rgba(154, 205, 50, 0.6)", // Yellow Green
  "rgba(173, 255, 47, 0.6)", // Green Yellow
  "rgba(32, 178, 170, 0.6)", // Light Sea Green
];

// Modified function to assign colors in RGBA format directly
const sensorColorAssigner = (sensorArray) => {
  const sortedArray = [...sensorArray].sort((a, b) =>
    a.sensorId.localeCompare(b.sensorId),
  );

  const colorSortedArray = sortedArray.map((sensor, index) => ({
    ...sensor,
    color: colorPool[index], // Directly assign RGB(A) color
  }));

  return colorSortedArray;
};

export { colorGrader, sensorColorAssigner, formatLocation, formatTime };
