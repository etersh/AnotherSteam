import React from 'react';

const SteamDBChart = ({ appid }) => {
  const embedUrl = `https://steamdb.info/embed/?appid=${appid}`;

  return (
    <div style={{ width: '100%', height: '500px', border: 'none' }}>
      <iframe
        src={embedUrl}
        style={{ width: '100%', height: '100%', border: 'none' }}
        title={`SteamDB Stats for AppID ${appid}`}
        allowFullScreen
      />
    </div>
  );
};

export default SteamDBChart;