import { useState, useEffect } from 'react';
import RepaymentTable from '../RepaymentTable/RepaymentTable';
import styles from './CalculatorOutput.module.css';

export default function CalculatorOutput({ inputData }) {
  const [loanStartDate, setLoanStartDate] = useState('');
  const [repaymentSum, setRepaymentSum] = useState(0);
  const [interestSum, setInterestSum] = useState(0);
  const [numberOfPayments, setNumberOfPayments] = useState(0);
  const [interval, setInterval] = useState(null);
  const [momentInterval, setMomentInterval] = useState(0);

  useEffect(() => {
    if (!!inputData) {
      const { startDate, loanAmount, installmentInterval, installmentAmount, interestRate } =
        inputData;
      const timeInterval = {
        daily: 365,
        weekly: 52,
        monthly: 12,
      };
      setLoanStartDate(startDate);
      setInterestSum(loanAmount * interestRate);
      setRepaymentSum(loanAmount + loanAmount * interestRate);
      setNumberOfPayments(Math.round((loanAmount + loanAmount * interestRate) / installmentAmount));
      if (installmentInterval === 'daily') {
        setInterval(timeInterval.daily);
        setMomentInterval(1);
      }
      if (installmentInterval === 'weekly') {
        setInterval(timeInterval.weekly);
        setMomentInterval(7);
      }
      if (installmentInterval === 'monthly') {
        setInterval(timeInterval.monthly);
        setMomentInterval(30);
      }
    }
  }, [inputData]);

  return (
    <div className={styles.calculatorOutput}>
      {!!inputData && (
        <RepaymentTable
          loanStartDate={!!loanStartDate && loanStartDate}
          repaymentSum={!!repaymentSum && repaymentSum}
          loanAmount={inputData?.loanAmount}
          interestAmount={!!interestSum && interestSum}
          numberOfPayments={!!numberOfPayments && numberOfPayments}
          paymentAmount={inputData?.installmentAmount}
          installmentInterval={!!interval && interval}
          momentInterval={!!momentInterval && momentInterval}
        />
      )}
    </div>
  );
}
