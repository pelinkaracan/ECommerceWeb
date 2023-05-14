import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {

  /**
   * It keeps title input
   */
  @Input() title: string = '';

  /**
   * It keeps message input
   */
  @Input() message: string = '';

  /**
   * It keeps boolean value for this modal is opened to create order information
   */
  @Input() isOrder: boolean = true;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() { }
}
