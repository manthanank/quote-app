import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private apiUrl = environment.apiUrl;

  http = inject(HttpClient);

  constructor() {}

  getQuote(): Observable<Quote> {
    return this.http.get<Quote>(this.apiUrl);
  }
}
