import './App.css';
import ArrowIcon from './age-calculator-app-main/assets/images/icon-arrow.svg';
import { useState } from 'react';
function Form() {
  const [formData, setFormData] = useState({ year: '', month: '', day: '' });
  const [displayData, setDisplayData] = useState({ year: '--', month: '--', day: '--' });
  const ageData = { year: 0, month: 0, day: 0 };

  function handleSubmit(event) {
    event.preventDefault();
    calculateAge();
    animateCount();
  }

  // https://stackoverflow.com/questions/12251325/javascript-date-to-calculate-age-work-by-the-day-months-years
  function calculateAge() {
    // current date
    const date = new Date();
    const yearNow = date.getFullYear();
    const monthNow = date.getMonth();
    const dayNow = date.getDate();

    // dob
    const yearDob = formData.year;
    const monthDob = formData.month;
    const dayDob = formData.day;

    // calculate
    let ageYears = yearNow - yearDob;
    let ageMonth = 0;
    let ageDay = 0;
    if (monthNow >= monthDob) {
      ageMonth = monthNow - monthDob;
    } else {
      ageYears--;
      ageMonth = 12 + monthNow - monthDob;
    }

    if (dayNow >= dayDob) {
      ageDay = dayNow - dayDob;
    } else {
      ageMonth--;
      ageDay = 31 + dayNow - dayDob;

      if (ageMonth < 0) {
        ageMonth = 11;
        ageYears--;
      }
    }

    ageData.year = ageYears;
    ageData.month = ageMonth;
    ageData.day = ageDay;
    console.log(ageData);
  }

  function animateCount() {
    let yearCount = 0;
    let monthCount = 0;
    let dayCount = 0;
    const year = ageData.year;
    const month = ageData.month;
    const day = ageData.day;
    const interval = setInterval(() => {
      if (yearCount == year && monthCount == month && dayCount == day) {
        clearInterval(interval);
      }

      if (yearCount != year) {
        yearCount++;
      }

      if (monthCount != month) {
        monthCount++;
      }

      if (dayCount != day) {
        dayCount++;
      }
      setDisplayData({ ...displayData, year: yearCount, month: monthCount, day: dayCount });
      console.log("IIIII");
    }, 50);
  }

  return (
    <section className='age-calc-container'>
      <form onSubmit={handleSubmit} noValidate id='formAge'>
        <label>DAY
          <input type='text' name='day' id='dayInput'
            value={formData.day}
            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
            placeholder='DD' />
        </label>
        <label>MONTH
          <input type='text' name='month' id='monthInput'
            value={formData.month}
            onChange={(e) => setFormData({ ...formData, month: e.target.value })}
            placeholder='MM' />
        </label>
        <label>YEAR
          <input type='text' name='year' id='yearInput'
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            placeholder='YYYY' />
        </label>
        <hr />
        <button type='submit' className='submit'>
          <img src={ArrowIcon} alt='icon' />
        </button>
      </form>
      <div className='results'>
        <div>
          <span>{displayData.year}</span> years
        </div>
        <div>
          <span>{displayData.month}</span> months
        </div>
        <div>
          <span>{displayData.day}</span> days
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <><Form /></>
  );
}

export default App;
