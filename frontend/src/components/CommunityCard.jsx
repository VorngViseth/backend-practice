import '../css/index.css';

function CommunityCard({ card }) {
    return (
        <div key={card.id} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 shrink-0 w-full h-full max-w-90 mx-auto">
            <img
            src={card.image?.url}
            alt={card.title}
            className="w-full object-cover h-48 block"
            />
            <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
            <p className="text-gray-700 mb-4">{card.description}</p>
            <div className="flex items-center">
                <span className="text-gray-600">
                {card.user?.userName || 'Anonymous'}
                </span> 
            </div>
            </div>
        </div>
    );
}

export default CommunityCard;