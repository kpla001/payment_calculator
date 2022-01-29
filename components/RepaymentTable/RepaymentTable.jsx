import moment from 'moment';
import styles from './RepaymentTable.module.css';
import Holidays from 'date-holidays';

export default function RepaymentTable({
  loanStartDate,
  repaymentSum,
  loanAmount,
  interestAmount,
  numberOfPayments,
  paymentAmount,
  momentInterval,
}) {
  const listPayments = (dailyDateHandler, monthlyAndWeeklyDateHandler) => {
    const rows = [];
    const balance = loanAmount + interestAmount;
    const lastPayment = [];
    const zero = 0;
    const dateHandler = {
      daily: dailyDateHandler,
      monthlyAndWeekly: monthlyAndWeeklyDateHandler,
    };

    for (let i = 0; i < numberOfPayments; i++) {
      const paymentDate = moment(moment(loanStartDate, 'MM-DD-YYYY').format('MM-DD-YYYY'))
        .add(Math.floor(momentInterval * (i + 1)), 'days')
        .calendar();

      const finalPaymentDate = moment(moment(loanStartDate, 'MM-DD-YYYY').format('MM-DD-YYYY'))
        .add(Math.floor(momentInterval * (i + 2)), 'days')
        .calendar();

      if (i === numberOfPayments - 2) {
        lastPayment.push(paymentAmount);
      }
      if (i === numberOfPayments - 1 && balance - paymentAmount * (i + 1) < 0) {
        rows.push({
          period: i + 1,
          paymentAmount: (lastPayment[0] + (balance - paymentAmount * (i + 1))).toFixed(2),
          date:
            momentInterval === 1
              ? dateHandler.daily(paymentDate)
              : dateHandler.monthlyAndWeekly(paymentDate),
          balance: zero.toFixed(2),
        });
      } else if (i === numberOfPayments - 1 && balance - paymentAmount * (i + 1) > 0) {
        rows.push(
          {
            period: i + 1,
            paymentAmount: paymentAmount.toFixed(2),
            date:
              momentInterval === 1
                ? dateHandler.daily(paymentDate)
                : dateHandler.monthlyAndWeekly(paymentDate),
            balance: (balance - paymentAmount * (i + 1)).toFixed(2),
          },
          {
            period: i + 2,
            paymentAmount:
              momentInterval === 1
                ? dateHandler.daily(finalPaymentDate)
                : dateHandler.monthlyAndWeekly(finalPaymentDate),
            date: monthlyAndWeeklyDateHandler(),
            balance: zero.toFixed(2),
          },
        );
      } else {
        rows.push({
          period: i + 1,
          paymentAmount: paymentAmount.toFixed(2),
          date:
            momentInterval === 1
              ? dateHandler.daily(paymentDate)
              : dateHandler.monthlyAndWeekly(paymentDate),
          balance: (balance - paymentAmount * (i + 1)).toFixed(2),
        });
        console.log(i, paymentDate);
      }
    }

    const firstWord = string => string.split(' ')[0];
    return (
      <>
        {rows.map(row => (
          <tr key={row.period}>
            <td>{row.period}</td>
            <td>{`$ ${row.paymentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</td>
            <td>{`$ ${row.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</td>
            <td>{firstWord(row.date)}</td>
          </tr>
        ))}
      </>
    );
  };

  function isWeekend(day) {
    const checkDay = moment(day).format('dddd');
    return checkDay == 'Sunday' || checkDay == 'Saturday' ? true : false;
  }

  function isHoliday(day) {
    const hd = new Holidays('US');
    const reformattedDay = moment(moment(day).format('MM-DD-YYYY')).add(1, 'days').calendar();
    const checkedDay = hd.isHoliday(new Date(`${reformattedDay} 00:00:00 EST+0000`));
    return checkedDay[0]?.type === 'public' ||
      (checkedDay[0]?.type === 'public' && checkedDay[0].substitute === true)
      ? true
      : false;
  }

  function monthlyAndWeeklyDateHandler(paymentDate) {
    if (isWeekend(paymentDate) === true || isHoliday(paymentDate) === true) {
      const substituteDate = moment(paymentDate).add(1, 'days').calendar();
      return monthlyAndWeeklyDateHandler(substituteDate);
    } else {
      return paymentDate;
    }
  }

  function dailyDateHandler(paymentDate) {
    if (isWeekend(paymentDate) === true || isHoliday(paymentDate) === true) {
      const substituteDate = moment(paymentDate).add(1, 'days').calendar();
      return dailyDateHandler(substituteDate);
    } else {
      return paymentDate;
    }
  }

  const startingBalance = repaymentSum && repaymentSum.toFixed(2);

  return (
    <table>
      <thead>
        <tr>
          <th> Payment Period</th>
          <th> Payment</th>
          <th> Loan Balance</th>
          <th> Payment Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0</td>
          <td>{`$ ${(0).toFixed(2)}`}</td>
          <td>{`$ ${startingBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</td>
          <td>
            {
              moment(moment(loanStartDate).format('MM/DD/YYYY'))
                .add(0, 'days')
                .calendar()
                .split(' ')[0]
            }
          </td>
        </tr>
        {listPayments(dailyDateHandler, monthlyAndWeeklyDateHandler)}
      </tbody>
    </table>
  );
}

//create work-around for invalid dates (array)
