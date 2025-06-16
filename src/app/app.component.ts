import { Component, inject, signal, effect, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { QuoteService } from './services/quote.service';
import { TrackService } from './services/track.service';
import { Visit } from './models/visit.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'quote-app';

  quote = signal('');
  author = signal('');
  isLoading = signal(true);
  error = signal('');
  visitorCount = signal(0);
  darkMode = signal(false); // New signal for dark mode state

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

    // Set up dark mode effect
    effect(() => {
      if (this.darkMode()) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      // Save preference to localStorage
      localStorage.setItem('darkMode', this.darkMode().toString());
    });

    this.loadQuote();
  }

  ngOnInit(): void {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      this.darkMode.set(savedTheme === 'true');
    } else {
      // Check for system preference if no saved preference
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.darkMode.set(prefersDark);
    }

    this.trackService.trackProjectVisit(this.title).subscribe({
      next: (response: Visit) => {
        this.visitorCount.set(response.uniqueVisitors);
      },
      error: (err: Error) => {
        console.error('Failed to track visit:', err);
      },
    });
  }
  toggleDarkMode(): void {
    this.darkMode.update((current) => !current);
  }

  loadQuote(): void {
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

  shareQuote(): void {
    const quoteText = `"${this.quote()}" - ${this.author()}`;

    if (navigator.share) {
      // Use native sharing if available
      navigator
        .share({
          title: 'Daily Quote',
          text: quoteText,
          url: window.location.href,
        })
        .catch((err) => {
          console.log('Error sharing:', err);
          this.fallbackShare(quoteText);
        });
    } else {
      // Fallback to clipboard
      this.fallbackShare(quoteText);
    }
  }

  private fallbackShare(text: string): void {
    // Copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          // You could show a toast notification here
          console.log('Quote copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy quote:', err);
        });
    }
  }
}
