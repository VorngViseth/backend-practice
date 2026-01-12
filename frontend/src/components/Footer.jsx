import '../css/index.css';

function Footer() {
    return (
        <footer className='bg-(--bg-footer)'>
            <div className="w-full flex items-center justify-center px-4 py-3 border-t border-gray-200">
                <p className="text-(--muted)">&copy; 2024 My Application. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;