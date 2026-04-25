import { useEffect, useRef } from "react";
import L from "leaflet";

export default function useLeafletMap(containerId: string, isMobile: boolean) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const tileKey = process.env.NEXT_PUBLIC_TILES_API_KEY;

    const map = L.map(containerId).setView([20, 10], isMobile ? 1 : 2);
    L.tileLayer(
      `https://api.maptiler.com/tiles/satellite-mediumres/{z}/{x}/{y}.png?key=${tileKey}`,
      {
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        maxZoom: 13,
        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        crossOrigin: true,
      },
    ).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return mapRef;
}
