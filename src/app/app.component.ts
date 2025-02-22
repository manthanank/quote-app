import { Component, inject } from '@angular/core';
import { QuoteService } from './services/quote.service';
import { TrackService } from './services/track.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'quote-app';

  quote: string = '';
  author: string = '';

  quoteService = inject(QuoteService);
  trackService = inject(TrackService);

  constructor() {}

  ngOnInit(): void {
    this.trackService.trackProjectVisit(this.title);
    this.quoteService.getQuote().subscribe((data) => {
      this.quote = data.text;
      this.author = data.author;
    });
  }
}
