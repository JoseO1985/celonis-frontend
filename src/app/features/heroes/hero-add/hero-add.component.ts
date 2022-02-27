import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Gender } from '../models/enums/gender';

@Component({
  selector: 'app-hero-add',
  templateUrl: './hero-add.component.html',
  styleUrls: ['./hero-add.component.scss']
})
export class HeroAddComponent implements OnInit {

  form!: FormGroup;
  Gender = Gender;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HeroAddComponent>
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      nameLabel: ['', [Validators.required]],
      genderLabel: ['', [Validators.required]],
      citizenshipLabel: ['', [Validators.required]],
      skillsLabel: ['', [Validators.required]],
      occupationLabel: ['', [Validators.required]],
      memberOfLabel: ['', [Validators.required]],
      creatorLabel: ['', [Validators.required]]
    });
  }


  onClose() {
    this.dialogRef.close();
  }

  onCreate() {
    if (!this.form.valid)
      return;
    this.dialogRef.close(this.form.value);
  }
}
