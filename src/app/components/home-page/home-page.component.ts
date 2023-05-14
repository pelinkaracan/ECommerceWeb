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
  username: string= '';

  constructor(private router: Router, private modalService: NgbModal, private authService: AuthService,
    private sharedService: SharedService) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()){
      const user: any = this.authService.getLoggedInUser();
      this.setUserName(user);
    }
    else{
      this.username = '';
    }
    this.sharedService.myEvent.subscribe((user) => {
      this.setUserName(user);
    });
  }

  setUserName(user:any){
    if(user !== null){
      this.username = `(${user.FirstName}  ${user.LastName})`;
    }
    else{
      this.username = '';
    }
  }
  goMyCart() {
    this.router.navigate(['/cart']);
  }

  goProducList() {
    this.router.navigate(['']);
  }

  loginLogout() {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
      this.setUserName(null);
    } else {
      const modalRef = this.modalService.open(LoginPageComponent);
    }
  }
}
