import { useEffect, useState } from "react";

interface WeatherBackgroundProps {
  condition: string;
}

export function WeatherBackground({ condition }: WeatherBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {condition === "sunny" && <SunnyBackground />}
      {condition === "cloudy" && <CloudyBackground />}
      {condition === "rainy" && <RainyBackground />}
      {condition === "stormy" && <StormyBackground />}
      {condition === "snowy" && <SnowyBackground />}
      {condition === "foggy" && <FoggyBackground />}
    </div>
  );
}

function SunnyBackground() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-blue-400 via-blue-300 to-yellow-200">
      <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-400 rounded-full shadow-lg animate-pulse">
        <div className="absolute inset-0 bg-yellow-300 rounded-full animate-ping opacity-20"></div>
      </div>
      {/* Floating clouds */}
      <div className="absolute top-32 left-10 w-24 h-12 bg-white/30 rounded-full animate-float-slow"></div>
      <div className="absolute top-48 right-32 w-32 h-16 bg-white/20 rounded-full animate-float-slower"></div>
      <div className="absolute top-64 left-1/3 w-20 h-10 bg-white/25 rounded-full animate-float"></div>
    </div>
  );
}

function CloudyBackground() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-gray-400 via-gray-300 to-gray-100">
      {/* Multiple cloud layers */}
      <div className="absolute top-16 left-8 w-40 h-20 bg-white/60 rounded-full animate-float-slow"></div>
      <div className="absolute top-32 right-16 w-48 h-24 bg-white/70 rounded-full animate-float"></div>
      <div className="absolute top-48 left-1/4 w-36 h-18 bg-white/50 rounded-full animate-float-slower"></div>
      <div className="absolute top-64 right-1/3 w-32 h-16 bg-white/80 rounded-full animate-float-slow"></div>
      <div className="absolute top-80 left-1/2 w-44 h-22 bg-white/40 rounded-full animate-float"></div>
    </div>
  );
}

function RainyBackground() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-gray-600 via-gray-500 to-gray-400">
      {/* Dark clouds */}
      <div className="absolute top-12 left-4 w-48 h-24 bg-gray-700/80 rounded-full animate-float-slow"></div>
      <div className="absolute top-24 right-8 w-40 h-20 bg-gray-800/70 rounded-full animate-float"></div>

      {/* Rain drops */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-4 bg-blue-200/60 animate-rain"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function StormyBackground() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700">
      {/* Very dark clouds */}
      <div className="absolute top-8 left-0 w-52 h-26 bg-gray-900/90 rounded-full animate-float-slow"></div>
      <div className="absolute top-16 right-4 w-48 h-24 bg-black/80 rounded-full animate-float"></div>

      {/* Lightning effect */}
      <div className="absolute inset-0 animate-lightning opacity-0"></div>

      {/* Heavy rain */}
      <div className="absolute inset-0">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-6 bg-blue-100/80 animate-heavy-rain"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1}s`,
              animationDuration: `${0.3 + Math.random() * 0.3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function SnowyBackground() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-slate-300 via-slate-200 to-white">
      {/* Snow clouds */}
      <div className="absolute top-16 left-8 w-44 h-22 bg-white/90 rounded-full animate-float-slow"></div>
      <div className="absolute top-32 right-12 w-48 h-24 bg-gray-100/80 rounded-full animate-float"></div>

      {/* Snowflakes */}
      <div className="absolute inset-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-snow opacity-80"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function FoggyBackground() {
  return (
    <div className="h-full w-full bg-gradient-to-b from-gray-400 via-gray-300 to-gray-200">
      {/* Fog layers */}
      <div className="absolute inset-0 bg-white/40 animate-fog-drift"></div>
      <div className="absolute inset-0 bg-gray-100/30 animate-fog-drift-reverse"></div>
      <div className="absolute top-1/4 left-0 w-full h-32 bg-white/50 animate-fog-float"></div>
      <div className="absolute top-1/2 left-0 w-full h-48 bg-gray-200/40 animate-fog-float-reverse"></div>
      <div className="absolute bottom-1/4 left-0 w-full h-40 bg-white/35 animate-fog-drift"></div>
    </div>
  );
}
