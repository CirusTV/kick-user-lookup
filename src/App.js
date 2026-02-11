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

    console.log('Looking up:', username);

    try {
      const res = await fetch(`https://kick.com/api/v2/channels/${username}`);
      console.log('Status:', res.status);

      if (!res.ok) {
        throw new Error(`Kick API error - status ${res.status} (user might not exist)`);
      }

      const json = await res.json();
      console.log('Raw API data:', json); // ← this will show in console what we're getting

      setData(json);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to load – try again or check username');
    } finally {
      setLoading(false);
    }
  };

  const followers = data?.followersCount || data?.follower_count || 0;
  const isLive = data?.livestream?.is_live || false;
  const viewers = data?.livestream?.viewer_count || 0;
  const bio = data?.user?.bio || 'No bio set';
  const createdAt = data?.user?.created_at ? new Date(data.user.created_at).toLocaleDateString() : 'Unknown';
  const verified = data?.user?.verified ? '✅ Verified' : '';

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-black/20 backdrop-blur-xl rounded-3xl border border-cyan-500/25 shadow-2xl overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-cyan-400 drop-shadow-lg">
            Kick Streamer Lookup
          </h1>

          {/* Input + Button */}
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
              disabled={loading || !username}
              className="watch-btn px-8 py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed md:w-auto w-full"
            >
              {loading ? 'Fetching...' : 'Lookup'}
            </button>
          </div>

          {/* Loading / Error */}
          {loading && <p className="text-center text-cyan-400 animate-pulse text-lg">Loading profile...</p>}
          {error && <p className="text-center text-red-400 font-medium text-lg">{error}</p>}

          {/* Profile Card */}
          {data && (
            <div className="p-6 md:p-8 bg-black/30 rounded-2xl border border-cyan-500/20">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
                <img
                  src={data.user?.profile_pic || 'https://kick.com/default-avatar.png'}
                  alt={data.user?.username || 'User'}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-pink-500 shadow-2xl object-cover flex-shrink-0"
                />

                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {data.user?.username || 'User'} {verified && <span className="text-green-400 text-xl">✓</span>}
                  </h2>

                  <p className="text-cyan-300 mb-4 text-lg">{bio}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center md:text-left">
                    <div>
                      <p className="text-sm text-gray-300">Followers</p>
                      <p className="text-2xl font-bold text-neonCyan">{followers.toLocaleString()}</p>
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
                        <p className="text-2xl font-bold text-pink-400">{viewers.toLocaleString()}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-gray-300">Joined</p>
                      <p className="text-lg text-cyan-300">{createdAt}</p>
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
