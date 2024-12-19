import { Link } from 'react-router';

const Header = () => {
  return (
    <header>
      <nav className="bg-blue-600 text-white py-4 fixed w-full top-0 z-10 shadow-md">
        <div className="container mx-auto flex justify-center space-x-6">
          <Link to="/" className="hover:underline">
            Accueil
          </Link>
          <Link to="/infinite-scroll" className="hover:underline">
            Scroll Infini
          </Link>
          <Link to="/page-based" className="hover:underline">
            Pagination Classique
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Header;
