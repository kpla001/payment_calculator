import styles from './RepaymentTable.module.css';

export default function RepaymentTable({
  loanAmount,
  interestAmount,
  numberOfPayments,
  paymentAmount,
}) {
  const listPayments = () => {
    const rows = [];
    const balance = loanAmount + interestAmount;
    for (let i = 0; i < numberOfPayments; i++) {
      rows.push({
        period: i + 1,
        paymentAmount,
        dayOutOf365: Math.round((i + 1) * (365 / 12) * 100) / 100,
        balance: balance - paymentAmount * (i + 1),
      });
    }
    return (
      <>
        {rows.map(row => (
          <tr key={row.period}>
            <td>{row.period}</td>
            <td>{row.paymentAmount}</td>
            <td>{row.balance}</td>
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
          <th>Payment</th>
          <th>Balance</th>
          <th>Day out of 365</th>
        </tr>
      </thead>
      <tbody>{listPayments()}</tbody>
    </table>
  );
}
