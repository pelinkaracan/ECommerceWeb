import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginPageComponent } from '../login-page/login-page.component';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  /**
   * Username  of home page component
   */
  username: string = '';

  /**
   * Creates an instance of HomePageComponent.
   * @param {Router} router
   * @param {NgbModal} modalService
   * @param {AuthService} authService
   * @param {SharedService} sharedService
   * @memberof HomePageComponent
   */
  constructor(private router: Router,
    private modalService: NgbModal,
    private authService: AuthService,
    private sharedService: SharedService) { }

   
  /**
   * on init
   */
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      // If a user is logged in then get user info from Authentication Service
      const user: any = this.authService.getLoggedInUser();
      this.setUserName(user);
    }
    else {
      this.username = '';
    }
    // When a user is logged in then triggered this event and set userName 
    this.sharedService.myEvent.subscribe((user) => {
      this.setUserName(user);
    });
  }

  /**
   * Sets user name
   * @param user 
   */
  setUserName(user: any) {
    if (user !== null) {
      this.username = `(${user.FirstName}  ${user.LastName})`;
    }
    else {
      this.username = '';
    }
  }

  /**
   * Go my cart
   */
  goMyCart() {
    this.router.navigate(['/cart']);
  }

  /**
   * Go produc list
   */
  goProducList() {
    this.router.navigate(['']);
  }

  /**
   * If a user is not logged in then it is opened a modal login component
   * If a user is logged in then it uses to logout user
   */
  loginLogout() {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
      this.setUserName(null);
    } else {
      const modalRef = this.modalService.open(LoginPageComponent);
    }
  }
}
