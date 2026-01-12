import '../css/index.css';

function TvnaCard({ card }) {
    return (
        <div key={card.id} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 shrink-0 w-full h-full max-w-90 mx-auto bg-(--signinbg)">
            <div className='relative overflow-hidden bg-(--bg) h-48'>
                <img 
                    src={card.image?.url} 
                    alt={card.title}
                    className='w-full h-full object-cover'
                />
            </div>
            <div className='p-6'>
                <h2 className='text-xl font-bold text-(--text) mb-2 line-clamp-2'>{card.title}</h2>
                <p className='text-(--text) text-sm line-clamp-3'>{card.description}</p>
                <button className='mt-4 w-full bg-(--indigo) hover:bg-(--hover-btn) text-white font-semibold py-2 px-4 rounded transition-colors'>
                    View Details
                </button>
            </div>
        </div>
    );
}

export default TvnaCard;