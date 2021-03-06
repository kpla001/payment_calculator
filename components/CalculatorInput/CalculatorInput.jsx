import { useState } from 'react';
import moment from 'moment';
import styles from './CalculatorInput.module.css';

export default function CalculatorInput({ handleInput }) {
  const [startDate, setStartDate] = useState('');
  const [loanAmount, setLoanAmount] = useState(0);
  const [installmentInterval, setInstallmentInterval] = useState('daily');
  const [installmentAmount, setInstallmentAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    let data = {
      startDate,
      loanAmount,
      installmentInterval,
      installmentAmount,
      interestRate,
    };
    setSubmitted(true);
    handleInput(data);
  };

  return (
    <div className={styles.inputContainer}>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label className="form-label" htmlFor="startDate">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            className="form-control"
            min="1920-01-01"
            max="2130-12-31"
            onChange={e => {
              setStartDate(e.target.value);
            }}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className="form-label" htmlFor="loanAmount">
            Loan Amount
          </label>
          <input
            type="number"
            name="loanAmount"
            className="form-control"
            min="0.01"
            step="0.01"
            onChange={e => {
              setLoanAmount(Number.parseFloat(e.target.value));
            }}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className="form-label" htmlFor="installmentInterval">
            Installment Interval
          </label>
          <select
            name="installmentInterval"
            className="form-select"
            onChange={e => {
              setInstallmentInterval(e.target.value);
            }}
            required
          >
            <option value="daily" defaultValue>
              Daily
            </option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label className="form-label" htmlFor="installmentAmount">
            Installment Amount
          </label>
          <input
            type="number"
            name="installmentAmount"
            className="form-control"
            min="0.01"
            step="0.01"
            onChange={e => {
              setInstallmentAmount(Number.parseFloat(e.target.value));
            }}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className="form-label" htmlFor="interestRate">
            Interest Rate (%)
          </label>
          <input
            type="number"
            name="interestRate"
            className={'form-control'}
            min="1"
            max="100"
            step="0.01"
            onChange={e => {
              setInterestRate(Number.parseFloat(e.target.value) / 100);
            }}
            required
          />
        </div>
        <br />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={e => {
            handleSubmit(e);
          }}
        >
          Calculate
        </button>
      </form>
    </div>
  );
}
