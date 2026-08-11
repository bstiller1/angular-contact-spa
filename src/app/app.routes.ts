import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
    { path: '', component: Home, pathMatch: 'full' },
    { path: 'about', component: About },
    { path: 'contact', component: Contact },
    { path: '**', redirectTo: '' }
];
