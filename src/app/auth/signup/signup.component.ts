import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private signupForm : FormGroup
  isloading = false;
  constructor(private authService : AuthService) {

   }

  ngOnInit() {
    this.initForm()
    this.authService.getAuthStatusListener().subscribe(
      status => {
        this.isloading = false;
      }
    )
  }

  private initForm(){
    this.signupForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'address' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, Validators.required),
      'phone_no' : new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+[0-9]*$/)])
    })
  }
  onSubmit(){
    if(!this.signupForm.valid){
      return;
    }
    this.isloading = true;
    const postData = {
      name : this.signupForm.value.name,
      address : this.signupForm.value.address,
      email : this.signupForm.value.email,
      password : this.signupForm.value.password,
      phone_no : this.signupForm.value.phone_no
    }

    // ...
    this.authService.createUser(postData);
  }
}
