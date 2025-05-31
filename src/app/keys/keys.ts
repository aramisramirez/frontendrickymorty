const apirickandmorty: string = 'https://rickandmortyapi.com/api/';

const apinodejs: string = 'http://localhost:3000/api/';

export const cargadeperosnajes = {
  cargarPersonajes: apirickandmorty + '/character?page=',
};

export const personajesfavoritos = {
  getallFavorite: apinodejs + 'favorites/getall',
  createFavorite: apinodejs + 'favorites/add',
  deleteFavorite: apinodejs + 'favorites/DeleteFavorite/',
};
