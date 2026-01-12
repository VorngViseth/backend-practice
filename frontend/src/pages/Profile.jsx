import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommunityCard from "../components/CommunityCard";

const API_BASE_URL =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://api.yourdomain.com";

function Profile() {
  const { userId } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${API_BASE_URL}/api/community/user/${userId}`
        );
        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Failed to load user posts");
        }

        setUserPosts(result.data || []);
      } catch (err) {
        setError(err.message);
        setUserPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUserPosts();
  }, [userId]);

  return (
    <section>
      <h1 className="text-4xl font-bold mb-6">
        User Profile {userId}
      </h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && userPosts.length === 0 && (
        <p className="text-gray-500">No posts found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userPosts.map(post => (
          <CommunityCard key={post.id} card={post} />
        ))}
      </div>
    </section>
  );
}

export default Profile;
