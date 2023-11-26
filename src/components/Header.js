// src/components/Header.js
import Link from 'next/link'; // Import Link from Next.js to handle routing

function Header() {
  return (
    <header className="w-full flex justify-between items-center py-8 px-8">
      <h1 className="text-3xl font-bold">
        Projeto - ChatDB
      </h1>
      
      {/* Navigation Links */}
      <nav className="flex-grow mx-auto">
        <ul className="flex justify-center space-x-4 text-lg">
          <li><Link href="/" className="text-blue-500 hover:text-blue-600">Index</Link></li>
          <li><Link href="/create" className="text-blue-500 hover:text-blue-600">Create</Link></li>
          <li><Link href="/read" className="text-blue-500 hover:text-blue-600">Read</Link></li>
          <li><Link href="/update" className="text-blue-500 hover:text-blue-600">Update</Link></li>
          <li><Link href="/delete" className="text-blue-500 hover:text-blue-600">Delete</Link></li>
        </ul>
      </nav>

      <p className="text-lg text-right">
        Gabriel Mendonca - 200022939
      </p>
    </header>
  );
}

export default Header;
