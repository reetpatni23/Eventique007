"use client";

import { useEffect, useState } from "react";

export const dynamic = "force-dynamic"; // ✅ avoid prerender issues

const MyEventPage = () => {
  const [event, setEvent] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const res = await fetch("/api/event", { cache: "no-store" }); // ✅ prevents cached build-time fetch
        if (!res.ok) throw new Error("Failed to fetch event data");
        const data = await res.json();
        setEvent(data.event);
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };

    fetchEventData();
  }, []); // ✅ safe: runs only once

  return (
    <div>
      <h1>Event: {event ?? "Loading..."}</h1>
    </div>
  );
};

export default MyEventPage;
