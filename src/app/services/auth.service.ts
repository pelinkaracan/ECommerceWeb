import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endPoint: string;

  /**
   * Creates an instance of auth service.
   * @param http 
   * @param jwtHelper 
   * @param configService 
   */
  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private configService: ConfigService
  ) {
    // sets endpoint information
    this.endPoint = configService.endPoint;
  }


  /**
   * It sends a request to rest api and gets token and user information.
   * This information sets to local storage
   * @param email 
   * @param password 
   * @returns login 
   */
  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.endPoint}/User/login`, { email, password })
      .pipe(
        map(response => {
          const token = response.token;
          const user = response.user;
          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);
            return true;
          }
          return false;
        })
      );
  }

  /**
   * It removes token and users from local storage to logout
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Determines whether logged in is
   * @returns true if logged in 
   */
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  /**
   * Gets logged in user
   * @returns  
   */
  getLoggedInUser() {
    const user: any = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!this.jwtHelper.isTokenExpired(token)) {
      return JSON.parse(user);
    }
    return null;
  }
}
