import { Link } from "react-router-dom";

function CommunityCard({ card }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition bg-(--signinbg)">
      
      <Link
        to={`/profile/${card.user.userId}`}
        className="flex items-center mx-5 my-4 gap-2.5"
      >
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
          <img
            src={card.user?.userPfp}
            alt="pfp"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-lg font-semibold">
          {card.user?.userName || "Anonymous"}
        </span>
      </Link>

      <img
        src={card.image?.url}
        alt={card.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-bold">{card.title}</h3>
        <p className="text-gray-500 text-sm">{card.description}</p>
      </div>
    </div>
  );
}

export default CommunityCard;
