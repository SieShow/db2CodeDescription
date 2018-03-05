import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeCardComponent } from './codes/code-card/code-card.component';
import { CodeDetailComponent } from './codes/code-detail/code-detail.component';
import { ROUTES } from './app.routes';
import { RouterModule, PreloadAllModules } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CodeCardComponent,
    CodeDetailComponent
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
