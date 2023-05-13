import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {

  @Input() title: string = '';
  @Input() message: string = '';
  @Input() isOrder: boolean = true;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }



}
