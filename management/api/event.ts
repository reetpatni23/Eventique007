import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Fetch your event data from the database or any other source
  const event = { name: 'Sample Event', date: '2025-08-31' };

  res.status(200).json({ event });
}