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
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const mockLocations: LocationData[] = [
    { name: "New York", country: "US", lat: 40.7128, lon: -74.0060 },
    { name: "London", country: "GB", lat: 51.5074, lon: -0.1278 },
    { name: "Tokyo", country: "JP", lat: 35.6762, lon: 139.6503 },
    { name: "Paris", country: "FR", lat: 48.8566, lon: 2.3522 },
    { name: "Sydney", country: "AU", lat: -33.8688, lon: 151.2093 },
    { name: "Mumbai", country: "IN", lat: 19.0760, lon: 72.8777 },
    { name: "Dubai", country: "AE", lat: 25.2048, lon: 55.2708 },
    { name: "Berlin", country: "DE", lat: 52.5200, lon: 13.4050 },
  ];
  
  return mockLocations.filter(location => 
    location.name.toLowerCase().includes(query.toLowerCase()) ||
    location.country.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);
}

export async function getWeatherData(lat: number, lon: number, locationName: string): Promise<WeatherData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock weather conditions - in production you'd call OpenWeatherMap API
  const conditions = [
    { condition: "sunny", description: "Clear sky", temp: 24, humidity: 45, wind: 12, code: "01d" },
    { condition: "cloudy", description: "Broken clouds", temp: 18, humidity: 65, wind: 8, code: "04d" },
    { condition: "rainy", description: "Light rain", temp: 15, humidity: 85, wind: 15, code: "10d" },
    { condition: "stormy", description: "Thunderstorm", temp: 16, humidity: 90, wind: 25, code: "11d" },
    { condition: "snowy", description: "Light snow", temp: -2, humidity: 80, wind: 10, code: "13d" },
    { condition: "foggy", description: "Mist", temp: 12, humidity: 95, wind: 5, code: "50d" },
  ];
  
  // Select random condition for demo (in production, this comes from API)
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
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
