import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

constructor() { }
myEvent: EventEmitter<any> = new EventEmitter();

triggerEvent(data: any) {
  this.myEvent.emit(data);
}

}
