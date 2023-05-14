import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

constructor() { }
myEvent: EventEmitter<any> = new EventEmitter();

/**
 * It triggers event emitter
 * @param data 
 */
triggerEvent(data: any) {
  this.myEvent.emit(data);
}

}
