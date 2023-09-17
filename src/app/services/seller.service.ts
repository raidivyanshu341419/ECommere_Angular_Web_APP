import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signIn, signUp } from '../Model/signUpModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<Boolean>(false);
  constructor(private http: HttpClient, private route: Router) {}
  userService(data: signUp) {
    return this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body)); // This way we can save the data in LocalStorage.
        this.route.navigate(['seller-home']);
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.route.navigate(['seller-home']);
    } 
  }

  userLogin(data: signIn){
    console.log(data);
    return this.http.get(`http://localhost:3000/seller?Email=${data.Email}&password=${data.password}`, 
    {observe: 'response'})
    .subscribe((result:any)=>{
      console.warn(result);
      if(result && result.body && result.body.length){
        console.warn("User logged In");
        localStorage.setItem('seller', JSON.stringify(result.body)); // This way we can save the data in LocalStorage.
        this.route.navigate(['seller-home']);
      }
      else{
        console.warn("Login Failed");
        this.isLoginError.emit(true); 
      }
    })
  }
}
