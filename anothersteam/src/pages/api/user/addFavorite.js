import User from '@/models/User';
import dbConnect from '@/utils/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();

  const { steamid, gameId } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ steamid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    //check if game exists already
    if (!user.favorites.includes(gameId)) {
      user.favorites.push(gameId);
      await user.save();
      return res.status(200).json({ message: 'Game added to Favorites' });
    } else {
      return res.status(400).json({ message: 'Game is already in favorites' });
    }
  } catch (err) {
    console.error('Error adding favorite:', err);
    return res.status(500).json({ message: 'Internal server error:', err });
  }
}
