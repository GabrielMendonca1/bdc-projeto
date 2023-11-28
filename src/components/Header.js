import Link from 'next/link';

function Header() {
  return (
    <header className="w-full bg-gray-100 shadow-md py-4 px-8 flex items-center justify-between">
      <h1 className="text-xl md:text-3xl font-bold text-black">
        Projeto - ChatDB
      </h1>
      
    
      <nav>
        <ul className="flex justify-center space-x-4 text-lg">
          <li><Link href="/" className="text-blue-500 hover:text-blue-700">Index</Link></li>
          <li><Link href="/create" className="text-blue-500 hover:text-blue-700">Create</Link></li>
          <li><Link href="/read" className="text-blue-500 hover:text-blue-700">Read</Link></li>
          <li><Link href="/update" className="text-blue-500 hover:text-blue-700">Update</Link></li>
          <li><Link href="/delete" className="text-blue-500 hover:text-blue-700">Delete</Link></li>
        </ul>
      </nav>

      <p className="text-lg hidden md:block">
        Gabriel Mendonca - 200022939
      </p>
    </header>
  );
}

export default Header;
