const user = {
  userId: 1,
  username: "Paul Bennett",
  email: "paul@email.com",
  role: "super",
  units: [
    {
      unitId: "abf4a4dd-73a7-43e0-9233-27826de40e56",
      role: "admin",
      unitName: "test-unit-1",
      location: "Livingroom (inside/outside)",
      sensors: [
        {
          sensorId: "031663369dff",
          type: "temperature",
          location: "inside-(unit)",
        },
        {
          sensorId: "031663ed6bff",
          type: "temperature",
          location: "outside-(soil)",
        },
        {
          sensorId: "0316640d15ff",
          type: "temperature",
          location: "outside-(air)",
        },
        {
          sensorId: "0316640fa8ff",
          type: "temperature",
          location: "inside-(window)",
        },
        {
          sensorId: "031664b43cff",
          type: "temperature",
          location: "inside-(woodburner)",
        },
      ],
    },
  ],
  iat: 1733834090,
  exp: 1733844890,
};

const tempReadingsStats = {
  "0316640fa8ff": {
    Days7: {
      min: 15.25,
      max: 19,
      avg: 17.28608630952381,
    },
    Days3: {
      min: 15.25,
      max: 18.5,
      avg: 16.848958333333332,
    },
    Days1: {
      min: 15.25,
      max: 17.25,
      avg: 16.473958333333332,
    },
  },
  "031663369dff": {
    Days7: {
      min: 20.25,
      max: 25.75,
      avg: 23.142113095238095,
    },
    Days3: {
      min: 22.25,
      max: 25.75,
      avg: 23.768229166666668,
    },
    Days1: {
      min: 22.25,
      max: 24.5,
      avg: 23.453125,
    },
  },
  "031663ed6bff": {
    Days7: {
      min: -0.25,
      max: 0,
      avg: -0.24702380952380953,
    },
    Days3: {
      min: -0.25,
      max: -0.25,
      avg: -0.25,
    },
    Days1: {
      min: -0.25,
      max: -0.25,
      avg: -0.25,
    },
  },
  "031664b43cff": {
    Days7: {
      min: 16.25,
      max: 23.5,
      avg: 20.032366071428573,
    },
    Days3: {
      min: 16.25,
      max: 20.75,
      avg: 20.008680555555557,
    },
    Days1: {
      min: 18.5,
      max: 20.75,
      avg: 19.7734375,
    },
  },
  "0316640d15ff": {
    Days7: {
      min: -8,
      max: 2.75,
      avg: -0.7146577380952381,
    },
    Days3: {
      min: -8,
      max: 2.5,
      avg: -1.0868055555555556,
    },
    Days1: {
      min: -8,
      max: 0,
      avg: -5.010416666666667,
    },
  },
};
