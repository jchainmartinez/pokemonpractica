import Link from "next/link";

export default function Home() {
  return (
    <>
      <h2>Hola mundo desde NextJs</h2>
      <nav>
        <Link href="/items">Ver Items</Link>
        {" | "}
        <Link href="/pokemon">Ver Pokemon</Link>
      </nav>
    </>
  );
}