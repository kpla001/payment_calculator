import { useState, useEffect } from 'react';
import styles from './CalculatorOutput.module.css';

export default function CalculatorOutput({ inputData }) {
  //   console.log(inputData);
  const [startDate, setStartDate] = useState('');
  const [loanAmount, setLoanAmount] = useState(0);
  const [installmentInterval, setInstallmentInterval] = useState('');
  const [installmentAmount, setInstallmentAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [repaymentSum, setRepaymentSum] = useState(0);

  useEffect(() => {
    if (!!inputData) {
      console.log(inputData);
      setStartDate(inputData.startDate);
      setLoanAmount(Number.parseFloat(inputData.loanAmount));
      setInstallmentInterval(inputData.installmentInterval);
      setInstallmentAmount(Number.parseFloat(inputData.installmentAmount));
      setInterestRate(Number.parseFloat(inputData.interestRate) / 100);
      setRepaymentSum(loanAmount + loanAmount * interestRate);
    }
  }, [inputData]);

  console.log({ startDate, loanAmount, installmentInterval, installmentAmount, interestRate });

  return <div></div>;
}
