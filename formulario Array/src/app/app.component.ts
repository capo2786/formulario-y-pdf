import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  textPattern= new RegExp(/^[a-zA-Z ]+$/);
  numberPattern= new RegExp(/^[0-9 ]+$/);

  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      'nombre': new FormControl('', [Validators.required,Validators.minLength(3) ,Validators.maxLength(30),Validators.pattern(this.textPattern)]),
      'apellido': new FormControl('', [Validators.required,Validators.minLength(3) ,Validators.maxLength(30),Validators.pattern(this.textPattern)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'fecha': new FormControl('',[Validators.required]),
      'hora': new FormControl('',[Validators.required]),
     'direcciones': new FormArray([])
    });
  }

  annadirDireccion() {
    (<FormArray>this.form.controls['direcciones']).push(new FormGroup({
      'direccion': new FormControl('', Validators.required),
      'telefono': new FormControl('', [Validators.required, Validators.minLength(10),Validators.pattern(this.numberPattern)]),
    }));
  }

  eliminarDireccion(index: number) {
    (<FormArray>this.form.controls['direcciones']).removeAt(index);
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
    this.onClear()
  }

  onClear() {
    this.form.reset();
   alert ('Formulario enviado')
  }

}
