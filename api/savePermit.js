// api/savePermit.js
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body; // signed permit JSON
      const timestamp = Date.now();
      const filename = `/tmp/permit_${timestamp}.json`;

      // Save permit to temporary storage on Vercel
      fs.writeFileSync(filename, JSON.stringify(data, null, 2));

      console.log('Permit saved:', filename);
      return res.status(200).json({ message: 'Permit received and saved', filename });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save permit' });
    }
  } else {
    res.status(405).json({ error: 'Only POST allowed' });
  }
}
