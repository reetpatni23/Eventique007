import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Example: Read file from server
      const filePath = req.body.filePath;
      const data = fs.readFileSync(filePath, 'utf-8');

      res.status(200).json({ message: 'File read successfully', data });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error reading file', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}