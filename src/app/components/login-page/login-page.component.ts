import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(public activeModal: NgbActiveModal, private authService: AuthService, 
    private router :Router, private sharedService:SharedService) { 
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(result => {
      if (result === true) {
        this.activeModal.close();
        this.sharedService.triggerEvent(this.authService.getLoggedInUser());
      }
    });
  }
}
