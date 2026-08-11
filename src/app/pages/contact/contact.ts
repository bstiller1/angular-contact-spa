import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Analytics } from '../../services/analytics';
import { SeoSchema } from '../../services/seo-schema';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit, OnDestroy {
  private successMessageTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.schemaService.setPageMetadata({
      title: 'Contact Us',
      description: 'Reach out to our team with questions, quotes, or support requests.',
      url: '/contact',
      type: 'ContactPage'
    });
    // Set dynamic ContactPage JSON-LD schema
    const contactSchema = {
  "@context": "https://schema.org",
  "@type": "IndexPage",
  "name": "Veratile Web Development Windsor, ON | Get a Quote",
  "description": "Web Development, Web Apps, Graphic Design, Web Marketing, Advertising, Search Engine Optimization (SEO), Analytics Tracking, with quick turnover time.",
  "url": "https://127.0.0.1:4200",
  "mainEntity": {
    "@type": "Oragnization",
    "name": "Versatile Web Development",
    "url": "https://127.0.0.1:4200",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Website Quote",
      "email": "contact@versatileweb.com",
      "availableLangauge": ['Einglish']
    }
  }
};
this.schemaService.setJsonLd(contactSchema);
  }

  ngOnDestroy(): void {
    if (this.successMessageTimer) {
      clearTimeout(this.successMessageTimer);
    }
    this.schemaService.removeSchema();
  }
  private fb = inject(FormBuilder);
  private analytics = inject(Analytics);
  private schemaService = inject(SeoSchema) as any;

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });
  submitted = false;
  successMessage = false;

  // Helper getter for easy access to form fields in template
  get f() {
    return this.contactForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.contactForm.invalid){
      return;
    }

    // Fire a conversion event to GA4/Meta Pixel via GTM
    this.analytics.trackEvent('lead_form_submission', { lead_type: 'Website Quote'});
    // Process submission payload
    console.log('Form Payload:', this.contactForm.value);
    // Show success alert and reset form
    this.successMessage = true;
    this.contactForm.reset();
    this.submitted = false;

    // Hide success message after 4 seconds
    this.successMessageTimer = setTimeout(() => {
      this.successMessage = false;
      this.successMessageTimer = null;
    }, 4000);
  }
}
