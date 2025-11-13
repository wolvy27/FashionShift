import React, { useState, useMemo } from "react";
import "./Styles.css";

// Wardrobe data - using actual items from user's wardrobe
const wardrobeItems = [
  {
    id: 1,
    name: "Techwear Hoodie",
    category: "T-Shirts",
    color: "Black",
    material: "Cotton",
    size: "M",
    image: "https://techwearstorm.com/cdn/shop/files/cyberpunk-hoodie-ninja-black-m-techwear-storm-899.webp?v=1743900642&width=700"
  },
  {
    id: 2,
    name: "Cyberpunk Pants",
    category: "Pants",
    color: "Black",
    material: "Cotton",
    size: "M",
    image: "https://techwearstorm.com/cdn/shop/files/cyberpunk-pants-tomari-s-techwear-storm-237.jpg?v=1714068018&width=700"
  },
  {
    id: 3,
    name: "Techwear Jacket",
    category: "Jacket",
    color: "Black",
    material: "Polyester",
    size: "M",
    image: "https://techwearstorm.com/cdn/shop/files/techwear-jacket-sakibe-black-m-storm-622.webp?v=1741944968&width=700"
  },
  {
    id: 4,
    name: "Techwear Vest",
    category: "Vest",
    color: "Black",
    material: "Polyester",
    size: "M",
    image: "https://techwearstorm.com/cdn/shop/files/futuristic-cyberpunk-pants-boso-s-techwear-storm-825.webp?v=1746564973&width=700"
  }
];

// Color compatibility checker
const checkColorCompatibility = (color1, color2) => {
  const colorHarmony = {
    'Black': ['White', 'Gray', 'Blue', 'Red', 'Yellow', 'Green', 'Black'],
    'White': ['Black', 'Blue', 'Red', 'Green', 'Gray', 'Yellow', 'Brown'],
    'Blue': ['White', 'Black', 'Gray', 'Yellow', 'Brown'],
    'Gray': ['White', 'Black', 'Blue', 'Yellow', 'Red'],
    'Yellow': ['Black', 'Blue', 'White', 'Gray'],
    'Red': ['Black', 'White', 'Gray'],
    'Green': ['Black', 'White', 'Brown'],
    'Brown': ['White', 'Blue', 'Green', 'Yellow']
  };
  
  return colorHarmony[color1]?.includes(color2) || color1 === color2;
};

// Generate outfit based on temperature and available techwear items
const generateOutfitForWeather = (items, temperature) => {
  const tops = items.filter(item => ['T-Shirts', 'Shirts', 'Hoodie'].includes(item.category));
  const bottoms = items.filter(item => ['Jeans', 'Pants'].includes(item.category));
  const jackets = items.filter(item => ['Jacket', 'Jackets', 'Coats'].includes(item.category));
  const accessories = items.filter(item => ['Vest', 'Vests'].includes(item.category));
  
  // Always need a top and bottom for a complete outfit
  let selectedTop = tops[0]; // Get the techwear hoodie
  let selectedBottom = bottoms[0]; // Get the cyberpunk pants
  let selectedJacket = null;
  let selectedAccessory = null;
  
  // Determine layering based on temperature
  if (temperature >= 80) {
    // Very hot - just top and bottom, no layers
    selectedJacket = null;
    selectedAccessory = null;
  } else if (temperature >= 65) {
    // Warm weather - add vest for style
    selectedAccessory = accessories[0];
  } else if (temperature >= 45) {
    // Cool weather - add jacket
    selectedJacket = jackets[0];
  } else {
    // Cold weather - jacket + vest for maximum warmth
    selectedJacket = jackets[0];
    selectedAccessory = accessories[0];
  }
  
  // Build the outfit object
  const outfit = {
    top: selectedTop,
    bottom: selectedBottom,
    temperature: temperature,
    weatherAdvice: getWeatherAdvice(temperature)
  };
  
  // Add optional layers
  if (selectedJacket) {
    outfit.jacket = selectedJacket;
  }
  
  if (selectedAccessory) {
    outfit.accessory = selectedAccessory;
  }
  
  return outfit;
};

// Get weather-specific advice
const getWeatherAdvice = (temperature) => {
  if (temperature >= 80) {
    return {
      message: "It's very hot outside! Keep it minimal with just your hoodie and pants.",
      tips: ["Stay hydrated", "Choose breathable materials", "Minimal layers"]
    };
  } else if (temperature >= 65) {
    return {
      message: "Perfect techwear weather! Add a vest for that cyberpunk aesthetic.",
      tips: ["Great for outdoor activities", "Add functional accessories", "Layer for style"]
    };
  } else if (temperature >= 45) {
    return {
      message: "Cool weather calls for your techwear jacket. Perfect for that urban explorer look!",
      tips: ["Jacket provides wind protection", "Great for evening outings", "Functional and stylish"]
    };
  } else {
    return {
      message: "Cold weather means full techwear mode! Layer up with both jacket and vest.",
      tips: ["Maximum warmth and protection", "Perfect cyberpunk aesthetic", "Ready for any weather"]
    };
  }
};

function Styles() {
  const [currentWeather, setCurrentWeather] = useState({ temp: 70, condition: 'sunny' });
  const [location, setLocation] = useState('');
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  // Generate outfit recommendation using useMemo
  const recommendedOutfit = useMemo(() => {
    return generateOutfitForWeather(wardrobeItems, currentWeather.temp);
  }, [currentWeather.temp]);

  // Simulate weather API call (replace with real weather API)
  const fetchWeather = async () => {
    setIsLoadingWeather(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock weather data (replace with real API call)
      const mockTemp = Math.floor(Math.random() * 60) + 20; // 20-80°F
      const conditions = ['sunny', 'cloudy', 'rainy', 'snowy'];
      const mockCondition = conditions[Math.floor(Math.random() * conditions.length)];
      
      setCurrentWeather({ temp: mockTemp, condition: mockCondition });
    } catch (error) {
      console.error('Weather fetch error:', error);
    }
    setIsLoadingWeather(false);
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeather(location);
    }
  };

  return (
    <div className="styles-page">      
      {/* Header */}
      <div className="styles-header">
        <h1>Weather-Based Outfit Generator</h1>
        <p>Get outfit recommendations based on current weather conditions</p>
      </div>

      {/* Weather Section */}
      <div className="weather-section">
        <form onSubmit={handleLocationSubmit} className="weather-form">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your city..."
            className="location-input"
          />
          <button type="submit" className="weather-btn" disabled={isLoadingWeather}>
            {isLoadingWeather ? 'Loading...' : 'Get Weather'}
          </button>
        </form>
        
        {/* Manual Temperature Control for Demo */}
        <div className="manual-temp-control">
          <h4>Demo: Try Different Temperatures</h4>
          <div className="temp-buttons">
            <button 
              onClick={() => setCurrentWeather({...currentWeather, temp: 85})} 
              className={currentWeather.temp === 85 ? 'active' : ''}
            >
              Hot (85°F)
            </button>
            <button 
              onClick={() => setCurrentWeather({...currentWeather, temp: 70})} 
              className={currentWeather.temp === 70 ? 'active' : ''}
            >
              Warm (70°F)
            </button>
            <button 
              onClick={() => setCurrentWeather({...currentWeather, temp: 50})} 
              className={currentWeather.temp === 50 ? 'active' : ''}
            >
              Cool (50°F)
            </button>
            <button 
              onClick={() => setCurrentWeather({...currentWeather, temp: 30})} 
              className={currentWeather.temp === 30 ? 'active' : ''}
            >
              Cold (30°F)
            </button>
          </div>
        </div>
        
        <div className="current-weather">
          <div className="weather-card">
            <h3>Current Weather</h3>
            <div className="weather-info">
              <span className="temperature">{currentWeather.temp}°F</span>
              <span className="condition">{currentWeather.condition}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Outfit Recommendation */}
      <div className="outfit-recommendation">
        <h2>Recommended Outfit</h2>
        {recommendedOutfit ? (
          <div className="recommended-outfit-card">
            <div className="outfit-items">
              {/* Top Item */}
              <div className="outfit-item">
                <div className="item-image">
                  <img src={recommendedOutfit.top.image} alt={recommendedOutfit.top.name} />
                </div>
                <div className="item-info">
                  <h4>{recommendedOutfit.top.name}</h4>
                  <p>{recommendedOutfit.top.category}</p>
                  <span className={`color-tag color-${recommendedOutfit.top.color.toLowerCase()}`}>
                    {recommendedOutfit.top.color}
                  </span>
                </div>
              </div>
              
              {/* Bottom Item */}
              <div className="outfit-item">
                <div className="item-image">
                  <img src={recommendedOutfit.bottom.image} alt={recommendedOutfit.bottom.name} />
                </div>
                <div className="item-info">
                  <h4>{recommendedOutfit.bottom.name}</h4>
                  <p>{recommendedOutfit.bottom.category}</p>
                  <span className={`color-tag color-${recommendedOutfit.bottom.color.toLowerCase()}`}>
                    {recommendedOutfit.bottom.color}
                  </span>
                </div>
              </div>
              
              {/* Jacket Layer */}
              {recommendedOutfit.jacket && (
                <div className="outfit-item">
                  <div className="item-image">
                    <img src={recommendedOutfit.jacket.image} alt={recommendedOutfit.jacket.name} />
                  </div>
                  <div className="item-info">
                    <h4>{recommendedOutfit.jacket.name}</h4>
                    <p>{recommendedOutfit.jacket.category}</p>
                    <span className={`color-tag color-${recommendedOutfit.jacket.color.toLowerCase()}`}>
                      {recommendedOutfit.jacket.color}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Accessory Layer */}
              {recommendedOutfit.accessory && (
                <div className="outfit-item">
                  <div className="item-image">
                    <img src={recommendedOutfit.accessory.image} alt={recommendedOutfit.accessory.name} />
                  </div>
                  <div className="item-info">
                    <h4>{recommendedOutfit.accessory.name}</h4>
                    <p>{recommendedOutfit.accessory.category}</p>
                    <span className={`color-tag color-${recommendedOutfit.accessory.color.toLowerCase()}`}>
                      {recommendedOutfit.accessory.color}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="outfit-advice">
              <div className="weather-note">
                <p>{recommendedOutfit.weatherAdvice.message}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-outfit">
            <p>No suitable outfit found for current weather conditions.</p>
            <p>Try adding more clothing items to your wardrobe!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Styles;