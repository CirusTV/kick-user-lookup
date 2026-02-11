import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    if (!username.trim()) {
      setError('Enter a username first!');
      return;
    }

    setLoading(true);
    setError('');
    setData(null);

    console.log('Lookup clicked for:', username);

    try {
      const res = await fetch(`https://kick.com/api/v2/channels/${username}`);
      console.log('API status:', res.status);

      if (!res.ok) {
        throw new Error(`Kick API error - status ${res.status} (maybe user doesn't exist?)`);
      }

      const json = await res.json();
      console.log('API response data:', json);

      setData(json);
    } catch (err) {
      console.error('Fetch failed:', err);
      setError(err.message || 'Failed to load profile – check username or try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="max-w-md mx-auto bg-black/25 backdrop-blur-xl rounded-3xl border border-cyan-500/30 shadow-2xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400 drop-shadow-lg">
            Kick Streamer Lookup
          </h1>

          {/* Input + Button – always visible */}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="cirusthavirus or xqc"
              className="w-full p-3 bg-black/50 border border-cyan-500/40 rounded-lg text-white placeholder-cyan-300 focus:outline-none focus:border-pink-500 transition"
            />

            <button
              onClick={fetchUser}
              disabled={loading || !username.trim()}
              className="watch-btn px-8 py-3 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Looking up...' : 'Lookup Streamer'}
            </button>
          </div>

          {/* Loading / Error / Result */}
          {loading && (
            <p className="mt-6 text-center text-cyan-400 animate-pulse">
              Fetching profile...
            </p>
          )}

          {error && (
            <p className="mt-6 text-center text-red-400 font-medium">
              {error}
            </p>
          )}

          {data && (
            <div className="mt-8 p-6 bg-black/40 rounded-2xl border border-cyan-500/20">
              <div className="flex flex-col items-center gap-4">
                <img
                  src={data.user?.profile_pic || 'https://kick.com/default-avatar.png'}
                  alt={data.user?.username || 'User'}
                  className="w-28 h-28 rounded-full border-4 border-pink-500 shadow-lg object-cover"
                />

                <h2 className="text-2xl font-bold text-white">
                  {data.user?.username || 'Unknown'}
                </h2>

                <p className="text-center text-cyan-300 text-sm max-w-xs">
                  {data.user?.bio || 'No bio set yet'}
                </p>

                <div className="grid grid-cols-2 gap-6 w-full text-center mt-4">
                  <div>
                    <p className="text-sm text-gray-300">Followers</p>
                    <p className="text-xl font-bold text-neonCyan">
                      {data.followersCount?.toLocaleString() || '0'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-300">Status</p>
                    <p className={`text-xl font-bold ${data.livestream?.is_live ? 'text-green-400' : 'text-red-400'}`}>
                      {data.livestream?.is_live ? 'LIVE' : 'Offline'}
                    </p>
                  </div>

                  {data.livestream?.is_live && (
                    <div className="col-span-2">
                      <p className="text-sm text-gray-300">Current Viewers</p>
                      <p className="text-xl font-bold text-pink-400">
                        {data.livestream.viewer_count?.toLocaleString() || '0'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
