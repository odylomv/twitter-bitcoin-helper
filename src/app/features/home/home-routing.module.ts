import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwitterGuard } from '../../guards/twitter.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [{ path: '', component: HomeComponent, canActivate: [TwitterGuard] }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
