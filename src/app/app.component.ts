import { Component, OnInit, Signal, WritableSignal, computed, effect, signal ,} from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http'
import { BehaviorSubject, Observable, Subject, catchError, switchMap, throwError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 count = signal(0);
triggerSub: Subject<void> = new Subject<void>();
posts = toSignal(this.triggerSub.pipe(switchMap(()=> this.getPosts())))
newSignal: WritableSignal<any>= signal(1);


constructor(private readonly httpSrv : HttpClient){
  this.count.set(1);  

  effect(()=>{
    console.log(this.posts()); //perform side effects
    console.log(this.newSignal()[2]);
  },{allowSignalWrites : true});
  }

  ngOnInit(): void {
  }


  getPosts(): Observable<any>{
    let param = new HttpParams();
    param= param.append("category", "General");
    return this.httpSrv.get('http://localhost:3000/blogPosts/getTitlesByCategory',{params:param}).pipe(catchError(error=>{ return throwError(()=> error)}));
  
  }

increaseCount(){
  this.count.update(val=>val+1);
  this.newSignal.set(this.posts());
  // this.newSignal.mutate(val=>{
  //   console.log(val[2]);
  // })
  // this.arr = computed(()=> this.count()/0.5);
  this.triggerSub.next();
}

decreaseCount(){
  this.count.update(val=>val+1);
  // this.count2.update(val=>val-1);
}
}
