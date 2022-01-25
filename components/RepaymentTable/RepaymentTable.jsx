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
      console.log(rows);
    }
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
      <tbody>
        {listPayments(loanAmount, interestAmount, numberOfPayments, paymentAmount)}
        {/* <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr> */}
      </tbody>
    </table>
  );
}

// return (
//   <tr>
//     <td>{i + 1}</td>
//     <td>{paymentAmount}</td>
//     <td>{i + 365 / 12}</td>
//   </tr>
// );
