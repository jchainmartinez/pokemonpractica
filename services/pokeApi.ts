export const ontenerPokemon = async (nameOrId: String | number) => {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
        if (!respuesta.ok) {
            throw new Error("Error al obtener el pokemon solicitado");
        }
        return await respuesta.json();

    } catch (error) {
        console.error(`Error al obtener el pokemon: ${nameOrId}`);
        return null;
    }
}
 export const ontenerListadoPokemon = async (limite: number = 30) => {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limite}`);
        if (!respuesta.ok) {
            throw new Error("Error al obtener el listado de pokemon");
        }
        const datos = await respuesta.json();

        // la lista solo trae nombre y url, así que pedimos el detalle de cada uno
        const detalles = await Promise.all(
            datos.results.map((p: any) => ontenerPokemon(p.name))
        );
        return detalles.filter((p) => p !== null);

    } catch (error) {
        console.error("Error al obtener el listado de pokemon");
        return [];
    }
}
   