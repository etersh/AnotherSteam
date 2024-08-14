import { getCachedData, setCachedData } from "@/utils/cache";

export default async function handler(req, res) {
	try {
		const { id } = req.query; //extracting id from the query parameters

		if (!id) {
			return res.status(400).json({ error: "Game id is required" });
		}

		const cacheKey = `singleGame_${id}`; //unique cache key for each game
		const cachedData = getCachedData(cacheKey);

		if (cachedData) {
			return res.status(200).json({ singleGame: cachedData });
		}

		const response = await fetch(
			`https://store.steampowered.com/api/appdetails?appids=${id}&cc=ca`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch game");
		}

		const singleGame = await response.json();

		setCachedData(cacheKey, singleGame);
		res.status(200).json({ singleGame });
	} catch (error) {
		console.error("Error fetching game:", error);
		res.status(500).json({ error: error.message });
	}
}
