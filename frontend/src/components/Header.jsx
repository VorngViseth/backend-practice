import '../css/index.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.theme = isDark ? 'dark' : 'light';
        setIsDarkMode(isDark);
    };

    return (
        <header className="z-50 sticky top-0 left-0 w-full px-6 py-4 shadow-md bg-(--bg) text-(--text)">
            <div className="max-w-(--max-width) mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-2">
                {/* Left Section - Logo */}
                <div className="flex items-center">
                    <div className="flex items-center justify-center">
                        <button id="hamburger" className="btnClick lg:hidden flex items-center justify-center rounded-md focus:outline-none pr-3">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-2.5">
                        <div className="flex w-10 h-10 rounded-full bg-[--bg] text-[--text] overflow-hidden">
                            <img src="./src/assets/logo.webp" alt="logo" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="text-2xl font-bold text-(--indigo)">TvNa</div>
                    </div>
                </div>

                {/* Center Section - Empty Spacer */}
                <div></div>

                {/* Right Section - Theme Toggle & Navigation */}
                <div className="flex items-center justify-center">
                    <button 
                        id="themeToggle" 
                        onClick={toggleTheme}
                        className="btnClick flex items-center justify-center h-10 w-10 rounded-md hover:bg-neutral-400 transition mr-3"
                    >
                        <span id="themeIcon" className="material-symbols-outlined">
                            {isDarkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                    <nav className="hidden lg:flex gap-6 mr-3">
                        <Link to="/" className="font-bold hover:text-indigo-600 transition">TvNa</Link>
                        <Link to="/community" className="font-bold hover:text-indigo-600 transition">Community</Link>
                    </nav>
                    <button id="signinBtn" className="btn btnClick bg-[#741EFF] text-white font-bold px-4 py-2 rounded-md hover:bg-[#5a1ac4] transition">
                        Sign in
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;