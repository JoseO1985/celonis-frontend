import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-hero-modal-detail',
  templateUrl: './hero-modal-detail.component.html',
  styleUrls: ['./hero-modal-detail.component.scss']
})
export class HeroModalDetailComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HeroModalDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Hero
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      nameLabel: [this.data.nameLabel, []],
      genderLabel: [this.data.genderLabel, []],
      citizenshipLabel: [this.data.citizenshipLabel, []],
      skillsLabel: [this.data.skillsLabel, []],
      occupationLabel: [this.data.occupationLabel, []],
      memberOfLabel: [this.data.memberOfLabel, []],
      creatorLabel: [this.data.creatorLabel, []]
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
