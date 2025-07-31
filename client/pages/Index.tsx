import { useState, useEffect } from "react";
import { Search, MapPin, Thermometer, Droplets, Wind, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { WeatherBackground } from "@/components/WeatherBackground";
import { searchLocations, getWeatherData, type WeatherData, type LocationData } from "@/lib/weather";

export default function Index() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setLocations([]);
      setShowSuggestions(false);
      return;
    }

    setSearching(true);
    try {
      const results = await searchLocations(searchQuery);
      setLocations(results);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error searching locations:", error);
    } finally {
      setSearching(false);
    }
  };

  const handleLocationSelect = async (location: LocationData) => {
    setLoading(true);
    setShowSuggestions(false);
    setQuery(`${location.name}, ${location.country}`);
    
    try {
      const weather = await getWeatherData(location.lat, location.lon, location.name);
      setWeatherData(weather);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny": return "☀️";
      case "cloudy": return "☁️";
      case "rainy": return "🌧️";
      case "stormy": return "⛈️";
      case "snowy": return "❄️";
      case "foggy": return "🌫️";
      default: return "🌤️";
    }
  };

  return (
    <div className="min-h-screen relative">
      {weatherData && <WeatherBackground condition={weatherData.condition} />}
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white/90 text-center mb-2 drop-shadow-lg">
              WeatherScope
            </h1>
            <p className="text-white/70 text-center drop-shadow">
              Discover weather conditions around the world
            </p>
          </div>
        </header>

        {/* Search Section */}
        <div className="flex-1 flex flex-col justify-center px-6">
          <div className="max-w-2xl mx-auto w-full">
            <div className="relative mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Enter a city name..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg bg-white/90 backdrop-blur-sm border-white/20 shadow-lg rounded-2xl focus:ring-2 focus:ring-white/30"
                />
                {searching && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
                  </div>
                )}
              </div>

              {/* Location Suggestions */}
              {showSuggestions && locations.length > 0 && (
                <Card className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border-white/20 shadow-xl rounded-xl z-20">
                  <CardContent className="p-0">
                    {locations.map((location, index) => (
                      <button
                        key={index}
                        onClick={() => handleLocationSelect(location)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100/50 flex items-center gap-3 first:rounded-t-xl last:rounded-b-xl transition-colors"
                      >
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <div>
                          <div className="font-medium text-gray-900">{location.name}</div>
                          <div className="text-sm text-gray-500">{location.country}</div>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Weather Display */}
            {loading && (
              <Card className="bg-white/20 backdrop-blur-md border-white/20 shadow-xl rounded-3xl">
                <CardContent className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-white/80">Getting weather data...</p>
                </CardContent>
              </Card>
            )}

            {weatherData && !loading && (
              <Card className="bg-white/20 backdrop-blur-md border-white/20 shadow-xl rounded-3xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-2">{getWeatherIcon(weatherData.condition)}</div>
                    <h2 className="text-3xl font-bold text-white mb-1">{weatherData.location}</h2>
                    <p className="text-white/70 capitalize">{weatherData.description}</p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-6xl font-light text-white mb-2">
                      {weatherData.temperature}°C
                    </div>
                    <p className="text-white/80">Feels like {weatherData.feelsLike}°C</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <Droplets className="h-6 w-6 text-white/70 mx-auto mb-2" />
                      <div className="text-white font-semibold">{weatherData.humidity}%</div>
                      <div className="text-white/70 text-sm">Humidity</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <Wind className="h-6 w-6 text-white/70 mx-auto mb-2" />
                      <div className="text-white font-semibold">{weatherData.windSpeed} km/h</div>
                      <div className="text-white/70 text-sm">Wind Speed</div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <Eye className="h-6 w-6 text-white/70 mx-auto mb-2" />
                      <div className="text-white font-semibold">Good</div>
                      <div className="text-white/70 text-sm">Visibility</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Initial State */}
            {!weatherData && !loading && (
              <Card className="bg-white/20 backdrop-blur-md border-white/20 shadow-xl rounded-3xl">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">🌍</div>
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome to WeatherScope</h2>
                  <p className="text-white/80 mb-6">
                    Search for any city to see current weather conditions with beautiful animated backgrounds
                  </p>
                  <Button 
                    onClick={() => setQuery("London")}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-sm"
                    variant="outline"
                  >
                    Try London
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}
