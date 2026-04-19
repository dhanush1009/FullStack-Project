import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Radio, Volume2, Signal, AlertTriangle } from "lucide-react";

const RealisticRadioPage = () => {
  const audioRef = useRef(null);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  // Fetch weather/emergency stations from Radio Browser API
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5001/proxy/radio-stations")
      .then((res) => res.json())
      .then((data) => {
        setStations(data);
        if (data.length > 0) {
          setSelectedStation(data[0]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setIsLoading(false);
      });
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        setConnectionStatus('disconnected');
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setConnectionStatus('connected');
          })
          .catch((err) => {
            console.log("Playback error:", err);
            setConnectionStatus('error');
          });
      }
    }
  };

  const handleStationChange = (e) => {
    const station = stations.find(st => st.stationuuid === e.target.value);
    setSelectedStation(station);
    setIsPlaying(false);
    setConnectionStatus('disconnected');
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected': return 'LIVE BROADCAST';
      case 'error': return 'CONNECTION ERROR';
      default: return 'STANDBY';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-yellow-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                EMERGENCY RADIO
              </h1>
              <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Signal className={`w-4 h-4 ${getStatusColor()}`} />
              <span className={`text-sm font-mono font-bold ${getStatusColor()}`}>
                {getStatusText()}
              </span>
            </div>
          </div>

          {/* Main Radio Interface */}
          <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-lg rounded-2xl border border-slate-700 shadow-2xl p-8">
            
            {/* Station Selection */}
            {stations.length > 0 && (
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                  Broadcasting Station
                </label>
                <div className="relative">
                  <Radio className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                  <select
                    onChange={handleStationChange}
                    value={selectedStation?.stationuuid || ""}
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl pl-12 pr-4 py-4 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200 appearance-none cursor-pointer"
                  >
                    {stations.map((st) => (
                      <option key={st.stationuuid} value={st.stationuuid} className="bg-slate-700">
                        {st.name} • {st.country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Audio Player & Controls */}
            {selectedStation && (
              <div className="space-y-6">
                <audio
                  ref={audioRef}
                  className="hidden"
                  preload="none"
                  src={selectedStation.url_resolved}
                />

                {/* Current Station Info */}
                <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white text-lg mb-1">
                        {selectedStation.name}
                      </h3>
                      <p className="text-slate-300 text-sm">
                        {selectedStation.country} • {selectedStation.codec?.toUpperCase() || 'STREAM'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-5 h-5 text-slate-400" />
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-4 rounded-full ${
                              isPlaying ? 'bg-green-500 animate-pulse' : 'bg-slate-600'
                            }`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Play/Pause Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handlePlayPause}
                    disabled={isLoading}
                    className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-full p-6 shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center justify-center w-16 h-16">
                      {isLoading ? (
                        <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : isPlaying ? (
                        <Pause className="w-8 h-8" />
                      ) : (
                        <Play className="w-8 h-8 ml-1" />
                      )}
                    </div>
                    
                    {/* Ripple effect */}
                    {isPlaying && (
                      <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping opacity-20"></div>
                    )}
                  </button>
                </div>

                {/* Status Messages */}
                <div className="text-center">
                  {isPlaying && (
                    <p className="text-green-400 font-semibold flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Broadcasting Live
                    </p>
                  )}
                  {connectionStatus === 'error' && (
                    <p className="text-red-400 font-semibold">
                      Unable to connect to station. Please try another.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && !selectedStation && (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-3 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-300">Loading emergency stations...</p>
              </div>
            )}

            {/* Emergency Info */}
            <div className="mt-8 p-4 bg-gradient-to-r from-yellow-900/20 to-red-900/20 rounded-xl border border-yellow-700/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-1">Emergency Broadcast System</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Stay tuned for real-time emergency updates, weather alerts, and critical public safety information. 
                    This system provides continuous monitoring of official emergency channels.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-slate-400 text-sm">
            <p>Emergency Radio Service • Always Stay Connected</p>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

export default RealisticRadioPage;