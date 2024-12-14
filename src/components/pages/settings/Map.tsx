"use client";

import { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import * as L from "leaflet";
import { Icon, LatLngExpression } from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import { renderToStaticMarkup } from "react-dom/server";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import dynamic from "next/dynamic";

// Fix the default marker icon issue
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  position: [number, number];
  onPositionChange: (pos: [number, number]) => void;
}

// Component to update map center
const SetViewOnChange = ({ coords }: { coords: LatLngExpression }) => {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
};

// Separate component for the actual map content
const MapContent = ({ position, onPositionChange }: MapProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const clickHandler = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      onPositionChange([lat, lng]);
    };

    map.on("click", clickHandler);
    return () => {
      map.off("click", clickHandler);
    };
  }, [map, onPositionChange]);

  const customIcon = useMemo(
    () =>
      new Icon({
        iconUrl: `data:image/svg+xml,${encodeURIComponent(
          renderToStaticMarkup(<FaMapMarkerAlt size={20} color="#5F0101" />)
        )}`,
        iconSize: [20, 20],
        iconAnchor: [10, 20],
        popupAnchor: [0, -20],
      }),
    []
  );

  return (
    <>
      <SetViewOnChange coords={position} />
      <Marker position={position} icon={customIcon} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </>
  );
};

const LocationMap = ({ position, onPositionChange }: MapProps) => {
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (position[0] === 0 && position[1] === 0) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPosition: [number, number] = [
            pos.coords.latitude,
            pos.coords.longitude,
          ];
          onPositionChange(newPosition);
        },
        (error) => {
          console.error("Geolocation error:", error);
          onPositionChange([6.6726107, -1.5657602]); // Fallback coordinates
        }
      );
    }
    setIsMapReady(true);
  }, []);

  if (!isMapReady) {
    return (
      <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
        Loading map...
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden">
      <MapContainer
        key={`${position[0]}-${position[1]}`}
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <MapContent position={position} onPositionChange={onPositionChange} />
      </MapContainer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(LocationMap), {
  ssr: false,
});
