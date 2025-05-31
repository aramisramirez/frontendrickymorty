import { Routes } from '@angular/router';
import { PersonajesComponent } from './personajes/personajes.component';
import { FavoritosComponent } from './favoritos/favoritos.component';

export const CLIENTE_ROUTES: Routes = [
  { path: 'personajes', component: PersonajesComponent, pathMatch: 'full' },
  { path: 'favoritos', component: FavoritosComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'personajes', pathMatch: 'full' },
];
