import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

import CalculatorInput from '../components/CalculatorInput/CalculatorInput';
import CalculatorOutput from '../components/CalculatorOutput/CalculatorOutput';

export default function Home() {
  const [inputData, setInputData] = useState(null);

  const handleInput = formData => {
    setInputData(formData);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Simple Interest Repayment Calculator</title>
        <meta
          name="Simple Interest Repayment Calculator"
          content="Simple Interest Repayment Calculator"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <CalculatorInput handleInput={handleInput} />
        <CalculatorOutput inputData={inputData} />
      </main>
    </div>
  );
}
