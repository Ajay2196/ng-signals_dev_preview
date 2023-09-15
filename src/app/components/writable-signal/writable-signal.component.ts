import { Component, OnInit, Signal, WritableSignal, computed, effect, signal ,} from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http'
import {  Observable, Subject, catchError, filter,  take, throwError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-writable-signal',
  templateUrl: './writable-signal.component.html',
  styleUrls: ['./writable-signal.component.scss']
})
export class WritableSignalComponent implements OnInit{

  triggerSignal: Subject<any> = new Subject<any>();
  postsObsSignal = toSignal(this.getPosts());
  posts: WritableSignal<any> = signal(null);
  
  
  constructor(private readonly httpSrv : HttpClient){

    // this.posts.set(this.postsObsSignal());

    effect(()=>{
    // this.sampleVar = this.posts();
    console.log(this.posts());
    console.log(this.postsObsSignal());
    this.triggerSignal.next(JSON.parse(JSON.stringify(this.postsObsSignal()))); //it definietely passes the reference!!!
    // this.posts.set(this.postsObsSignal());

    // this.post
    } ,{allowSignalWrites : true});
    // this.postsObsSignal();

    }
  
  ngOnInit(){
    this.triggerSignal.pipe(filter(val=> !!val),take(1)).subscribe(val=> this.posts.set(val));

    // this.postsObsSignal();
  }

    getPosts(): Observable<any>{
      let param = new HttpParams();
      param= param.append("category", "General");
      return this.httpSrv.get('http://localhost:3000/mockData').pipe(catchError(error=>{ return throwError(()=> error)}));
    }
  
  updatePosts(){
    // this.count.update(val=>val+1);
    // this.posts.set(this.posts());
    // this.newSignal.mutate(val=>{
    //   console.log(val[2]);
    // })
    // this.arr = computed(()=> this.count()/0.5);
    // this.triggerSub.next();
  }
  
  deletePost(obj:any){
    // this.posts.set(this.postsObsSignal());
    this.posts.mutate(val=>{
      val.splice(val.indexOf(obj),1);
    })
   
    // this.count2.update(val=>val-1);
  }
  }
  

//cannot write onto signals obtained by converting observables to signals
// Somehow managed to break immutable signals lol :D
// signals can be passed by reference to writeableSignals and in turn we're able to update the OG signal! :O
// this hack can let us create/update redux pattern
// effects can enable us to write 
// still see the need for coupling RxJS with NG Signals to make things work! 
// Signals can we swapped for Subjects but not for Observables completely but just like Observables, Signals are immutable
// needs more investigation!
