//import { Component } from '@angular/core';

//@Component({
//  selector: 'app-transaction',
//  templateUrl: './transaction.component.html',
//  styleUrls: ['./transaction.component.css']
//})
//export class TransactionComponent {

//}
import { Component, OnInit } from '@angular/core';
import { Transaction } from './transaction.model';
import { TransactionService } from './transaction.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  newTransaction: Transaction = new Transaction();
  transactionType: string = '';

  constructor(private transactionService: TransactionService, private formBuilder: FormBuilder,
    private routes: Router,) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionService.getTransactions().subscribe(
      (transactions) => {
        this.transactions = transactions;
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }

  submitTransaction(): void {
    if (this.transactionType === 'Deposit') {
      this.transactionService.deposit(this.newTransaction).subscribe(
        (transaction) => {
          this.transactions.push(transaction);
          this.resetForm();
        },
        (error) => {
          console.error('Error during deposit:', error);
        }
      );
    } else if (this.transactionType === 'Withdraw') {
      this.transactionService.withdraw(this.newTransaction).subscribe(
        (transaction) => {
          this.transactions.push(transaction);
          this.resetForm();
        },
        (error) => {
          console.error('Error during withdrawal:', error);
        }
      );
    } else if (this.transactionType === 'Transfer') {
      this.transactionService.transfer(this.newTransaction).subscribe(
        (transaction) => {
          this.transactions.push(transaction);
          this.resetForm();
        },
        (error) => {
          console.error('Error during transfer:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.newTransaction = new Transaction();
    this.transactionType = '';
  }
}
