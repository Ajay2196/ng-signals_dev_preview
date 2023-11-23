import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pokeball',
  templateUrl: './poke-ball.component.html',
  styleUrls: ['./poke-ball.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokeBallComponent {

}
