import React from 'react'
import Link from 'next/link'
import { ontenerPokemon, ontenerListadoPokemon } from '@/services/pokeApi'
import { PokemonCard } from '@/components/PokemonCard';

export default async function pokemonPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>
}) {

    const { q } = await searchParams;
    const busqueda = q?.trim().toLowerCase();

    let listaPokemon: any[] = [];

    if (busqueda) {
        const encontrado = await ontenerPokemon(busqueda);
        listaPokemon = encontrado ? [encontrado] : [];
    } else {
        listaPokemon = await ontenerListadoPokemon(30);
    }

    return (
        <main className='min-h-screen bg-[#0b0e14] p-8 font-sans'>
            <div className='max-w-6xl mx-auto'>

                <header className='mb-6 text-center'>
                    <h1 className="text-xl capitalize font-semibold mb-2">Pokedex APi V1</h1>
                    <p className='text-sm text-gray-500'>prueba de componentes individuales</p>
                </header>

                {/* Barra de búsqueda */}
                <form action="/pokemon" method="GET" className='max-w-md mx-auto mb-10'>
                    <div className='relative'>
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400'>
                            <svg width="14" height="14" viewBox="0 0 20 20">
                                <path
                                    d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                                    stroke="currentColor"
                                    fill="none"
                                    strokeWidth="2"
                                    fillRule="evenodd"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        <input
                            type="text"
                            name="q"
                            defaultValue={q}
                            placeholder="Buscar pokemon por nombre o número..."
                            className='w-full bg-[#1e2333]
                                        text-gray-200
                                        placeholder-gray-500
                                        rounded-lg
                                        py-3 pl-10 pr-4
                                        border border-gray-800/50
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-amber-300'
                        />
                    </div>
                    <button type="submit" className='sr-only'>Buscar</button>
                </form>

                {busqueda && (
                    <div className='text-center mb-6'>
                        <Link href="/pokemon" className='text-sm text-amber-300 hover:underline'>
                            ← Ver todos
                        </Link>
                    </div>
                )}

                {/* Cuadrícula */}
                {listaPokemon.length > 0 ? (
                    <div className='grid grid-cols-1
                                    sm:grid-cols-2
                                    md:grid-cols-3
                                    lg:grid-cols-4 gap-6'>
                        {listaPokemon.map((pokemon) => (
                            <PokemonCard
                                key={pokemon.id}
                                name={pokemon.name}
                                image={pokemon.sprites.other['official-artwork'].front_default}
                                types={pokemon.types.map((t: any) => t.type.name)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className='text-center text-gray-400'>
                        No se encontró ningún pokemon llamado <span className='text-amber-300'>{q}</span>
                    </p>
                )}

            </div>
        </main>
    )
}