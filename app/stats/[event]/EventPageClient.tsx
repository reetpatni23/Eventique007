'use client';

import { useEffect, useState } from 'react';
import type { Models } from 'appwrite'; // type-only
import appwriteConfig, { ServerConfig } from '@/constants/appwrite_config';

interface EventData {
  $id?: string;
  name?: string;
  description?: string;
  details?: string;
  createdAt?: string;
  [key: string]: any; // allow extra fields from Appwrite
}

export default function EventPageClient({ event }: { event: EventData }) {
  const [eventData, setEventData] = useState<EventData>(event);

  useEffect(() => {
    async function fetchEvent() {
      try {
        if (!eventData.$id) return;
        const res = await appwriteConfig.databases.getDocument(
          ServerConfig.databaseId,   // ✅ use config IDs
          ServerConfig.collectionId, // ✅ use config IDs
          eventData.$id
        );
        setEventData(res as unknown as EventData);
      } catch (err) {
        console.error('Error fetching event:', err);
      }
    }
    fetchEvent();
  }, [eventData.$id]);

  return (
    <div>
      <h2>{eventData.name ?? 'Untitled Event'}</h2>
      <p>{eventData.description ?? 'No description available'}</p>
      {eventData.details && <p>{eventData.details}</p>}
      {eventData.createdAt && <small>Created: {eventData.createdAt}</small>}
    </div>
  );
}
