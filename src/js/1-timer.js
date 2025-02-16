import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerInterval = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      window.alert('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};

flatpickr(input, options);

startBtn.addEventListener('click', () => {
  if (!userSelectedDate) return;

  startBtn.disabled = true;
  input.disabled = true;

  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDiff = userSelectedDate - currentTime;

    if (timeDiff <= 0) {
      clearInterval(timerInterval);
      input.disabled = false;
      return;
    }

    updateTimerDisplay(timeDiff);
  }, 1000);
});

function updateTimerDisplay(ms) {
  const time = convertMs(ms);
  daysSpan.textContent = addLeadingZero(time.days);
  hoursSpan.textContent = addLeadingZero(time.hours);
  minutesSpan.textContent = addLeadingZero(time.minutes);
  secondsSpan.textContent = addLeadingZero(time.seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));
