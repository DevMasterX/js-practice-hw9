import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/dark.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
let targetDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    targetDate = selectedDates[0].getTime();

    if (!selectedDates.length || targetDate <= Date.now()) {
      // window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future', {
        width: '30%',
        clickToClose: true,
        fontSize: '16px',
      });
      targetDate = null;
      startBtn.disabled = true;
      return;
    }

    startBtn.disabled = false;
  },
};

startBtn.disabled = true;
stopBtn.disabled = true;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

flatpickr('#datetime-picker', options);

function onStartBtnClick() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  inputEl.disabled = true;

  intervalId = setInterval(() => {
    const remainingTime = targetDate - Date.now();

    if (remainingTime < 1000) {
      clearInterval(intervalId);
      Notiflix.Notify.success('Timer has finished!', {
        width: '30%',
        clickToClose: true,
        fontSize: '16px',
      });
      clearTextContent();
      stopBtn.disabled = true;
      startBtn.disabled = true;
      inputEl.disabled = false;
      return;
    }

    const convertedTime = convertMs(remainingTime);

    updateTextContent(convertedTime);
  }, 1000);
}

function onStopBtnClick() {
  clearInterval(intervalId);

  clearTextContent();
  targetDate = null;

  stopBtn.disabled = true;
  inputEl.disabled = false;
}

function updateTextContent(time) {
  const { days, hours, minutes, seconds } = time;

  daysEl.textContent = days;
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

function clearTextContent() {
  daysEl.textContent = '00';
  hoursEl.textContent = '00';
  minutesEl.textContent = '00';
  secondsEl.textContent = '00';
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
