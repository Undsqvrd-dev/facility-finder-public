import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full h-[60px] bg-gradient-to-r from-purple-600 to-pink-500 fixed top-0 left-0 z-50 flex items-center px-6 justify-between shadow-md">
      
      {/* Logo */}
      <Link href="/">
        <a className="flex items-center">
          <Image
            src="/logo.svg" // Zorg ervoor dat dit bestand in /public staat
            alt="UNDSQVRD Logo"
            width={120} // Pas dit aan naar de juiste grootte
            height={40}
            priority
          />
        </a>
      </Link>

      {/* Over UNDSQVRD knop */}
      <a
        href="https://undsovrd.nl"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white text-sm hover:underline"
      >
        Over UNDSQVRD
      </a>
    </header>
  );
};

export default Header;