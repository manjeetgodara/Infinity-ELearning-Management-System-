import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public signUpForm !:FormGroup;
  baseUrl='http://localhost:8080';
  
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router){}

  ngOnInit():void{
    this.signUpForm=this.formBuilder.group({
      name:[''],
      email:[''],
      password:[''],
      address:[''],
      role:[''],
    })
  }

 signUp(){
  if (this.signUpForm.valid) {
    const formData = this.signUpForm.value;

    // Make an HTTP POST request to your registration endpoint
    this.http.post(`${this.baseUrl}/users`, formData).subscribe(
      (response) => {
        // Registration was successful, handle the response
        console.log('Registration successful:', response);
        // Optionally, redirect to a different page or show a success message
      },
      (error) => {
        // Handle registration error, show error message to the user
        console.error('Registration error:', error);
        // Optionally, display an error message to the user
      }
    );
  }
 }

}
