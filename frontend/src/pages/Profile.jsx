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
  const [ userInfo, setUserInfo ] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        setLoading(true);
        setError(null);

        const [ userRes, postsRes ] = await Promise.all([
          fetch(`${API_BASE_URL}/api/users/${userId}`),
          fetch(`${API_BASE_URL}/api/community/user/${userId}`)
        ]);

        const userResult = await userRes.json();
        const postsResult = await postsRes.json();

        if (!postsRes.ok) {
          throw new Error(postsResult.message || "Failed to load user posts");
        }
        
        setUserPosts(postsResult.data || []);
        setUserInfo(userResult.data || null);
      } catch (err) {
        setError(err.message);
        setUserPosts([]);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUserPosts();
  }, [userId]);

  return (
    <section>
      <h1 className="text-4xl font-bold mb-6">
        {userInfo ? userInfo.name : "User Profile"}
        
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
