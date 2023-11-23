import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, combineLatest, concatMap, filter, first, map, shareReplay, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss'],
})
export class PokemonSearchComponent {

  pokeMonSignal: Signal<any> = toSignal(this.getPokemons('https://pokeapi.co/api/v2/pokemon'), { initialValue: [] });
  
  nextNodeURL: WritableSignal<any> = signal('');
  concatPokeMonSignal: WritableSignal<any> = signal([]);

  allPokemons: Signal<any> = computed(() => {
    return [...this.pokeMonSignal(), ...this.concatPokeMonSignal()];
  });
  

  constructor(private readonly _http: HttpClient) {
    effect(() => {
      this.getPokemons(this.nextNodeURL()).pipe(take(1)).subscribe((pokemons)=>{
        this.concatPokeMonSignal.update(val=> [...val,...pokemons])
      })
    })
  }

  ngOnInit(): void {
  this.getPokeMonCall('https://pokeapi.co/api/v2/pokemon').pipe(take(1)).subscribe((val:any)=>{
    this.nextNodeURL.set(val['next']);
  })

  }

getPokeMonCall(url:string){
  return this._http.get(url).pipe(shareReplay(1));
}
  
  getPokemons(url: string) {

    return this.getPokeMonCall(url).pipe(
      tap((val:any)=>{
        this.nextNodeURL.set(val['next'])
      }),
      map((val: any) => {
        let arr: any[] = val['results'];
        const obs$ = arr.map(element => {
          return this._http.get(element.url)
        });
        return obs$;
      }),
      switchMap(val => combineLatest(val)),
    )
  }

  getNewPokeMons() {
    this.getPokeMonCall(this.nextNodeURL()).pipe(take(1)).subscribe((val:any)=>{
      this.nextNodeURL.set(val['next']);
    }) 
  }

  // selectPokemon(pokemon:any){
  //   console.log(pokemon);
    
  //   this.pokemonCard.set(pokemon);
  // }


}


// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
// import { toSignal } from '@angular/core/rxjs-interop';
// import { Observable, combineLatest, concatMap, filter, first, map, shareReplay, switchMap, take, tap } from 'rxjs';

// @Component({
//   selector: 'app-poke-crud',
//   templateUrl: './poke-crud.component.html',
//   styleUrls: ['./poke-crud.component.scss']
// })
// export class PokeCrudComponent implements OnInit {
  
//   pokeMonSignal: Signal<any> = toSignal(this.getPokemons('https://pokeapi.co/api/v2/pokemon'), { initialValue: [] });
//   pokeTypes: Signal<any> = toSignal(this.getPokemons('https://pokeapi.co/api/v2/type'), { initialValue: [] });
  
//   nextNodeURL: WritableSignal<any> = signal('');
//   concatPokeMonSignal: WritableSignal<any> = signal([]);

//   pokemonCard: WritableSignal<any> = signal('Ajay');
  
//   allPokemons: Signal<any> = computed(() => {
//     return [...this.pokeMonSignal(), ...this.concatPokeMonSignal()];
//   });
  

//   constructor(private readonly _http: HttpClient) {
//     effect(() => {
//       this.getPokemons(this.nextNodeURL()).pipe(take(1)).subscribe((pokemons)=>{
//         this.concatPokeMonSignal.update(val=> [...val,...pokemons])
//       })
//     })
//   }

//   ngOnInit(): void {
//   this.getPokeMonCall('https://pokeapi.co/api/v2/pokemon').pipe(take(1)).subscribe((val:any)=>{
//     val['next'] ? this.nextNodeURL.set(val['next']) : null;
//   })

//   }

// getPokeMonCall(url:string){
//   return this._http.get(url).pipe(shareReplay(1));
// }
  
//   getPokemons(url: string) {

//     return this.getPokeMonCall(url).pipe(
//       tap((val:any)=>{
//         this.nextNodeURL.set(val['next'])
//       }),
//       map((val: any) => {
//         let arr: any[] = val['results'];
//         const obs$ = arr.map(element => {
//           return this._http.get(element.url)
//         });
//         return obs$;
//       }),
//       switchMap(val => combineLatest(val)),
//     )
//   }

//   getNewPokeMons() {
//     this.getPokeMonCall(this.nextNodeURL()).pipe(take(1)).subscribe((val:any)=>{
//       this.nextNodeURL.set(val['next']);
//     }) 
//   }

//   selectPokemon(pokemon:any){
//     console.log(pokemon);
    
//     this.pokemonCard.set(pokemon);
//   }

// }


