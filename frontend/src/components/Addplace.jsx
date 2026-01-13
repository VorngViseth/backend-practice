import "../css/index.css";
import { useState } from "react";

const API_BASE_URL =
location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://your-production-api-url.com";

function Addplace({ onClose }) {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        userName: "",
        userId: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setForm((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });

        try {
            const res = await fetch(`${API_BASE_URL}/api/community`, {
                method: "POST",
                body: formData,
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.message);

            alert("Community created successfully!");
            onClose(result.data);
        } catch (err) {
            alert(err.message || "Failed to create community");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full fixed inset-0 z-50 bg-(--signinbg) flex items-center justify-center">
        <div className="w-full md:max-w-4xl">
            <div className="bg-white rounded-lg shadow-lg p-6 relative">
            <button
                onClick={onClose}
                className="absolute right-4 top-4 hover:bg-gray-100 p-2 rounded-lg"
            >
                <span className="material-symbols-outlined">close</span>
            </button>

            <h2 className="text-3xl font-bold mb-8">Create New Community</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Description"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                />

                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                />

                <input
                    name="userName"
                    value={form.userName}
                    onChange={handleChange}
                    placeholder="User Name"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                />

                <input
                    name="userId"
                    value={form.userId}
                    onChange={handleChange}
                    placeholder="User ID"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg text-white font-bold ${
                        loading
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                    >
                    {loading ? "Creating Community..." : "Create Community"}
                </button>
            </form>
            </div>
        </div>
        </div>
    );
}

export default Addplace;
