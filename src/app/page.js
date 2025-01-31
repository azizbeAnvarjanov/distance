"use client";
import { useState, useEffect } from "react";
import { getDistance } from "geolib";

const officeLocation = {
  latitude: 40.930132004651966, // O'zgarishi mumkin
  longitude: 71.89369133470575, // O'zgarishi mumkin
};

export default function Home() {
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [status, setStatus] = useState("Joylashuv aniqlanmoqda...");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          const distance = getDistance({ latitude, longitude }, officeLocation);

          setDistance(distance);
          setStatus(
            distance <= 100 ? "Siz ishxonadasiz" : "Siz ishxonada emassiz"
          );
        },
        (error) => {
          console.error(error);
          setStatus("Joylashuvni olishda xatolik yuz berdi.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      setStatus("Brauzer geolokatsiyani qo‘llab-quvvatlamaydi.");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Xodim joylashuvi azizbek</h1>
      <p>
        <strong>Status:</strong> {status}
      </p>
      {location && (
        <p>
          <strong>Hozirgi joylashuv:</strong> {location.latitude},{" "}
          {location.longitude}
        </p>
      )}
      {distance !== null && (
        <p>
          <strong>Masofa:</strong> {distance} metr
        </p>
      )}
    </div>
  );
}
