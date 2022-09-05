import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TransactionMakerComponent } from './components/transaction-maker/transaction-maker.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, TransactionMakerComponent],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
