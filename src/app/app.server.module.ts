import { Injector, NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

export let ServerAppInjector: Injector;

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {
  constructor(private injector: Injector) {
    ServerAppInjector = this.injector;
  }
}
