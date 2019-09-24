import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutorComponent } from './autores/autor/autor.component';
import { ObraComponent } from './obras/obra/obra.component';


const routes: Routes = [
  { path: 'autores', component: AutorComponent },
  { path: 'obras', component: ObraComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
