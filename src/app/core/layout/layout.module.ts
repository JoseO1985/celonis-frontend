import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [LayoutComponent, HeaderComponent],
  imports: [RouterModule, CommonModule, MaterialModule, FlexLayoutModule],
  exports: [LayoutComponent, HeaderComponent],
  providers: []
})
export class LayoutModule { }
