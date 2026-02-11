import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    if (!username.trim()) {
      setError('Enter a Kick username first!');
      return;
    }

    setLoading(true);
    setError('');
    setData(null);

    console.log('🔍 Looking up:', username);

    try {
      const res = await fetch(`https://kick.com/api/v2/channels/${username}`);
      console.log('API status:', res.status);

      if (!res.ok) {
        throw new Error(`Kick API error - status ${res.status}. User might not exist or API is down.`);
      }

      const json = await res.json();
      console.log('Raw API data:', json);

      setData(json);
    } catch (err) {
      console.error('Fetch failed:', err);
      setError(err.message || 'Something broke – check username or try again');
    } finally {
      setLoading(false);
    }
  };

  // Safe data pulling
  const user = data?.user || {};
  const livestream = data?.livestream || {};
  const followers = data?.followers_count?.toLocaleString() || '0';
  const isLive = livestream.is_live || false;
  const viewers = livestream.viewer_count?.toLocaleString() || '0';
  const bio = user.bio || 'No bio set';
  const joinedRaw = user.created_at || data?.created_at;
  const joined = joinedRaw 
    ? new Date(joinedRaw).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Unknown';
  const verified = user.verified ? '✅ Verified' : '';

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-6">
      {/* Locked core container – nothing can hide this */}
      <div className="max-w-5xl mx-auto bg-black/25 backdrop-blur-xl rounded-3xl border border-cyan-500/30 shadow-2xl overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-cyan-400 drop-shadow-lg">
            Kick Streamer Lookup
          </h1>

          {/* Input + Button – always on top, never hides */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              placeholder="cirusthavirus, xqc, loochy..."
              className="flex-1 p-4 bg-black/50 border border-cyan-500/40 rounded-xl text-white placeholder-cyan-300 focus:outline-none focus:border-pink-500 transition text-lg"
            />

            <button
              onClick={fetchUser}
              disabled={loading || !username.trim()}
              className="watch-btn px-8 py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed md:w-auto w-full"
            >
              {loading ? 'Fetching...' : 'Lookup Streamer'}
            </button>
          </div>

          {/* Feedback – always visible when needed */}
          {loading && (
            <p className="text-center text-cyan-400 animate-pulse text-lg mb-4">
              Pulling profile...
            </p>
          )}

          {error && (
            <p className="text-center text-red-400 font-medium text-lg mb-4">
              {error}
            </p>
          )}

          {/* Result – only shows if data exists, doesn't hide the top */}
          {data && (
            <div className="p-6 md:p-8 bg-black/30 rounded-2xl border border-cyan-500/20">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
                <img
                  src={user.profile_pic || 'https://kick.com/default-avatar.png'}
                  alt={user.username || 'User'}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-pink-500 shadow-2xl object-cover flex-shrink-0"
                />

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-3">
                    {user.username || 'User'}
                    {verified && <span className="text-green-400 text-2xl">✓</span>}
                  </h2>

                  <p className="text-lg md:text-xl text-cyan-300 mb-6 max-w-prose mx-auto md:mx-0">
                    {bio}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center md:text-left">
                    <div>
                      <p className="text-sm text-gray-300">Followers</p>
                      <p className="text-2xl font-bold text-neonCyan">{followers}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-300">Status</p>
                      <p className={`text-2xl font-bold ${isLive ? 'text-green-400' : 'text-red-400'}`}>
                        {isLive ? 'LIVE' : 'Offline'}
                      </p>
                    </div>

                    {isLive && (
                      <div>
                        <p className="text-sm text-gray-300">Viewers</p>
                        <p className="text-2xl font-bold text-pink-400">{viewers}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-gray-300">Joined</p>
                      <p className="text-lg text-cyan-300">{joined}</p>
                    </div>
                  </div>
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
