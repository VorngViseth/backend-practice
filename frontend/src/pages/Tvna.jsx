import '../css/index.css';
import TvnaCard from '../components/TvnaCard.jsx';
import { useState,useEffect } from 'react';

const API_BASE_URL = location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://api.yourdomain.com";

function Tvna() {

    const [derlg, setderlg] = useState([]);
    const [nhamey, setnhamey] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);

        async function fetchTvna(type, setter) {
            try {
                const res = await fetch(`${API_BASE_URL}/api/${type}`);
                const result = await res.json();

                if (res.ok) {
                    setter(result.data || []); 
                } else {
                    setError(result.message || `Failed to load ${type} data.`);
                }
            } catch (err) {
                setError(`Failed to load ${type} data.`);
            } finally {
                setLoading(false);
            }
        }
        fetchTvna('derlg', setderlg); 
        fetchTvna('nhamey', setnhamey);
    }, []);

    // const CardComponent = ({ card }) => (
    //     <div className='w-full max-w-90 mx-auto bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105'>
    //         <div className='relative overflow-hidden bg-gray-200 h-48'>
    //             <img 
    //                 src={card.image?.url} 
    //                 alt={card.title}
    //                 className='w-full h-full object-cover'
    //             />
    //         </div>
    //         <div className='p-6'>
    //             <h2 className='text-xl font-bold text-gray-800 mb-2 line-clamp-2'>{card.title}</h2>
    //             <p className='text-gray-600 text-sm line-clamp-3'>{card.description}</p>
    //             <button className='mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors'>
    //                 View Details
    //             </button>
    //         </div>
    //     </div>
    // );

    return (
        <section className="w-full min-h-screen">
            <main className='w-full max-w-275 mx-auto px-4 py-8 flex flex-col items-center'>
                <div className='flex items-center'>
                    <h1 className='text-4xl font-bold text-gray-900 mb-2'>TvNa</h1>
                </div>                
                {loading && <p className="text-gray-500 text-center py-8">Loading...</p>}
                {error && <p className="text-red-500 text-center py-8">{error}</p>}

                <section className='mb-12'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-6'>DerLg</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {derlg.map((card) => (
                            <TvnaCard key={card.id} card={card} />
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className='text-2xl font-bold text-gray-900 mb-6'>Nhamey</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {nhamey.map((card) => (
                            <TvnaCard key={card.id} card={card} />
                        ))}
                    </div>
                </section>
            </main>
        </section>
    );
}

export default Tvna;