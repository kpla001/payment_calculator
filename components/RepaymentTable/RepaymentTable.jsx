import styles from './RepaymentTable.module.css';

export default function RepaymentTable({
  loanAmount,
  interestAmount,
  numberOfPayments,
  paymentAmount,
}) {
  const listPayments = (loan, interest, numOfPayments, payment) => {
    const rows = [];
    for (let i = 0; i < numOfPayments; i++) {
      rows.push({ period: i + 1, payment: paymentAmount, dayOutOf365: i * (365 / 12) });
    }
    return (
      <>
        {rows.map(row => (
          <tr key={row.period}>
            <td>{row.period}</td>
            <td>{row.payment}</td>
            <td>{row.dayOutOf365}</td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Payment Period</th>
          <th>Paid Amount</th>
          <th>Day out of 365</th>
        </tr>
      </thead>
      <tbody>{listPayments(loanAmount, interestAmount, numberOfPayments, paymentAmount)}</tbody>
    </table>
  );
}
