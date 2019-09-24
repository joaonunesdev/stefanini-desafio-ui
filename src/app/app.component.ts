import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Desafio Stefanini';
  pages =  [{label: 'Autores', value: 'autores'}, {label: 'Obras', value: 'obras'}]

  constructor(private router: Router) {}

  navigate(event: any) {
    this.router.navigateByUrl(event.option.value);
  }

}
