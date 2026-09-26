import React from 'react'
import Image from 'next/image'

interface PokemonCardProps {
    name: string,
    image: string,
    types: string[]
}

export const PokemonCard = ({ name, image, types }: PokemonCardProps) => {
    return (
        <div>
            <div>
                <Image
                    src={image}
                    alt={name}
                    fill
                    className='object-contain'
                />
            </div>

            <h3>{name}</h3>
            <div>
                {types.map((type) => (
                    <span key={type}>
                        {type}
                    </span>
                ))}
            </div>
        </div>
    )
}