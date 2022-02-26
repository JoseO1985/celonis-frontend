import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { LayoutModule } from "./layout/layout.module";
import { ToastrModule, ToastrService } from 'ngx-toastr';

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
    LayoutModule
  ],
  providers: [
    ToastrService,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
