import '../css/index.css';

function TvnaCard({ card }) {
    return (
        <div className='w-full max-w-90 mx-auto bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:scale-105'>
            <div className='relative overflow-hidden bg-gray-200 h-48'>
                <img 
                    src={card.image?.url} 
                    alt={card.title}
                    className='w-full h-full object-cover'
                />
            </div>
            <div className='p-6'>
                <h2 className='text-xl font-bold text-gray-800 mb-2 line-clamp-2'>{card.title}</h2>
                <p className='text-gray-600 text-sm line-clamp-3'>{card.description}</p>
                <button className='mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors'>
                    View Details
                </button>
            </div>
        </div>
    );
}

export default TvnaCard;