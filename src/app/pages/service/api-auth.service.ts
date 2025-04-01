import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../../environment/environment ';
import { UserDto } from '../Model/user/user-model';

type TokenResponse = {
  access_token: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<UserDto| null>(null);

  private readonly apiUrl = environment.backendUrl;
  private readonly apibackend = environment.apiBackend;
  constructor(private readonly http: HttpClient) {}

  async loginService(
    username: string,
    password: string
  ): Promise<TokenResponse> {
    const body = { username, password };
    return firstValueFrom(
      this.http.post<TokenResponse>(this.apiUrl+this.apibackend.apiUser, body)
    );
  }

  async login(username: string, password: string): Promise<boolean> {
   // const auth = await this.loginService(username, password);
   const auth ={access_token:"123"};
    const user: UserDto = {
      userId: 1,
      username: 'admin',
      email: 'admin@hotmail.com',
      firstName: 'julio',
      lastName: 'Cesar',
      gender: 'Masculino',
      birthDate: new Date(),
      address: '',
      phoneNumber: '',
      role: '',
      status: ''
    };
    if (auth.access_token) {
      // es correcto
  
      this.isAuthenticated.next(true);
      this.currentUser.next(user);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('access_token', auth.access_token);
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated.next(false);
    this.currentUser.next(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  }

  isLoggedIn() {
    return this.isAuthenticated.asObservable();
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userStr = localStorage.getItem('user');

    if (isLoggedIn && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.isAuthenticated.next(true);
        this.currentUser.next(user);
      } catch (e) {
        this.logout(); // Clear invalid data
      }
    } else {
      this.logout(); // Ensure clean state
    }
  }
}