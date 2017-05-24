import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { Draw2dComponent } from './draw2d/draw2d.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    Draw2dComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
