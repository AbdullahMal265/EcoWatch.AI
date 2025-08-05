import React, { useState } from 'react';
import { MapPin, Search, TrendingDown, TrendingUp, AlertTriangle, Users, Globe, BarChart3 } from 'lucide-react';
import './App.css';

const EcoWatchApp = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userCount] = useState(427);
  const [activeTab, setActiveTab] = useState('map');
  const [searchResults, setSearchResults] = useState([]);

  const searchLocation = async (query) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }
    
    const locations = {
      'pakistan': [
        { name: 'Karachi, Pakistan', coords: [24.8607, 67.0011] },
        { name: 'Lahore, Pakistan', coords: [31.5204, 74.3587] },
        { name: 'Islamabad, Pakistan', coords: [33.6844, 73.0479] },
        { name: 'Thar Desert, Pakistan', coords: [24.5, 70.5] },
        { name: 'Balochistan, Pakistan', coords: [28.0, 66.0] }
      ],
      'london': [
        { name: 'London, United Kingdom', coords: [51.5074, -0.1278] },
        { name: 'London, Ontario, Canada', coords: [42.9849, -81.2453] },
        { name: 'London, Kentucky, USA', coords: [37.1289, -84.0832] }
      ],
      'new york': [
        { name: 'New York City, USA', coords: [40.7128, -74.0060] },
        { name: 'New York State, USA', coords: [42.1657, -74.9481] }
      ],
      'tokyo': [
        { name: 'Tokyo, Japan', coords: [35.6762, 139.6503] },
        { name: 'Tokyo Bay, Japan', coords: [35.5, 139.8] }
      ],
      'sahara': [
        { name: 'Sahara Desert, Algeria', coords: [23.4162, 25.6628] },
        { name: 'Sahara Desert, Morocco', coords: [31.0, -4.0] },
        { name: 'Sahara Desert, Egypt', coords: [26.0, 29.0] }
      ],
      'india': [
        { name: 'New Delhi, India', coords: [28.6139, 77.2090] },
        { name: 'Mumbai, India', coords: [19.0760, 72.8777] },
        { name: 'Rajasthan, India', coords: [27.0238, 74.2179] },
        { name: 'Thar Desert, India', coords: [26.0, 71.0] }
      ],
      'california': [
        { name: 'Los Angeles, California, USA', coords: [34.0522, -118.2437] },
        { name: 'San Francisco, California, USA', coords: [37.7749, -122.4194] },
        { name: 'Mojave Desert, California, USA', coords: [35.0, -116.0] }
      ],
      'australia': [
        { name: 'Sydney, Australia', coords: [-33.8688, 151.2093] },
        { name: 'Melbourne, Australia', coords: [-37.8136, 144.9631] },
        { name: 'Great Victoria Desert, Australia', coords: [-29.0, 129.0] },
        { name: 'Outback, Australia', coords: [-25.0, 133.0] }
      ],
      'china': [
        { name: 'Beijing, China', coords: [39.9042, 116.4074] },
        { name: 'Shanghai, China', coords: [31.2304, 121.4737] },
        { name: 'Gobi Desert, China', coords: [43.0, 103.0] }
      ],
      'africa': [
        { name: 'Sahel Region, Africa', coords: [15.0, 0.0] },
        { name: 'Kalahari Desert, Africa', coords: [-24.0, 21.0] },
        { name: 'Horn of Africa', coords: [8.0, 48.0] }
      ],
      'brazil': [
        { name: 'São Paulo, Brazil', coords: [-23.5505, -46.6333] },
        { name: 'Rio de Janeiro, Brazil', coords: [-22.9068, -43.1729] },
        { name: 'Caatinga, Brazil', coords: [-9.0, -40.0] }
      ]
    };

    const queryLower = query.toLowerCase();
    let mockLocations = [];

    if (locations[queryLower]) {
      mockLocations = locations[queryLower];
    } else {
      Object.keys(locations).forEach(key => {
        if (key.includes(queryLower) || queryLower.includes(key)) {
          mockLocations = mockLocations.concat(locations[key]);
        }
      });
      
      if (mockLocations.length === 0) {
        mockLocations = [
          { name: query + ', Global Search', coords: [0, 0] },
          { name: query + ', Desert Region', coords: [25, 50] },
          { name: query + ', Arid Zone', coords: [-25, -50] }
        ];
      }
    }
    
    setSearchResults(mockLocations.slice(0, 5));
  };

  const performAnalysis = async (location) => {
    setIsAnalyzing(true);
    setSearchResults([]);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockData = {
      location: location.name,
      coordinates: location.coords,
      desertificationRisk: Math.random() > 0.5 ? 'High' : Math.random() > 0.3 ? 'Medium' : 'Low',
      vegetationChange: (Math.random() - 0.5) * 20,
      precipitationTrend: (Math.random() - 0.5) * 15,
      temperatureTrend: Math.random() * 2 + 0.5,
      mannKendallScore: (Math.random() - 0.5) * 4,
      pValue: Math.random() * 0.1,
      timeRange: '2000-2024',
      affectedArea: Math.floor(Math.random() * 5000) + 500
    };
    
    setAnalysisData(mockData);
    setIsAnalyzing(false);
  };

  const sampleLocations = [
    { name: 'Sahel Region, Africa', coords: [15.0, 0.0] },
    { name: 'Rajasthan, India', coords: [27.0, 74.0] },
    { name: 'Gobi Desert, Mongolia', coords: [43.0, 103.0] },
    { name: 'Atacama Desert, Chile', coords: [-24.5, -69.2] },
    { name: 'Great Victoria Desert, Australia', coords: [-29.0, 129.0] }
  ];

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    performAnalysis(location);
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'High': return 'risk-high';
      case 'Medium': return 'risk-medium';
      case 'Low': return 'risk-low';
      default: return 'risk-default';
    }
  };

  const tabs = [
    { id: 'map', label: 'Interactive Map', icon: MapPin },
    { id: 'analysis', label: 'Analysis Dashboard', icon: BarChart3 }
  ];

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <Globe size={32} color="#059669" />
            <span className="brand-text">EcoWatch.AI</span>
            <div className="user-count">
              <Users size={16} />
              <span>{userCount}+ users tracking desertification globally</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-container">
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? 'tab active' : 'tab'}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'map' && (
          <div className="map-container">
            <div className="map-section">
              <div className="search-container">
                <h2>Global Desertification Map</h2>
                <div className="search-box">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="Search for any location worldwide..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      searchLocation(e.target.value);
                    }}
                  />
                  {searchResults.length > 0 && (
                    <div className="search-results">
                      {searchResults.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(result.name);
                            handleLocationSelect(result);
                          }}
                          className="search-result"
                        >
                          <MapPin size={16} />
                          {result.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="map-visual">
                {sampleLocations.map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect(location)}
                    className={selectedLocation?.name === location.name ? 'map-dot selected' : 'map-dot'}
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + (index % 2) * 20}%`
                    }}
                    title={location.name}
                  />
                ))}
                
                <div className="legend">
                  <h4>Risk Level</h4>
                  <div className="legend-item">
                    <div className="legend-dot high"></div>
                    <span>High Risk</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot medium"></div>
                    <span>Medium Risk</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot low"></div>
                    <span>Low Risk</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="analysis-panel">
              <div className="quick-analysis">
                <h3>Quick Analysis</h3>
                {sampleLocations.map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect(location)}
                    className={selectedLocation?.name === location.name ? 'location-btn selected' : 'location-btn'}
                  >
                    <span>{location.name}</span>
                    <MapPin size={16} />
                  </button>
                ))}
              </div>

              {isAnalyzing ? (
                <div className="loading-container">
                  <div className="spinner"></div>
                  <p>Analyzing satellite data with Google Earth Engine...</p>
                  <p className="small">Running Mann-Kendall statistical tests</p>
                </div>
              ) : analysisData && (
                <div className="results-container">
                  <h3>Analysis Results</h3>
                  <div className="result-header">
                    <h4>{analysisData.location}</h4>
                    <p>Analysis Period: {analysisData.timeRange}</p>
                  </div>
                  
                  <div className={`risk-badge ${getRiskColor(analysisData.desertificationRisk)}`}>
                    <AlertTriangle size={16} />
                    {analysisData.desertificationRisk} Risk
                  </div>
                  
                  <div className="metrics-grid">
                    <div className="metric">
                      <div className="metric-header">
                        <span>Vegetation</span>
                        {analysisData.vegetationChange > 0 ? 
                          <TrendingUp size={16} color="#059669" /> : 
                          <TrendingDown size={16} color="#dc2626" />
                        }
                      </div>
                      <span className="metric-value">{analysisData.vegetationChange.toFixed(1)}%</span>
                    </div>
                    
                    <div className="metric">
                      <div className="metric-header">
                        <span>Precipitation</span>
                        {analysisData.precipitationTrend > 0 ? 
                          <TrendingUp size={16} color="#059669" /> : 
                          <TrendingDown size={16} color="#dc2626" />
                        }
                      </div>
                      <span className="metric-value">{analysisData.precipitationTrend.toFixed(1)}%</span>
                    </div>
                    
                    <div className="metric">
                      <span>Temperature</span>
                      <span className="metric-value">+{analysisData.temperatureTrend.toFixed(1)}°C</span>
                    </div>
                    
                    <div className="metric">
                      <span>Affected Area</span>
                      <span className="metric-value">{analysisData.affectedArea.toLocaleString()} km²</span>
                    </div>
                  </div>
                  
                  <div className="mann-kendall">
                    <h5>Mann-Kendall Test</h5>
                    <p>τ = {analysisData.mannKendallScore.toFixed(3)}</p>
                    <p>p-value = {analysisData.pValue.toFixed(4)}</p>
                    <p className="significance">
                      {analysisData.pValue < 0.05 ? 'Statistically significant trend detected' : 'No significant trend detected'}
                    </p>
                    <div className="test-explanation">
                      <strong>About this test:</strong> The Mann-Kendall test detects monotonic trends in time series data. 
                      Values closer to ±1 indicate stronger trends, while p-values less than 0.05 suggest statistical significance at 95% confidence level.
                    </div>
                    <div className="location-explanation">
                      <strong>For {analysisData.location}:</strong> {
                        analysisData.pValue < 0.05 
                          ? `The ${analysisData.mannKendallScore > 0 ? 'increasing' : 'decreasing'} trend in environmental conditions is statistically significant, indicating a ${Math.abs(analysisData.mannKendallScore) > 0.3 ? 'strong' : 'moderate'} ${analysisData.mannKendallScore > 0 ? 'improvement' : 'deterioration'} pattern over the analysis period.`
                          : `While environmental changes are occurring, they fall within normal variation ranges and don't represent a statistically significant long-term trend. This suggests ${analysisData.desertificationRisk.toLowerCase()} desertification risk is relatively stable.`
                      }
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="dashboard">
            <div className="dashboard-card">
              <h3>Global Impact</h3>
              <div className="stat">
                <span>Monitored Regions</span>
                <span>2,847</span>
              </div>
              <div className="stat">
                <span>High-Risk Areas</span>
                <span className="danger">342</span>
              </div>
              <div className="stat">
                <span>Data Points</span>
                <span className="info">1.2M+</span>
              </div>
            </div>

            <div className="dashboard-card">
              <h3>Technology Stack</h3>
              <div className="tech-item">
                <div className="tech-dot green"></div>
                <span>Google Earth Engine</span>
              </div>
              <div className="tech-item">
                <div className="tech-dot blue"></div>
                <span>React.js Frontend</span>
              </div>
              <div className="tech-item">
                <div className="tech-dot yellow"></div>
                <span>Django Backend</span>
              </div>
              <div className="tech-item">
                <div className="tech-dot purple"></div>
                <span>MongoDB Database</span>
              </div>
              <div className="tech-item">
                <div className="tech-dot red"></div>
                <span>Bootstrap Styling</span>
              </div>
            </div>

            <div className="dashboard-card">
              <h3>Recent Analyses</h3>
              <div className="activity-item">
                <MapPin size={16} />
                <span>Sahel Region analyzed</span>
                <span className="time">2m ago</span>
              </div>
              <div className="activity-item">
                <MapPin size={16} />
                <span>Australian Outback scanned</span>
                <span className="time">15m ago</span>
              </div>
              <div className="activity-item">
                <MapPin size={16} />
                <span>Rajasthan data updated</span>
                <span className="time">1h ago</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <Globe size={24} />
            <span>EcoWatch.AI</span>
          </div>
          <p>Monitoring global desertification with advanced satellite analysis and machine learning</p>
          <div className="footer-tech">
            Powered by Google Earth Engine • Built with React & Django • Data from 2000-Present
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcoWatchApp;