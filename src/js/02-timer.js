import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
let targetDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0].getTime();
    console.log('🚀  targetDate:', targetDate);
    // console.log(selectedDates[0].getTime());
    if (targetDate <= Date.now()) {
      window.alert('Please choose a date in the future');
    }

    if (selectedDates[0].getTime() > Date.now()) {
      startBtn.disabled = false;
    }
  },
};

startBtn.disabled = true;

startBtn.addEventListener('click', onStartBtnClick);

flatpickr('#datetime-picker', options);

function onStartBtnClick() {
  const intervalId = setInterval(() => {
    const remainingTime = targetDate - Date.now();
    // const remainingTimeObject = convertMs(remainingTime);
    // const { days, hours, minutes, seconds } = remainingTimeObject;
    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    daysEl.textContent = days;
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
