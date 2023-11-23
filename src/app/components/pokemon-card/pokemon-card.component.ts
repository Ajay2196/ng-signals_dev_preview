import { ChangeDetectionStrategy, Component, Input, Signal, computed } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonCardComponent {
@Input() pokemon:any;
@Input()
  pokeTypes!: any[];
public get pokeType(){
  return this.pokemon.types;
}

public get poketypeBorder(){
  const [type]= this.pokeType;
  return 'poke-card__border--'+type.type.name;
}
}
