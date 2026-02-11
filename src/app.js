import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    setLoading(true);
    setError('');
    setData(null);

    try {
      const res = await fetch(`https://kick.com/api/v2/channels/${username}`);
      if (!res.ok) throw new Error('User not found or API error');
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-neonCyan">Kick User Lookup</h1>

      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Kick username"
        className="w-full p-3 mb-4 bg-black/50 border border-neonCyan rounded-lg text-white placeholder-cyan-300 focus:outline-none focus:border-neonPink"
      />

      <button 
        onClick={fetchUser} 
        className="w-full p-3 bg-gradient-to-r from-neonCyan to-neonPink text-white font-bold rounded-lg hover:brightness-110 transition"
        disabled={loading || !username}
      >
        {loading ? 'Loading...' : 'Lookup User'}
      </button>

      {error && <p className="mt-4 text-center text-red-400">{error}</p>}

      {data && (
        <div className="mt-6 p-5 bg-black/40 rounded-lg border border-neonCyan">
          <img 
            src={data.user.profile_pic || data.user.default_picture} 
            alt={data.user.username}
            className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-neonPink shadow-lg"
          />
          <h2 className="text-xl font-bold text-center mb-2">{data.user.username}</h2>
          <p className="text-center mb-4 text-cyan-300">{data.user.bio || 'No bio'}</p>
          <p>Followers: {data.followersCount}</p>
          <p>Live: {data.livestream.is_live ? 'Yes' : 'No'}</p>
          {data.livestream.is_live && <p>Viewers: {data.livestream.viewer_count}</p>}
        </div>
      )}
    </div>
  );
}
export default App;
