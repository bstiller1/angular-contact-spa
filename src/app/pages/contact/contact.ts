import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Analytics } from '../../services/analytics';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private fb = inject(FormBuilder);
  private analytics = inject(Analytics);

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
    setTimeout(() => {
      this.successMessage = false;
    }, 4000);
  }
}
