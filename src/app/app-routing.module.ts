import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokeCrudComponent } from './components/poke-crud/poke-crud.component';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search.component';

const routes: Routes = [{
  path:'pokeCRUD', component:PokeCrudComponent
},{path:'', pathMatch:'full',redirectTo:'pokeCRUD'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
