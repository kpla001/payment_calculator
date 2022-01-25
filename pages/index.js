import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

import CalculatorInput from '../components/CalculatorInput/CalculatorInput';
import CalculatorOutput from '../components/CalculatorOutput/CalculatorOutput';
import RepaymentTable from '../components/RepaymentTable/RepaymentTable';

export default function Home() {
  const [inputData, setInputData] = useState(null);

  const handleInput = formData => {
    setInputData(formData);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Uplyft Capital - Repayment Calculator</title>
        <meta
          name="Repayment Calculator for Uplyft Capital dev evaluation"
          content="Repayment Calculator for Uplyft Capital dev evaluation"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <CalculatorInput handleInput={handleInput} />
        {
          // !!inputData &&
          <CalculatorOutput inputData={inputData} />
        }
      </main>
    </div>
  );
}
