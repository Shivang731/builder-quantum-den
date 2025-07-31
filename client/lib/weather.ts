export interface WeatherData {
  location: string;
  country: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  icon: string;
  weatherCode: string;
}

export interface LocationData {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

// For demo purposes, we'll use a mock API since we don't want to require API keys
// In production, you'd replace this with actual OpenWeatherMap API calls
export async function searchLocations(query: string): Promise<LocationData[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockLocations: LocationData[] = [
    { name: "Mumbai", country: "IN", lat: 19.076, lon: 72.8777 },
    { name: "Delhi", country: "IN", lat: 28.6139, lon: 77.209 },
    { name: "Bangalore", country: "IN", lat: 12.9716, lon: 77.5946 },
    { name: "Chennai", country: "IN", lat: 13.0827, lon: 80.2707 },
    { name: "Kolkata", country: "IN", lat: 22.5726, lon: 88.3639 },
    { name: "Hyderabad", country: "IN", lat: 17.385, lon: 78.4867 },
    { name: "Pune", country: "IN", lat: 18.5204, lon: 73.8567 },
    { name: "Ahmedabad", country: "IN", lat: 23.0225, lon: 72.5714 },
    { name: "Jaipur", country: "IN", lat: 26.9124, lon: 75.7873 },
    { name: "Lucknow", country: "IN", lat: 26.8467, lon: 80.9462 },
  ];

  return mockLocations
    .filter(
      (location) =>
        location.name.toLowerCase().includes(query.toLowerCase()) ||
        location.country.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, 5);
}

export async function getWeatherData(
  lat: number,
  lon: number,
  locationName: string,
): Promise<WeatherData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock weather conditions - in production you'd call OpenWeatherMap API
  const conditions = [
    {
      condition: "sunny",
      description: "Clear sky",
      temp: 24,
      humidity: 45,
      wind: 12,
      code: "01d",
    },
    {
      condition: "cloudy",
      description: "Broken clouds",
      temp: 18,
      humidity: 65,
      wind: 8,
      code: "04d",
    },
    {
      condition: "rainy",
      description: "Light rain",
      temp: 15,
      humidity: 85,
      wind: 15,
      code: "10d",
    },
    {
      condition: "stormy",
      description: "Thunderstorm",
      temp: 16,
      humidity: 90,
      wind: 25,
      code: "11d",
    },
    {
      condition: "snowy",
      description: "Light snow",
      temp: -2,
      humidity: 80,
      wind: 10,
      code: "13d",
    },
    {
      condition: "foggy",
      description: "Mist",
      temp: 12,
      humidity: 95,
      wind: 5,
      code: "50d",
    },
  ];

  // Select random condition for demo (in production, this comes from API)
  const randomCondition =
    conditions[Math.floor(Math.random() * conditions.length)];

  return {
    location: locationName,
    country: "Example",
    temperature: randomCondition.temp,
    condition: randomCondition.condition,
    description: randomCondition.description,
    humidity: randomCondition.humidity,
    windSpeed: randomCondition.wind,
    feelsLike: randomCondition.temp + Math.floor(Math.random() * 6) - 3,
    icon: randomCondition.code,
    weatherCode: randomCondition.condition,
  };
}

export function getWeatherAnimation(condition: string): string {
  switch (condition) {
    case "sunny":
      return "sunny";
    case "cloudy":
      return "cloudy";
    case "rainy":
      return "rainy";
    case "stormy":
      return "stormy";
    case "snowy":
      return "snowy";
    case "foggy":
      return "foggy";
    default:
      return "sunny";
  }
}
