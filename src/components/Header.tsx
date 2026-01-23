import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b-2 border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center font-bold text-xl">
              A
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight">Apollo Tyres</span>
              <span className="hidden sm:inline text-muted-foreground text-sm ml-2">
                Product Catalog
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              All Products
            </Link>
            <a
              href="https://www.apollotyres.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline underline-offset-4"
            >
              Official Site →
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
