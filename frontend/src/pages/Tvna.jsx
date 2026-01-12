import '../css/index.css';
import TvnaCard from '../components/TvnaCard.jsx';
// import TvnaNavbar from '../components/TvnaNavbar.jsx';
import { useState,useEffect } from 'react';

const API_BASE_URL = location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://api.yourdomain.com";

function Tvna() {

    const [derlg, setderlg] = useState([]);
    const [nhamey, setnhamey] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('TvNa');

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

    return (
        <section className="w-full text-(--text) bg-(--bg) min-h-screen">
            <main className='w-full max-w-(--max-width) mx-auto px-8 py-8 flex flex-col items-center'>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-10">TvNa</h1>        
                {/* <TvnaNavbar />              */}
                <nav>
                    <ul className='flex flex-row gap-10 mb-2.5 md:text-[18px] lg:gap-15 lg:text-[20px] font-medium'>
                        <li>
                            <button onClick={() => setActiveTab('TvNa')}
                                className={`pb-2 transition-all flex flex-row items-center gap-1 
                                    ${activeTab === 'TvNa' ? 
                                    'border-b-2 border-(--indigo) text-(--indigo) font-semibold' 
                                    : 'text-(--text) hover:text-(--hover-text)'
                                }`}
                            >
                                <span className="material-symbols-outlined">not_listed_location</span>
                                TvNa
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => setActiveTab('DerLg')}
                                className={`pb-2 transition-all flex flex-row items-center gap-1 
                                    ${activeTab === 'DerLg' ?
                                        'border-b-2 border-(--indigo) text-(--indigo) font-semibold' 
                                        : 'text-(--text) hover:text-(--hover-text)'
                                }`}
                            >
                                <span className="material-symbols-outlined">footprint</span>
                                DerLg
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => setActiveTab('NhamEy')}
                                className={`pb-2 transition-all flex flex-row items-center gap-1 
                                    ${activeTab === 'NhamEy' ?
                                        'border-b-2 border-(--indigo) text-(--indigo) font-semibold' 
                                        : 'text-(--text) hover:text-(--hover-text)'
                                }`}
                            >
                                <span className="material-symbols-outlined">yoshoku</span>
                                NhamEy
                            </button>
                        </li>
                    </ul>
                </nav>

                {loading && <p className="text-(--muted) text-center py-8">Loading...</p>}
                {error && <p className="text-red-500 text-center py-8">{error}</p>}

                {activeTab === 'TvNa' && (
                    <>
                        <section className='mb-12'>
                            <h2 className='text-2xl font-bold mb-6'>DerLg</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {derlg.map((card) => (
                                    <TvnaCard key={card.id} card={card} />
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className='text-2xl font-bold mb-6'>Nhamey</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {nhamey.map((card) => (
                                    <TvnaCard key={card.id} card={card} />
                                ))}
                            </div>
                        </section>
                    </>
                )}

                {activeTab === 'DerLg' && (
                    <>
                        <section className={activeTab === 'DerLg' ? '' : 'hidden'}>
                            <h2 className='text-2xl font-bold text mb-6'>DerLg</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {derlg.map((card) => (
                                    <TvnaCard key={card.id} card={card} />
                                ))}
                            </div>
                        </section>
                    </>
                )}

                {activeTab === 'NhamEy' && (
                    <>
                        <section className={activeTab === 'NhamEy' ? '' : 'hidden'}>
                            <h2 className='text-2xl font-bold mb-6'>Nhamey</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {nhamey.map((card) => (
                                    <TvnaCard key={card.id} card={card} />
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </main>
        </section>
    );
}

export default Tvna;