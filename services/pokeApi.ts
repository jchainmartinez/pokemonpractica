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