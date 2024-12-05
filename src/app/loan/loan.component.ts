//import { Component } from '@angular/core';

//@Component({
//  selector: 'app-loan',
//  templateUrl: './loan.component.html',
//  styleUrls: ['./loan.component.css']
//})
//export class LoanComponent {

//}
import { Component, OnInit } from '@angular/core';
import { LoanService } from './loan.service';
import { Loan } from './loan.model';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  loans: Loan[] = [];
  newLoan: Loan = new Loan();
  selectedLoan: Loan | null = null;
  repaymentAmount: number = 0;
  overdueDays: number = 0;
  penaltyAmount: number = 0;

  constructor(private loanService: LoanService, private formBuilder: FormBuilder,
    private routes: Router) { }

  ngOnInit(): void {
    this.getAllLoans();
  }

  // Get all loans
  getAllLoans(): void {
    this.loanService.getAllLoans().subscribe(
      (loans) => {
        console.log('Fetched loans:', loans);
        this.loans = loans;
      },
      (error) => {
        console.error('Error fetching loans:', error);
      }
    );
  }

  // Apply for a new loan
  applyForLoan(): void {
    this.loanService.applyForLoan(this.newLoan).subscribe(
      (loan) => {
        this.loans.push(loan);
        this.newLoan = new Loan(); // Reset the form
      },
      (error) => {
        console.error('Error applying for loan:', error);
      }
    );
  }

  // Approve or reject a loan
  approveLoan(id: number, isApproved: boolean): void {
    this.loanService.approveLoan(id, isApproved).subscribe(
      () => {
        const loan = this.loans.find((l) => l.loanId === id);
        if (loan) {
          loan.isApproved = isApproved;
        }
      },
      (error) => {
        console.error('Error approving loan:', error);
      }
    );
  }

  // Repay loan
  repayLoan(id: number): void {
    this.loanService.repayLoan(id, this.repaymentAmount).subscribe(
      (response) => {
        const loan = this.loans.find((l) => l.loanId === id);
        if (loan) {
          loan.remainingBalance = response.remainingBalance;
        }
        this.repaymentAmount = 0; // Reset repayment amount
      },
      (error) => {
        console.error('Error repaying loan:', error);
      }
    );
  }

  // Calculate loan penalty
  calculatePenalty(id: number): void {
    this.loanService.calculatePenalty(id, this.overdueDays).subscribe(
      (response) => {
        this.penaltyAmount = response.penalty;
      },
      (error) => {
        console.error('Error calculating penalty:', error);
      }
    );
  }

  // Select a loan to view details
  selectLoan(loan: Loan): void {
    this.selectedLoan = loan;
  }
}
