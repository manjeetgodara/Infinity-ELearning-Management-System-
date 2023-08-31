import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm !:FormGroup;
   
  token: string | null = null;

  constructor(private formBuilder:FormBuilder ,private router:Router,private http:HttpClient ){}

  ngOnInit() : void{
    this.loginForm=this.formBuilder.group({
     email:[''],
     password:['']
    })
  }

  login(){
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const apiUrl = 'http://localhost:8080/signIn';
    // Make an HTTP POST request to your signIn endpoint
   const headers = new HttpHeaders({
    Authorization: 'Basic ' + btoa(email + ':' + password)
  });

  // Make an HTTP GET request with the Basic Authentication header
  this.http.get<any>(apiUrl, { headers }).subscribe(
    (response) => {
      // Assuming your API returns the token in the response
      // Store the token in local storage
      localStorage.setItem('token', response.token);

      // Set the token variable for reference in your component
      this.token = response.token;
      alert('Login Successfully');

      this.loginForm.reset();

      // Redirect to a different page or perform other actions
      // this.router.navigate(['/home']);
    },
    (error) => {
       // Handle login error here
      console.error('Login failed', error);
    }
  );
  
    
  }

  logout(){
    alert("Logout Successfully!!");
    this.router.navigate(['/login']);
    localStorage.removeItem("token");
  }
}
