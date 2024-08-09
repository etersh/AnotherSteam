import { useRouter } from 'next/router';

export default function SearchResult({ data, errorMessage }) {
  const router = useRouter();

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  const handleGameClick = (game) => {
    router.push(`/game/${game.appid}`);
  };

  return (
    <div>
      {data &&
        data.map((game) => (
          <div
            key={game.appid}
            className="game-details"
            onClick={() => handleGameClick(game)}
            style={{
              cursor: 'pointer',
              border: '1px solid #ccc',
              padding: '10px',
              margin: '10px',
              borderRadius: '5px',
            }}
          >
            <h2>{game.name || 'No Name Available'}</h2>
          </div>
        ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { app } = context.query;
  let data = null;
  let errorMessage = '';

  const isGameId = /^\d+$/.test(app);

  try {
    const res = await fetch(
      `https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json`
    );

    if (!res.ok) {
      throw new Error('(SearchResult) Failed to fetch game by name');
    }

    const responseData = await res.json();
    data = responseData.applist.apps;

    //filter games by the search query
    data = isGameId
      ? data.filter((game) => game.appid.toString() === app) //check if appid matches the query
      : data.filter(
          (game) =>
            game.name && game.name.toLowerCase().includes(app.toLowerCase())
        );

    console.log('(searchResult) game: ', data);
  } catch (err) {
    console.error('(SearchResult) Error searching for game:', err);
    errorMessage = 'Error fetching data';
  }

  return {
    props: {
      data,
      errorMessage,
    },
  };
}
