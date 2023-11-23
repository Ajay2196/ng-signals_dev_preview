import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WritableSignalComponent } from './components/writable-signal/writable-signal.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import{MatButtonModule} from '@angular/material/button';
import { SignalForSubjectsComponent } from './components/signal-for-subjects/signal-for-subjects.component';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PokeCrudComponent } from './components/poke-crud/poke-crud.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokeBallComponent } from './components/poke-ball/poke-ball.component';
import { PokemonSearchComponent } from './components/pokemon-search/pokemon-search.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    WritableSignalComponent,
    SignalForSubjectsComponent,
    PokeCrudComponent,
    PokemonCardComponent,
    PokeBallComponent,
    PokemonSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
