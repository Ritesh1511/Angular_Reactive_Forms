import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, Validators , ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {


// myForm = new FormGroup({
//   name: new FormControl(),
//   email: new FormControl(),
//   password: new FormControl()
// });

// with validation -

myForm = new FormGroup({

  name: new FormControl('', Validators.required),

  email: new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')
  ]),

  password: new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ])

});

onSubmit(){

  if(this.myForm.valid){
    console.log(this.myForm.value);
  }
  else{
    console.log("Form Invalid");
  }

}

}