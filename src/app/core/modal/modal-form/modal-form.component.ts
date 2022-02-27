import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {

  form!: FormGroup;
  formControlNames: string[] = []

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    const controlsConfig = this.createControlsConfig();
    this.form = this.fb.group(controlsConfig);
    this.formControlNames = Object.keys(this.form.controls);
  }

  createControlsConfig(): {[key: string]: any} {
    const keys = Object.keys(this.data);
    return keys.reduce((prev, curr: string) => {
      return {
        ...prev,
        [curr]: [this.data[curr], []]
      }
    }, {});
  }

  onClose() {
    this.dialogRef.close();
  }
}
