import { useState, useEffect } from 'react';
import styles from './CalculatorOutput.module.css';

export default function CalculatorOutput({ inputData }) {
  const [repaymentSum, setRepaymentSum] = useState(0);
  const [interestSum, setInterestSum] = useState(0);
  const [totalNumberOfPayments, setTotalNumberOfPayments] = useState(0);

  //   const interval = {
  //     daily: 365,
  //     weekly: 52,
  //     monthly: 12,
  //   };

  useEffect(() => {
    if (!!inputData) {
      const { startDate, loanAmount, installmentInterval, installmentAmount, interestRate } =
        inputData;

      if (installmentInterval === 'daily') {
        setTotalNumberOfPayments(
          Math.ceil((loanAmount + loanAmount * interestRate) / installmentAmount) * 22,
        );
      }
      if (installmentInterval === 'weekly') {
        setTotalNumberOfPayments(
          Math.ceil((loanAmount + loanAmount * interestRate) / installmentAmount) * 4,
        );
      }
      if (installmentInterval === 'monthly') {
        setTotalNumberOfPayments(
          Math.ceil((loanAmount + loanAmount * interestRate) / installmentAmount),
        );
      }

      setInterestSum(loanAmount * interestRate);
      setRepaymentSum(loanAmount + loanAmount * interestRate);
    }
  }, [inputData]);

  return <div></div>;
}
