import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Gender } from '../models/enums/gender';

@Component({
  selector: 'app-hero-add-edit',
  templateUrl: './hero-add-edit.component.html',
  styleUrls: ['./hero-add-edit.component.scss']
})
export class HeroAddEditComponent implements OnInit {

  form!: FormGroup;
  Gender = Gender;
  mode!: 'add' | 'edit';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HeroAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.mode = this.data ? 'edit' : 'add';
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      nameLabel:this.initFormControlValue('nameLabel'),
      genderLabel: this.initFormControlValue('genderLabel'),
      citizenshipLabel: this.initFormControlValue('citizenshipLabel'),
      skillsLabel: this.initFormControlValue('skillsLabel'),
      occupationLabel: this.initFormControlValue('occupationLabel'),
      memberOfLabel: this.initFormControlValue('memberOfLabel'),
      creatorLabel: this.initFormControlValue('creatorLabel')
    });
  }

  initFormControlValue(field: string) {
    return [this.mode === 'edit' ? this.data[field] : '', [Validators.required]];
  }

  onClose() {
    this.dialogRef.close();
  }

  onCreateOrUpdate() {
    if (!this.form.valid)
      return;
    this.dialogRef.close(this.form.value);
  }
}
