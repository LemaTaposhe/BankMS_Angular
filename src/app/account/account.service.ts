//import { Injectable } from '@angular/core';
//@Injectable({
//  providedIn: 'root'
//})
//export class AccountService {

//  constructor() { }
//}
// src/app/services/account.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Account } from './account.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl: string = `${environment.apiBaseUrl}/Accounts`;

  constructor(private httpClient: HttpClient) { }

  private getHttpOptions() {
    const token = localStorage.getItem('token'); // Get token from localStorage
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }

  // Get all accounts
  getAllAccounts(): Observable<Account[]> {
    return this.httpClient.get<any>(this.apiUrl, this.getHttpOptions())
      .pipe(
        map(response => response.$values),  // Extract the array from the response
        catchError(this.handleError)
      );
  }

  // Get a specific account by ID
  getAccountById(id: number): Observable<Account> {
    return this.httpClient.get<Account>(`${this.apiUrl}/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  // Apply for a new account
  applyForAccount(account: Account): Observable<Account> {
    return this.httpClient.post<Account>(`${this.apiUrl}/apply`, account, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update an account
  updateAccount(id: number, account: Account): Observable<Account> {
    return this.httpClient.put<Account>(`${this.apiUrl}/${id}`, account, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  // Close an account
  closeAccount(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  // Deposit money into an account
  deposit(id: number, depositAmount: number): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/${id}/deposit`, { depositAmount }, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  // Withdraw money from an account
  withdraw(id: number, withdrawalAmount: number): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/${id}/withdraw`, { withdrawalAmount }, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  // Transfer money between accounts
  transfer(id: number, toAccountId: number, transferAmount: number): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/${id}/transfer/${toAccountId}`, { transferAmount }, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  // Calculate account penalty for overdue payments (if applicable)
  calculatePenalty(id: number, overdueDays: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/${id}/penalty?overdueDays=${overdueDays}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
