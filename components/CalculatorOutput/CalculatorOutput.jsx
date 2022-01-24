import { useState, useEffect } from 'react';
import styles from './CalculatorOutput.module.css';

export default function CalculatorOutput({ inputData }) {
  //   console.log(inputData);

  const [repaymentSum, setRepaymentSum] = useState(0);

  useEffect(() => {
    if (!!inputData) {
      const { startDate, loanAmount, installmentInterval, installmentAmount, interestRate } =
        inputData;
      setRepaymentSum(loanAmount + loanAmount * interestRate);
    }
  }, [inputData]);

  //   console.log({ startDate, loanAmount, installmentInterval, installmentAmount, interestRate });

  return <div></div>;
}
