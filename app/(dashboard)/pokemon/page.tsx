import React from 'react'
import { ontenerPokemon } from '@/services/pokeApi'
import {PokemonCard} from '@/components/PokemonCard';
import Image from 'next/image';

export default async function pokemonPage() {

    const pokemon = await ontenerPokemon("2");
    console.log(pokemon)

    if (!pokemon) {
        return (
            <main className="p-8">
                <h2 className="text-red-500 text-2xl">Error al cargar el pokemon...!!</h2>
            </main>
        )
    }
    return (
        <main>
            <h2 className="text-xl capitalize font-semibold mb-2">{pokemon.name}</h2>
            <p>{pokemon.id}</p>

            <PokemonCard
                name={pokemon.name}
                image={pokemon.sprites.other['official-artwork'].front_defaul}
            />
        </main>
    )
}
