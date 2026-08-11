import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeoSchema {
  constructor(@Inject(DOCUMENT) private document: Document){}

  // Inject or update JSON-LD Schema in the <head>
  setJsonLd(schemaData: object, schemaId: string = 'json-ld-schema'): void {
    // check if script element already exists
    let script = this.document.getElementById(schemaId) as HTMLScriptElement;
     if (!script){
      script = this.document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
     }

     script.text = JSON.stringify(schemaData);
  }

  // Remove schema tag when leaving component/route
  removeSchema(schemaId: string = 'json-ld-schema'): void {
    const script = this.document.getElementById(schemaId);
    if (script){
      script.remove();
    }
  }
}
