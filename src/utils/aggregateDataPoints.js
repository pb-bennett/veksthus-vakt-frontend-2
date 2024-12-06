const adjustDataPoints = (data, startTime, endTime) => {
  const timeDifference = new Date(endTime) - new Date(startTime);
  const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  const oneWeek = 7 * oneDay; // 1 week in milliseconds

  let adjustedData = [...data];

  // Calculate how much to aggregate based on the time period
  if (timeDifference <= oneDay) {
    // For the last 24 hours, show all data points (15-minute intervals)
    return adjustedData; // No change
  } else if (timeDifference <= oneWeek) {
    // For the last 1 week, aggregate to hourly data
    adjustedData = aggregateData(adjustedData, 60); // 60 minutes = 1 hour
  } else {
    // For more than 1 week, aggregate to 3-hour data
    adjustedData = aggregateData(adjustedData, 180); // 180 minutes = 3 hours
  }

  return adjustedData;
};

// Helper function to aggregate data points based on a given time interval (in minutes)
const aggregateData = (data, interval) => {
  const aggregated = [];

  // Sort data by time
  data.sort((a, b) => new Date(a.time) - new Date(b.time));

  let currentGroup = [];
  let groupStartTime = new Date(data[0].time);
  groupStartTime.setMinutes(0, 0, 0); // Round to the start of the interval (e.g., hour)

  // Helper function to calculate the average for each sensor in the current group
  const calculateAverages = (group) => {
    const sensorsAvg = {};

    group.forEach((dataPoint) => {
      Object.keys(dataPoint).forEach((sensorId) => {
        if (sensorId !== "time") {
          if (!sensorsAvg[sensorId]) {
            sensorsAvg[sensorId] = { sum: 0, count: 0 };
          }
          sensorsAvg[sensorId].sum += dataPoint[sensorId];
          sensorsAvg[sensorId].count += 1;
        }
      });
    });

    // Calculate the average for each sensor
    const result = { time: groupStartTime.toISOString() };
    Object.keys(sensorsAvg).forEach((sensorId) => {
      let avgTemp = sensorsAvg[sensorId].sum / sensorsAvg[sensorId].count;
      // Round the average temperature to 2 decimal places
      avgTemp = Math.round(avgTemp * 10) / 10;
      result[sensorId] = avgTemp;
    });

    return result;
  };

  // Process the data
  data.forEach((point) => {
    const pointTime = new Date(point.time);

    // Calculate the time difference in minutes and check if the point belongs to the current interval
    const diffInMinutes = Math.floor((pointTime - groupStartTime) / 60000); // Difference in minutes

    if (diffInMinutes < interval) {
      // Add to the current group if it's within the same interval
      currentGroup.push(point);
    } else {
      // If the interval has passed, calculate the averages for the current group
      if (currentGroup.length > 0) {
        aggregated.push(calculateAverages(currentGroup));
      }

      // Reset for the next group
      groupStartTime = new Date(pointTime);
      groupStartTime.setMinutes(
        Math.floor(pointTime.getMinutes() / interval) * interval,
        0,
        0,
      ); // Round to the next interval
      currentGroup = [point];
    }
  });

  // Add the last group if any data remains
  if (currentGroup.length > 0) {
    aggregated.push(calculateAverages(currentGroup));
  }

  return aggregated;
};

export { adjustDataPoints };
