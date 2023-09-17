import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { signIn, signUp } from '../Model/signUpModel';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{
  constructor(private sellerService: SellerService, private router: Router){}
  showLogin:boolean = false;
  authErro:string = '';
  ngOnInit(): void {
    this.sellerService.reloadSeller()
  }
  
  signUp(data: signUp):void{  
    console.log(data);
    this.sellerService.userService(data);
  }
  login(data: signIn):void{  
    this.authErro = '';
    this.sellerService.userLogin(data);
    this.sellerService.isLoginError.subscribe((isErro)=>{
      if(isErro){
        this.authErro= "Email or Password is not Correct!";
      }
    })
  }
  openLogin(){
      this.showLogin = true; 
  }
  openSingup(){
    this.showLogin = false;
  }
}
