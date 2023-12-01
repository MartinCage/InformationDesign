import { writable } from 'svelte/store';

// Maak een store waarvan de waardes aanpasbaar zijn en verwacht een array.
export const dataStorePokemonNames = writable([]);

export const dataStoreSpecificPokemon = writable([]);

export const dataStorePokemonStats = writable([]);