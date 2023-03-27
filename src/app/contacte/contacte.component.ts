import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface FormModel {
  captcha?: string;
}

@Component({
  selector: 'app-contacte',
  templateUrl: './contacte.component.html',
  styleUrls: ['./contacte.component.css']
})
export class ContacteComponent {

  formulario: FormGroup;
  formularioEnviado = false;
  captchaClick = false;
  formModel: FormModel = {};
  siteKey = '6LfZPjglAAAAAOAAQmNJ_6TriWMee1qYZtu8M8Ex';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required],
      captcha: ['', Validators.required]
    });
  }

  Captcha(): void {
    this.captchaClick = true;
  }

  onSubmit(): void {
    this.http.post('http://localhost:3070/contacte', this.formulario.value)
      .subscribe(
        (response) => {
          console.log(response);
          this.formularioEnviado = true;
        },
        (error) => console.log(error)
      );
  }

}
