import '../css/index.css';
import { Link } from 'react-router-dom';

function TvnaNavbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">link</Link></li>
            </ul>
        </nav>
    );
}

export default TvnaNavbar;