//import { Injectable } from '@angular/core';

//@Injectable({
//  providedIn: 'root'
//})
//export class TransactionService {

//  constructor() { }
//}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './transaction.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = `${environment.apiBaseUrl}/transactions`;

  constructor(private http: HttpClient) { }

  deposit(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/deposit`, transaction);
  }

  withdraw(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/withdraw`, transaction);
  }

  transfer(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transfer`, transaction);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }
}
