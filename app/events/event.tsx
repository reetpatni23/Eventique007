"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic"; // ✅ disable prerender

interface Event {
  $id: string;
  eventname: string;
  agenda: string;
  url: string;
  created: string;
}

const EventListing = () => {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [userId, setUserId] = useState<string | null>(null); // ✅ store userId safely

  useEffect(() => {
    // Load user info once on client
    const stored = localStorage.getItem("userInfo");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserId(parsed.$id || null);
      } catch (e) {
        console.error("Failed to parse userInfo:", e);
      }
    }

    // TODO: replace with API/Appwrite fetch
    // Example: setEvents(fetchedData);
  }, []);

  const deleteEvent = (eventId: string) => {
    console.log("Deleting event with ID:", eventId);
    setEvents(events.filter((event) => event.$id !== eventId));
  };

  return (
    <div>
      <p className="text-3xl font-bold mb-2 text-center mx-auto py-5">
        All Active Events
      </p>
      <div className="py-10">
        {events.map((item) => (
          <div key={item.$id} className="py-2">
            <section className="text-gray-600 body-font">
              <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                  <img
                    className="object-cover object-center rounded"
                    alt="event"
                    src={item.url}
                  />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                    {item.eventname}
                  </h1>
                  <p className="mb-8 leading-relaxed">{item.agenda}</p>
                  <div className="flex justify-center">
                    <button
                      className="inline-flex text-white bg-[#f02e65] border-0 py-2 px-6 focus:outline-none hover:bg-[#b51349] rounded text-lg"
                      onClick={() => router.push(`/events/${item.$id}`)}
                    >
                      Register
                    </button>

                    {userId === item.created && (
                      <button
                        className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                        onClick={() => deleteEvent(item.$id)}
                      >
                        Delete Event
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventListing;
