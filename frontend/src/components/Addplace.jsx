import '../css/index.css';

function Addplace() {
    return (
        <div className="min-h-screen">
            <div className="w-full md:max-w-4xl md:mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Create New Community</h2>

                    <form id="communityForm" className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">Title:</label>
                            <input 
                                type="text" 
                                id="title" 
                                name="title" 
                                required 
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">Description:</label>
                            <textarea 
                                id="description" 
                                name="description" 
                                required 
                                rows="5"
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition resize-none"
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">Upload Image:</label>
                            <input 
                                type="file" 
                                id="image" 
                                name="image" 
                                accept="image/*" 
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                        </div>

                        <div id="userInformation" className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div>
                                <label htmlFor="userName" className="block text-sm font-semibold text-gray-700 mb-2">User Name:</label>
                                <input 
                                    type="text" 
                                    id="userName" 
                                    name="userName" 
                                    required 
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                />
                            </div>

                            <div>
                                <label htmlFor="userId" className="block text-sm font-semibold text-gray-700 mb-2">User Id:</label>
                                <input 
                                    type="text" 
                                    id="userId" 
                                    name="userId" 
                                    required 
                                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                id="submitBtn"
                                className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition transform hover:scale-105 shadow-md"
                            >
                                Create Community
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Addplace;
