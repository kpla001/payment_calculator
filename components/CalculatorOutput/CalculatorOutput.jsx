import { useState, useEffect } from 'react';
import RepaymentTable from '../RepaymentTable/RepaymentTable';
import moment from 'moment';
import styles from './CalculatorOutput.module.css';

export default function CalculatorOutput({ inputData }) {
  const [loanStartDate, setLoanStartDate] = useState('');
  const [repaymentSum, setRepaymentSum] = useState(0);
  const [interestSum, setInterestSum] = useState(0);
  const [numberOfPayments, setNumberOfPayments] = useState(0);
  const [momentInterval, setMomentInterval] = useState(0);

  useEffect(() => {
    if (!!inputData) {
      const { startDate, loanAmount, installmentInterval, installmentAmount, interestRate } =
        inputData;
      setLoanStartDate(moment.parseZone(startDate).format('MM/DD/YYYY'));
      setInterestSum(loanAmount * interestRate);
      setRepaymentSum(loanAmount + loanAmount * interestRate);
      setNumberOfPayments(Math.round((loanAmount + loanAmount * interestRate) / installmentAmount));
      if (installmentInterval === 'daily') {
        setMomentInterval(1);
      }
      if (installmentInterval === 'weekly') {
        setMomentInterval(7);
      }
      if (installmentInterval === 'monthly') {
        setMomentInterval(30.437);
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
          momentInterval={!!momentInterval && momentInterval}
        />
      )}
    </div>
  );
}
