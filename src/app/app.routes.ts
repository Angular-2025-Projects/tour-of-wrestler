import { Routes } from '@angular/router';
import { WrestlersComponent } from './wrestlers/wrestlers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WrestlerDetailComponent } from './wrestler-detail/wrestler-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'wrestlers', component: WrestlersComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: WrestlerDetailComponent },
];
