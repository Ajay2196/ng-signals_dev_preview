import { Component, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-signal-for-subjects',
  templateUrl: './signal-for-subjects.component.html',
  styleUrls: ['./signal-for-subjects.component.scss']
})
export class SignalForSubjectsComponent {
  toDoItem:string ='';
  toDos: Signal<any> = toSignal(this.getToDoList(),{initialValue :[]});
  newToDo: WritableSignal<any> = signal(this.toDos());
  allToDos: Signal<any> = computed(()=> [...this.newToDo()]);
  showButton!:boolean;
  editItem: any;
  constructor(){
    // effect(()=>{
    //   console.log(this.allToDos())
    //   console.log(this.newToDo())
    // })
  }

  getToDoList():Observable<any[]>{
    return of([]);
  }

  addToDo(){
    let len = this.newToDo().length;
    this.newToDo.mutate(val=> val.push({name: this.toDoItem}));
  }

  editToDo(item:any){
    this.editItem = item;
  }

  saveToDo(item:any){
    this.editItem = null;
  }
  
  deleteToDo(item: any){
    this.newToDo.mutate(val=>val.splice(val.indexOf(item),1))
  }

}


// do not mutate the signals directly w/ ngModel etc
