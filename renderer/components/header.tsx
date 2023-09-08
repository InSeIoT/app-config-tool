import Link from "next/link";

const links = [
   { label: "Home", href: "/" },
];

export default async function HeaderComponent() {
   return (
      <header>
         <nav className="dark flex items-center justify-between px-4 py-2 bg-header">
            <div>
               <ul className="flex items-center justify-between">
                  {links.map(({ label, href }) => (
                     <li key={`${href}${label}`} className="mr-6">
                        <Link href={href}>
                           <span className="text-white hover:text-indigo-500">{label}</span>
                        </Link>
                     </li>
                  ))}
               </ul>
            </div>
            <div>SenIS</div>
         </nav>
      </header>
   );
}
