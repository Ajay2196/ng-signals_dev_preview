
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable,forkJoin,EMPTY, of,combineLatest, concatMap, filter, first, map, shareReplay, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-poke-crud',
  templateUrl: './poke-crud.component.html',
  styleUrls: ['./poke-crud.component.scss']
})
export class PokeCrudComponent implements OnInit {
  
  pokeMonSignal: Signal<any> = toSignal(this.getPokemons('https://pokeapi.co/api/v2/pokemon'), { initialValue: [] });
  pokeTypes: Signal<any> = toSignal(this.getPokemons('https://pokeapi.co/api/v2/type'), { initialValue: [] });
  pokeSignal: Signal<any> = toSignal(this.getPokemons2('https://pokeapi.co/api/v2/pokemon'), { initialValue: [] });

  nextNodeURL: WritableSignal<any> = signal('');
  concatPokeMonSignal: WritableSignal<any> = signal([]);

  pokemonCard: WritableSignal<any> = signal('');
  
  allPokemons: Signal<any> = computed(() => {
    return [...this.pokeMonSignal(), ...this.concatPokeMonSignal()];
  });
  testSignal: WritableSignal<any> = signal([]);

  constructor(private readonly _http: HttpClient) {
    effect(() => {
        let arr: any[] = this.concatPokeMonSignal()['results'] ?this.concatPokeMonSignal()['results']: this.pokeSignal()['results'];
        const obs$ = arr? arr.map(element => {
        return this._http.get(element.url) 
      }) : EMPTY;
      forkJoin(obs$).pipe(take(1)).subscribe((pokemons)=>{
        this.testSignal.update(val=> {
          console.log([...val,...pokemons]);
        return [...val,...pokemons]});
      })},{allowSignalWrites:true})
  }

  ngOnInit(): void {
  this.getPokeMonCall('https://pokeapi.co/api/v2/pokemon').pipe(take(1)).subscribe((val:any)=>{
    val['next'] ? this.nextNodeURL.set(val['next']) : null;
  })

  }

getPokeMonCall(url:string):Observable<any>{
  return this._http.get(url).pipe(shareReplay(1));
}
  
  getPokemons(url: string) {
    return this.getPokeMonCall(url).pipe(
      tap((val:any)=>{
        this.nextNodeURL.set(val['next'])
      }),
      switchMap((val: any) => {
        let arr: any[] = val['results'];
        const obs$ = arr.map(element => {
        return this._http.get(element.url)
        });
        return forkJoin(obs$);
      }),
      
    )
  }

  getPokemons2(url: string) {
    return this.getPokeMonCall(url).pipe(
      tap((val:any)=>{
        this.nextNodeURL.set(val['next'])
      })
      
    )
  }

  getNewPokeMons() {
    this.getPokemons2(this.nextNodeURL()).pipe(take(1)).subscribe(val=> this.concatPokeMonSignal.set(val));
  }

  selectPokemon(pokemon:any){
    this.pokemonCard.set(pokemon);
  }

}