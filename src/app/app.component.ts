import { Component, inject, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { QuoteService } from './services/quote.service';
import { TrackService } from './services/track.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'quote-app';

  quote = signal('');
  author = signal('');
  isLoading = signal(true);
  error = signal('');

  currentYear = new Date().getFullYear();

  quoteService = inject(QuoteService);
  trackService = inject(TrackService);
  meta = inject(Meta);

  constructor() {
    // Basic meta tags
    this.meta.addTags([
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico',
      },
      {
        name: 'canonical',
        content: 'https://quote-app-manthanank.vercel.app/',
      },
      {
        name: 'author',
        content: 'Manthan Ankolekar',
      },
      {
        name: 'keywords',
        content:
          'angular, nodejs, express, mongodb, quotes, daily quotes, inspiration',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
    ]);

    // OpenGraph meta tags
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Quote App',
      },
      {
        property: 'og:description',
        content:
          'Get your daily dose of inspiration with AI-generated quotes. A modern web app built with Angular and powered by Google Gemini AI.',
      },
      {
        property: 'og:url',
        content: 'https://quote-app-manthanank.vercel.app/',
      },
    ]);

    this.loadQuote();
  }

  ngOnInit(): void {
    this.trackService.trackProjectVisit(this.title);
  }

  private loadQuote(): void {
    this.isLoading.set(true);
    this.error.set('');

    this.quoteService.getQuote().subscribe({
      next: (data) => {
        this.quote.set(data.text);
        this.author.set(data.author);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load quote. Please try again later.');
        this.isLoading.set(false);
      },
    });
  }
}
