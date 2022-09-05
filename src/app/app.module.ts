import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionMakerComponent } from './components/transaction-maker/transaction-maker.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, TransactionMakerComponent],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
