import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatRadioModule,
        MatFormFieldModule,
        MatInputModule,
        HomeRoutingModule,
    ],
})
export class HomeModule {}
