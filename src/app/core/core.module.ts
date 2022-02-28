import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { LayoutModule } from "./layout/layout.module";
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ModalModule } from './modal/modal.module';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LayoutModule,
    ToastrModule.forRoot()
  ],
  declarations: [],
  exports: [
    ToastrModule,
    ModalModule
    ],
  providers: [
    ToastrService,
    LocalStorageService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
