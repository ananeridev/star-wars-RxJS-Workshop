import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap, startWith, map, switchMap, filter, debounceTime, retry } from 'rxjs/operators';

// URL: `https://swapi.co/api/people/?search=${v}`

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myInput = new FormControl;
  results$ = this.myInput.valueChanges.pipe(
    debounceTime(500),
    filter(v => v.length >= 2),
    map(v => `https://swapi.co/api/people/?search=${v}`),
    switchMap(url => this.http.get(url).pipe(
    retry(5),
    map(response => response ['results']), 
    startWith({ message: 'Carregando...'}),
    )),
    startWith({ message: 'Digite alguma coisa para começar a busca'}),
    tap(console.log),
    );

  constructor(private http: HttpClient) {}
}