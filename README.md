1️⃣ Template-Driven Forms (what you studied earlier)

In template forms, the form is created in the HTML first.

```
Example:

<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">

Here:

#myForm

creates a template reference variable.

Meaning:

HTML creates the form
Angular exposes it as NgForm
#myForm references it

So flow is:

HTML → Angular → TypeScript

Structure:

HTML
 |
 | #myForm="ngForm"
 ↓
NgForm object created by Angular
 |
 ↓
Passed to TypeScript

Example TS:

onSubmit(myForm: NgForm){
 console.log(myForm.value);
}

So Template Forms are HTML-driven.
```


2️⃣ Reactive Forms (what we started now)

Reactive forms work opposite.

The form is created in TypeScript first.

```
Example:

myForm = new FormGroup({});

Then HTML connects to it.

<form [formGroup]="myForm">

So flow becomes:

TypeScript → Angular → HTML

Structure:

TypeScript
   |
   | FormGroup created
   ↓
HTML connects using [formGroup]
```




# Visual Comparison
Template Form
HTML
 |
 | #myForm="ngForm"
 ↓
NgForm created
 |
 ↓
TypeScript




# Reactive Form

TypeScript
 |
 | new FormGroup()
 ↓
HTML connects using [formGroup]




Remember this:

> Template Forms → HTML first
> Reactive Forms → TypeScript first




# Reactive Forms - 
A Reactive Form in Angular is a form where the form structure, fields, and validation are controlled in the TypeScript file instead of the HTML.

So the component (TS) manages the form, and the HTML just displays it.


## Difference: Template Forms vs Reactive Forms **

> Difference:           Template Forms        vs        Reactive Forms
> Feature	            Template Forms	                Reactive Forms
> Form logic location	HTML	                        TypeScript
> Data binding	        ngModel	                        FormControl, FormGroup
> Complexity	        Simple forms	                Large/complex forms
> Validation	        Mostly HTML	                    Fully controlled in TS
> Data flow	            Automatic                   	Explicit and predictable



> import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
want to use these classes in this file.”

> imports: [RouterOutlet, ReactiveFormsModule]
These Angular modules/directives are allowed to be used in my HTML template.



# Layer 1 — Reactive Form Setup (Structure Only)



1️⃣ Template (HTML)
```

<h1>Reactive Forms</h1>

<form [formGroup]="myForm" (ngSubmit)="onSubmit()">

<label>Name</label>
<input type="text" formControlName="name" placeholder="Type your name">

<div></div>

<label>Email</label>
<input type="email" formControlName="email" placeholder="Type your email">

<div></div>

<label>Password</label>
<input type="password" formControlName="password" placeholder="Type your password">

<button type="submit">Submit</button>

</form>

<router-outlet></router-outlet>

```

> Important thing here

[formGroup]="myForm"

This tells Angular:
"This HTML form is controlled by a FormGroup object in the component."
Right now inputs are not connected yet.
So this is only form structure binding.


<form [formGroup]="myForm">

This connects:

HTML Form  →  Angular Form Model





2️⃣ Component Code (TypeScript)



```

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('Reactive_Forms');

  myForm = new FormGroup({});

  onSubmit(){
    console.log("Form Submitted");
  }

}


```

myForm = new FormGroup({});

FormGroup is a class provided by Angular from:
FormGroup represents the entire form model in TypeScript.

Think of it like a container that holds form fields.

Example structure:

FormGroup
   |
   |---- name
   |---- email
   |---- password


> myForm - This is just a variable in your component.
> You could name it anything: loginForm ,registerForm ,userForm ,contactForm
> loginForm = new FormGroup({});

> Example 

class Car {}

let car1 = new Car();

> Same idea here:

let myForm = new FormGroup();

You are creating a new FormGroup object.

> Why {} is passed

The {} is where we define the form controls.

> Structure:

new FormGroup({
   controlName: new FormControl()
})

> Example:

myForm = new FormGroup({
  name: new FormControl(),
  email: new FormControl(),
  password: new FormControl()
});

> This tells Angular:

FormGroup
   |
   |--- name control
   |--- email control
   |--- password control


# Visual Flow


TypeScript
-----------

myForm = new FormGroup({})

        |
        |
        ↓

HTML
-----

<form [formGroup]="myForm">

This connects HTML form → Angular form model.




3️⃣ Why we import ReactiveFormsModule

```

import { ReactiveFormsModule } from '@angular/forms';


```
Angular does NOT understand reactive form directives by default.

ReactiveFormsModule enables:

Feature	Purpose
FormGroup	Represents the whole form
FormControl	Represents individual input
formGroup	Connects HTML form with FormGroup
formControlName	Connects input with FormControl




```

Step 1 — TypeScript creates the Form Model
------------------------------------------

Component (TypeScript)

myForm = new FormGroup({
   name: new FormControl(),
   email: new FormControl(),
   password: new FormControl()
})


Structure created in memory:

          FormGroup (myForm)
                |
        ---------------------
        |         |        |
      name      email    password
   FormControl FormControl FormControl



Step 2 — HTML connects to the FormGroup
---------------------------------------

HTML Template

<form [formGroup]="myForm">

Angular reads:
formGroup directive → connect to myForm


Connection:

HTML Form
    |
    |  [formGroup]
    ↓
FormGroup (myForm)



Step 3 — Inputs connect to individual FormControls
--------------------------------------------------

<input formControlName="name">
<input formControlName="email">
<input formControlName="password">


Connection Mapping

HTML INPUT              TYPESCRIPT MODEL
-----------             -----------------
formControlName="name" → myForm.controls.name
formControlName="email" → myForm.controls.email
formControlName="password" → myForm.controls.password



Final Architecture
------------------

             Angular Reactive Form Tree


                FormGroup
                 (myForm)
                    |
        --------------------------------
        |              |               |
   FormControl      FormControl     FormControl
      (name)           (email)        (password)
        |                |               |
        |                |               |
    HTML Input       HTML Input      HTML Input
   formControlName   formControlName formControlName
        "name"          "email"         "password"



Data Flow
---------

User types in HTML input
        ↓
FormControl updates value
        ↓
FormGroup aggregates values
        ↓
this.myForm.value
        ↓
Submit / API / Processing





```













# Template Form - 

Template forms are HTML-driven.
The form structure and logic mostly live in the HTML template.

```


<h1>Template Form</h1>

<form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">

<label>Name</label>
<input type="text" name="name" ngModel placeholder="Enter name">

<br><br>

<label>Email</label>
<input type="email" name="email" ngModel placeholder="Enter email">

<br><br>

<label>Password</label>
<input type="password" name="password" ngModel placeholder="Enter password">

<br><br>

<button type="submit">Submit</button>

</form>



```



```



import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html'
})
export class App {

  onSubmit(form: NgForm){
    console.log(form.value);
  }

}


```


HTML creates form
        |
        | ngForm
        ↓
Angular creates NgForm object
        |
        ↓
TypeScript receives form data



# Reactive Forms -

Reactive forms are TypeScript-driven.
The entire form model is created in TypeScript first.

```


<h1>Reactive Form</h1>

<form [formGroup]="myForm" (ngSubmit)="onSubmit()">

<label>Name</label>
<input type="text" formControlName="name">

<br><br>

<label>Email</label>
<input type="email" formControlName="email">

<br><br>

<label>Password</label>
<input type="password" formControlName="password">

<br><br>

<button type="submit">Submit</button>

</form>



```





```



import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html'
})
export class App {

  myForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  onSubmit(){
    console.log(this.myForm.value);
  }

}



```




# AngularReactiveForms

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
