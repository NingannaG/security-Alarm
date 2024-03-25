exports.REFRESH_TIME = 5; //Seconds
exports.PORT = process.env.PORT || 6000;
exports.BACKEND_URL = "http://localhost:5000/";
exports.UPDATE_PATH = "api/tower";
exports.towers = [
  {
    tower: 1,
    location: { latitude: 28.6139, longitude: 77.209 },
    city: "New Delhi",
  },
  {
    tower: 2,
    location: { latitude: 19.076, longitude: 72.8777 },
    city: "Mumbai",
  },
  {
    tower: 3,
    location: { latitude: 12.9716, longitude: 77.5946 },
    city: "Bangalore",
  },
  {
    tower: 4,
    location: { latitude: 13.0827, longitude: 80.2707 },
    city: "Chennai",
  },
  {
    tower: 5,
    location: { latitude: 22.5726, longitude: 88.3639 },
    city: "Kolkata",
  },
  {
    tower: 6,
    location: { latitude: 17.385, longitude: 78.4867 },
    city: "Hyderabad",
  },
  {
    tower: 7,
    location: { latitude: 18.5204, longitude: 73.8567 },
    city: "Pune",
  },
  {
    tower: 8,
    location: { latitude: 23.0225, longitude: 72.5714 },
    city: "Ahmedabad",
  },
  {
    tower: 9,
    location: { latitude: 26.9124, longitude: 75.7873 },
    city: "Jaipur",
  },
  {
    tower: 10,
    location: { latitude: 26.8467, longitude: 80.9462 },
    city: "Lucknow",
  },
];
