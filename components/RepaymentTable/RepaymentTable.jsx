import moment from 'moment';
import styles from './RepaymentTable.module.css';

export default function RepaymentTable({
  loanStartDate,
  repaymentSum,
  loanAmount,
  interestAmount,
  numberOfPayments,
  paymentAmount,
  installmentInterval,
  momentInterval,
}) {
  const listPayments = () => {
    const rows = [];
    const balance = loanAmount + interestAmount;
    const lastPayment = [];
    const zero = 0;

    for (let i = 0; i < numberOfPayments; i++) {
      if (i === numberOfPayments - 2) {
        lastPayment.push(paymentAmount);
      }
      if (i === numberOfPayments - 1 && balance - paymentAmount * (i + 1) < 0) {
        rows.push({
          period: i + 1,
          paymentAmount: (lastPayment[0] + (balance - paymentAmount * (i + 1))).toFixed(2),
          dayOutOf365: moment(moment(loanStartDate).format('MM-DD-YYYY'))
            .add(momentInterval * (i + 1), 'days')
            .calendar(),
          balance: zero.toFixed(2),
        });
      } else if (i === numberOfPayments - 1 && balance - paymentAmount * (i + 1) > 0) {
        rows.push(
          {
            period: i + 1,
            paymentAmount: paymentAmount.toFixed(2),
            dayOutOf365: moment(moment(loanStartDate).format('MM-DD-YYYY'))
              .add(momentInterval * (i + 1), 'days')
              .calendar(),
            balance: (balance - paymentAmount * (i + 1)).toFixed(2),
          },
          {
            period: i + 2,
            paymentAmount: (balance - paymentAmount * (i + 1)).toFixed(2),
            dayOutOf365: Mmoment(moment(loanStartDate).format('MM-DD-YYYY'))
              .add(momentInterval * (i + 2), 'days')
              .calendar(),
            balance: zero.toFixed(2),
          },
        );
      } else {
        rows.push({
          period: i + 1,
          paymentAmount: paymentAmount.toFixed(2),
          // dayOutOf365: Math.round((i + 1) * (365 / installmentInterval) * 100) / 100,
          dayOutOf365: moment(moment(loanStartDate).format('MM-DD-YYYY'))
            .add(momentInterval * (i + 1), 'days')
            .calendar(),
          balance: (balance - paymentAmount * (i + 1)).toFixed(2),
        });
      }
    }
    return (
      <>
        {rows.map(row => (
          <tr key={row.period}>
            <td>{row.period}</td>
            <td>{`$ ${row.paymentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</td>
            <td>{`$ ${row.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</td>
            <td>{moment(row.dayOutOf365).format('MM/DD/YYYY')}</td>
          </tr>
        ))}
      </>
    );
  };

  const startingBalance = repaymentSum && repaymentSum.toFixed(2);

  return (
    <table>
      <thead>
        <tr>
          <th>Payment Period</th>
          <th> Payment</th>
          <th> Loan Balance</th>
          <th> Day out of 365</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0</td>
          <td>{`$ ${(0).toFixed(2)}`}</td>
          <td>{`$ ${startingBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</td>
          <td>{moment(loanStartDate).format('MM/DD/YYYY')}</td>
        </tr>
        {listPayments()}
      </tbody>
    </table>
  );
}
