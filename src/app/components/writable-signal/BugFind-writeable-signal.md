SCENARIO: I convert HTTP observable to signal using the toSignal utility, create another writeable signal using the converted observable signal (immutable at this point), when I adapt the writeable signal the main signal also gets modified.

Resoruces used to update writeable signal:
- The original signal (immutable one) updated using the toSignal utility function e.g., signal = toSignal(this.obs$);
- effect() hook with the options flag, ,{allowSignalWrites : true}
- A subject that is subscribed only once(take(1)) when the original immutable signal obtains data and is stored in the subject
*Initialization with value*
- The writeable signal's initial value :   writeableSignal: WritableSignal<any> = signal(null);
-  this.triggeredSubject.next(this.signal());
- *OnInit*
      - this.triggetriggeredSubject.pipe(filter(val=> !!val),take(1)).subscribe(val=> this.writeableSignal.set(val));


Observation: 
whenever the writeable signal is modified, the source signal is also modified.

Mitigation: 
When I pass the signal by value, the original signal value does not get updated when the writeable signal is updated.

Recommendaton: 
Do not use writeable signals where you want to mutate data that is originally immutable in nature (eg. HTTP Observables that are converted to signals)