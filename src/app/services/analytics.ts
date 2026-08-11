import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare global { interface Window { dataLayer: any[]; }}
@Injectable({
  providedIn: 'root',
})
export class Analytics {
  constructor(private router: Router){}

  initTracking(){
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e:any) => {
      if (typeof window !== 'undefined' && window.dataLayer){
        window.dataLayer.push({ event: 'virtual_page_view', path_path: e.urlAfterReidrects });
      }
    });
  }
  trackEvent(eventName: string, data?: object){
    if (typeof window !== 'undefined' && window.dataLayer){
      window.dataLayer.push({ event: eventName, ...data });
    }
  }
}
