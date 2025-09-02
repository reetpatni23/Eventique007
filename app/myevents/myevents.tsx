"use client";

import { useEffect, useState } from "react";
import Header from "../components/header";
import { Models } from "appwrite";
import { MdOutlinePlace } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { useRouter } from "next/navigation"; // ✅ fixed import
import appwriteConfig, { ServerConfig } from "../constants/appwrite_config";

export const dynamic = "force-dynamic"; // ✅ disable prerender

export default function MyEvents() {
  const server = ServerConfig;
  const [events, setEvents] = useState<Models.Document[]>([]);
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState<string | null>(null); // ✅ safe userId
  const router = useRouter();

  useEffect(() => {
    // ✅ load user id safely
    const stored = localStorage.getItem("userInfo");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserId(parsed.$id || null);
      } catch (e) {
        console.error("Failed to parse userInfo:", e);
      }
    }

    setLoader(true);
    appwriteConfig.databases
      .listDocuments(
        process.env.NEXT_PUBLIC_DATABASEID!,
        process.env.NEXT_PUBLIC_EVENT_COLLID!
      )
      .then(
        (response) => setEvents(response.documents),
        (error) => console.log(error)
      )
      .finally(() => setLoader(false));

    const unsubscribe = appwriteConfig.client.subscribe(
      `databases.${process.env.NEXT_PUBLIC_DATABASEID}.collections.${process.env.NEXT_PUBLIC_EVENT_COLLID}.documents`,
      () => {
        appwriteConfig.databases
          .listDocuments(
            process.env.NEXT_PUBLIC_DATABASEID!,
            process.env.NEXT_PUBLIC_EVENT_COLLID!
          )
          .then(
            (response) => setEvents(response.documents),
            (error) => console.log(error)
          );
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto">
        <p className="text-3xl font-bold mb-2 text-center mx-auto py-5">
          My Active Events
        </p>

        {loader ? (
          <p className="mx-auto text-red-700">Loading....</p>
        ) : (
          <div className="py-10">
            {events.map((item) =>
              userId === item.created ? ( // ✅ use state instead of raw localStorage
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
                        <p className="mb-8 leading-relaxed">{item.description}</p>

                        <div className="flex items-center mb-2">
                          <MdOutlinePlace size="30" />
                          <p className="mb-8 leading-relaxed mx-2">
                            Type: {item.type}
                          </p>
                        </div>
                        <div className="flex items-center mb-2">
                          <IoIosPeople size="30" />
                          <p className="mb-8 leading-relaxed mx-2">
                            Audience: {item.audience}
                          </p>
                        </div>

                        <div className="flex justify-center">
                          <button
                            className="inline-flex text-white bg-[#f02e65] border-0 py-2 px-6 focus:outline-none hover:bg-[#b51349] rounded text-lg"
                            onClick={() => router.push(`/events/${item.$id}`)}
                          >
                            Register
                          </button>

                          {userId === item.created && (
                            <div>
                              <button
                                className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                                onClick={() => router.push(`/stats/${item.$id}`)}
                              >
                                View Registrations
                              </button>

                              <button
                                className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                                onClick={() => {
                                  appwriteConfig.databases
                                    .deleteDocument(
                                      server.databaseId,
                                      server.collectionId,
                                      item.$id
                                    )
                                    .then(() => {
                                      alert("Event deleted successfully!");
                                    })
                                    .catch((error) =>
                                      console.error("Error deleting event:", error)
                                    );
                                }}
                              >
                                Delete Event
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}
