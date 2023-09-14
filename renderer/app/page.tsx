export default async function HomePage() {
   return (
      <article className="dark dark:text-white">
         <h1>Home</h1>
         <p>Welcome</p>
         {Array.from({ length: 100 }, (_, i) => (
            <p key={i}>Linea {i + 1}: Este es un ejemplo de contenido extenso que puede desplazarse verticalmente.</p>
         ))}
      </article>
   );
}
