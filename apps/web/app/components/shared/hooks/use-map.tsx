import { useEffect, useRef, useState } from "react";
// @ts-ignore
import HeatmapOverlay from "leaflet-heatmap";
import Leaflet from "leaflet";
import { MapData } from "@/app/types";
import isEqual from "lodash/isEqual";

export default function useMap({ data }: { data: Record<string, MapData> }) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Leaflet.Map>(null);
  const heatMapRef = useRef<HeatmapOverlay>(null);
  const [currentTimestamp, setCurrentTimestamp] = useState<string | undefined>(
    undefined,
  );
  const oldData = useRef(data);

  useEffect(() => {
    if (mapRef.current) return;
    if (mapContainerRef.current) {
      const heatLayer = new HeatmapOverlay({
        radius: 0.3,
        maxOpacity: 0.5,
        scaleRadius: true,
        useLocalExtrema: true,
        latField: "lat",
        lngField: "lng",
        valueField: "count",
      });

      const baseLayer = Leaflet.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
      );

      const map = new Leaflet.Map(mapContainerRef.current, {
        center: Leaflet.latLng({ lng: 8.042738, lat: 47.189214 }),
        zoom: 7,
        layers: [baseLayer, heatLayer],
      });
      // @ts-ignore
      mapRef.current = map;
      heatMapRef.current = heatLayer;
    }
  }, []);

  useEffect(() => {
    let frame = 0;
    let timestamps = Object.keys(data);
    let lastFrameTime = 0;
    let animationId = 0;
    const frameInterval = 1000;

    if (animationId) cancelAnimationFrame(animationId);

    function updateHeatmap(timestamp: string) {
      const chunk = data[timestamp] || [];
      heatMapRef.current.setData({
        max: 8,
        data: chunk,
      });
    }

    if (heatMapRef.current) {
      if (!isEqual(oldData.current, data)) {
        cancelAnimationFrame(animationId);
        heatMapRef.current.setData({
          max: 8,
          data: [],
        });

        function animate() {
          const now = Date.now();
          if (now - lastFrameTime >= frameInterval) {
            lastFrameTime = now;
            const time = timestamps.at(frame);
            updateHeatmap(time!);
            setCurrentTimestamp(time);
            frame = (frame + 1) % timestamps.length;
          }
          animationId = requestAnimationFrame(animate);
        }
        animationId = requestAnimationFrame(animate);
      }
    }
  }, [data]);

  return {
    mapContainerRef,
    currentTimestamp,
  };
}
