import { useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchWeather(e) {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to get weather.");
      }

      setWeather(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function formatTime(timestamp, timezone) {
    return new Date((timestamp + timezone) * 1000)
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
      });
  }

  return (
    <main className="weather-app">
      <header className="hero">
        <div className="weather-symbol">☀️</div>
        <h1>Weather Dashboard</h1>
        <p>Check the weather in any city</p>
      </header>

      <form className="search-form" onSubmit={searchWeather}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="City name"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {loading && (
        <div className="loader" role="status">
          <div className="spinner" />
          <p>Loading weather...</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {weather && (
        <section className="weather-card">
          <div className="location">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>{weather.weather[0].description}</p>
          </div>

          <div className="current-weather">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <div>
              <strong>{Math.round(weather.main.temp)}°C</strong>
              <p>Feels like {Math.round(weather.main.feels_like)}°C</p>
            </div>
          </div>

          <div className="weather-details">
            <article>
              <span>💧</span>
              <p>Humidity</p>
              <h3>{weather.main.humidity}%</h3>
            </article>

            <article>
              <span>💨</span>
              <p>Wind Speed</p>
              <h3>{weather.wind.speed} m/s</h3>
            </article>

            <article>
              <span>🌅</span>
              <p>Sunrise</p>
              <h3>{formatTime(weather.sys.sunrise, weather.timezone)}</h3>
            </article>

            <article>
              <span>🌇</span>
              <p>Sunset</p>
              <h3>{formatTime(weather.sys.sunset, weather.timezone)}</h3>
            </article>
          </div>
        </section>
      )}

      <footer>Weather data powered by OpenWeatherMap</footer>
    </main>
  );
}

export default App;
