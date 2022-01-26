import { useState, useEffect } from 'react';
import RepaymentTable from '../RepaymentTable/RepaymentTable';
import styles from './CalculatorOutput.module.css';

export default function CalculatorOutput({ inputData }) {
  const [repaymentSum, setRepaymentSum] = useState(0);
  const [interestSum, setInterestSum] = useState(0);
  const [numberOfPayments, setNumberOfPayments] = useState(0);

  useEffect(() => {
    if (!!inputData) {
      const { startDate, loanAmount, installmentInterval, installmentAmount, interestRate } =
        inputData;
      setInterestSum(loanAmount * interestRate);
      setRepaymentSum(loanAmount + loanAmount * interestRate);
      setNumberOfPayments(Math.round((loanAmount + loanAmount * interestRate) / installmentAmount));

      //   calculate(startDate, loanAmount, installmentInterval, installmentAmount, interestRate);
    }
  }, [inputData]);

  const weekend = day => {
    if (day.getDay() == 6 || day.getDay() == 0) {
      return true;
    } else {
      return false;
    }
  };

  const calculateNumberOfPayments = () => {
    // if (installmentInterval === 'daily') {
    //   setNumberOfAnnualPayments();
    // }
    // if (installmentInterval === 'weekly') {
    //   setNumberOfAnnualPayments();
    // }
    // if (installmentInterval === 'monthly') {
    //   setNumberOfAnnualPayments();
    // }
  };

  //   console.log(weekend(date));
  //   function calculate(date, amount, interval, installment, rate) {}

  return (
    <div className={styles.calculatorOutput}>
      {!!inputData && (
        <RepaymentTable
          repaymentSum={!!repaymentSum && repaymentSum}
          loanAmount={inputData?.loanAmount}
          interestAmount={!!interestSum && interestSum}
          numberOfPayments={!!numberOfPayments && numberOfPayments}
          paymentAmount={inputData?.installmentAmount}
        />
      )}
    </div>
  );
}
