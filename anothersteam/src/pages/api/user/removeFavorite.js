import dbConnect from '@/utils/mongodb';
import User from '@/models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();

  const { steamid, gameId } = req.body;

  try {
    const user = await User.findOne({ steamid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    //check if the game exists already
    if (user.favorites.includes(gameId)) {
      user.favorites = user.favorites.filter((id) => id !== gameId);
      await user.save();
      return res.status(200).json({ message: 'Game removed from favorites' });
    } else {
      return res.status(400).json({ message: 'Game not found in favorites' });
    }
  } catch (error) {
    console.error('Error removing favorite:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
}
