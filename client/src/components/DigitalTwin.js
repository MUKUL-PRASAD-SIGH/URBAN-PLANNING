import React, { useEffect, useRef, useState } from 'react';
import { Viewer, createWorldTerrainAsync, Cartesian3, Color, LabelStyle, VerticalOrigin, Cartesian2 } from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

const TOMTOM_API_KEY = 'YNZy2ENqj90qWU4kl11V4B7AuzxlZfN3'; // Replace with your actual TomTom API key

const DigitalTwin = () => {
  const cesiumContainer = useRef(null);
  const viewerRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [trafficData, setTrafficData] = useState([]);

  useEffect(() => {
    // Fetch user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error fetching location:', error);
      }
    );
  }, []);

  useEffect(() => {
    const fetchTrafficData = async () => {
      if (location) {
        try {
          const response = await fetch(
            `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=${TOMTOM_API_KEY}&point=${location.latitude},${location.longitude}`
          );
          const data = await response.json();
          if (data.flowSegmentData) {
            setTrafficData([data.flowSegmentData]);
          }
        } catch (error) {
          console.error('Error fetching traffic data:', error);
        }
      }
    };

    fetchTrafficData();
  }, [location]);

  useEffect(() => {
    const initializeViewer = async () => {
      if (cesiumContainer.current && !viewerRef.current) {
        // Initialize Cesium viewer
        viewerRef.current = new Viewer(cesiumContainer.current, {
          terrainProvider: await createWorldTerrainAsync(),
          animation: false,
          baseLayerPicker: false,
          fullscreenButton: false,
          vrButton: false,
          geocoder: false,
          homeButton: false,
          infoBox: false,
          sceneModePicker: false,
          selectionIndicator: false,
          timeline: false,
          navigationHelpButton: false,
          navigationInstructionsInitiallyVisible: false,
        });
      }

      // Add traffic data points
      if (viewerRef.current && trafficData.length > 0) {
        trafficData.forEach((segment) => {
          viewerRef.current.entities.add({
            position: Cartesian3.fromDegrees(location.longitude, location.latitude, 0),
            point: {
              pixelSize: 10,
              color: Color.RED,
              outlineColor: Color.WHITE,
              outlineWidth: 2,
            },
            label: {
              text: `Speed: ${segment.currentSpeed} km/h`,
              font: '14pt sans-serif',
              style: LabelStyle.FILL_AND_OUTLINE,
              outlineWidth: 2,
              verticalOrigin: VerticalOrigin.BOTTOM,
              pixelOffset: new Cartesian2(0, -9),
            },
          });
        });
      }
    };

    initializeViewer();

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [trafficData]);

  return (
    <div
      ref={cesiumContainer}
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
      }}
    />
  );
};

export default DigitalTwin;