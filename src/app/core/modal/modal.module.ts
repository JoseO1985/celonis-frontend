import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalService } from './modal.service';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { throwIfAlreadyLoaded } from '../module-import-guard';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [ModalFormComponent],
  declarations: [ModalFormComponent],
  providers: [ModalService],
})
export class ModalModule {
  constructor( @Optional() @SkipSelf() parentModule: ModalModule) {
    throwIfAlreadyLoaded(parentModule, 'ModalModule')
  }
}
