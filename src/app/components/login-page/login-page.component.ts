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
  /**
   * It keeps Email
   */
  email: string = '';
  /**
   * It keeps Password
   */
  password: string = '';

  /**
   * Creates an instance of login page component.
   * @param activeModal 
   * @param authService 
   * @param router 
   * @param sharedService 
   */
  constructor(public activeModal: NgbActiveModal, private authService: AuthService,
    private router: Router, private sharedService: SharedService) {
  }

  ngOnInit() { }

  /**
   * It log in a user to the web site
   */
  login() {
    this.authService.login(this.email, this.password).subscribe(result => {
      if (result === true) {
        this.activeModal.close();
        this.sharedService.triggerEvent(this.authService.getLoggedInUser());
      }
    });
  }
}
