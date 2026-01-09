import '../css/index.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="w-full bg-white shadow-md py-2 mb-6 sticky top-0 z-50">
            <div className="w-full md:max-w-275 md:mx-auto flex items-center justify-between px-4 py-3">
                <h1 className="text-2xl font-bold text-gray-800">My Application</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link to="/" className="text-gray-600 hover:text-gray-800">TvNa</Link></li>
                        <li><Link to="/community" className="text-gray-600 hover:text-gray-800">Community</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;