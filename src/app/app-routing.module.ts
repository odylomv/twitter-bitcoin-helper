import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HideComponent } from './components/hide/hide.component';
import { TwitterGuard } from './guards/twitter.guard';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [TwitterGuard] },
    { path: 'hide', component: HideComponent },
    { path: '**', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
