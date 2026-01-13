import '../css/index.css';
import Addplace from '../components/Addplace';
import { useEffect, useState } from 'react';
import Card from '../components/CommunityCard.jsx';

const API_BASE_URL = location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://api.yourdomain.com";


function Community() {
  const [open, setOpen] = useState(false);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);

    async function fetchCommunities() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/community`);
        const result = await res.json();

        if (res.ok) {
          setCommunities(result.data || []); 
        } else {
          setError(result.message || 'Failed to load communities.');
        }
      } catch (err) {
        setError('Failed to load communities.');
      } finally {
        setLoading(false);
      }
    }

    fetchCommunities();
  }, []);


  return (
    <section className="w-full bg-(--bg) text-(--text) min-h-screen">
        <main className='w-full md:max-w-275 md:mx-auto flex flex-col items-center px-8 py-4 md:py-8'>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-10">DerLgJmuyKnea</h1>        
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <article className="w-fit mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {communities.map((community) => (
                <Card key={community.id} card={community}  onUserClick={(user) => {
                  setUserPf(user);
                  setShowProfile(true);
                }} />
              ))}
            </article>
        </main>

        <button id="addplaceBtn" className="fixed bottom-6 right-6 z-50" 
          onClick={() => setOpen(true)}
        >ADD PLACE
        </button>
        {open && <Addplace onClose={(newCommunity) => {
          setCommunities((prev) => [newCommunity, ...prev]);
          setOpen(false);
        }} className="transition-transform duration-300" />}
    </section>
  );
}

export default Community;