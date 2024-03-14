import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
})
export class AddPropertyComponent implements OnInit {
  form!: FormGroup;
  constructor(private _form: FormBuilder) {}
  ngOnInit(): void {
    this.form = this._form.group({
      name: [''],
      type: [''],
      price: [''],
    });
  }

  add() {
    console.log(this.form.value);
  }
}
