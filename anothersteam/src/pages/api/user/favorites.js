import dbConnect from '@/utils/mongodb';
import User from '@/models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { steamid } = req.query;

    if (!steamid) {
      return res
        .status(400)
        .json({ success: false, error: 'Steam ID is required' });
    }

    try {
      const user = await User.findOne({ steamid });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: 'User not found' });
      }

      //ensure favorites is returned as an array
      res.status(200).json({
        favorites: Array.isArray(user.favorites) ? user.favorites : [],
      });
    } catch (error) {
      console.error('Error during MongoDB query:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
