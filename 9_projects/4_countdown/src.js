window.onload = function () {
  timer.init();
};

function calculateTargetDate(inputDate) {
  const targetDate = new Date(inputDate).getTime();

  if (!isNaN(targetDate)) {
    console.error(`🤬🤬🤬 Wrong date format 🤬🤬🤬`);
    return;
  }

  const now = new Date().getTime();
  let remainingTimeInSeconds = (targetDate - now) / 1000;

  const daysLeft = Math.floor(remainingTimeInSeconds / 60 / 60 / 24);
  remainingTimeInSeconds %= 60 * 60 * 24;

  const hoursLeft = Math.floor(remainingTimeInSeconds / 60 / 60);
  remainingTimeInSeconds %= 60 * 60;

  const minutesLeft = Math.floor(remainingTimeInSeconds / 60);
  remainingTimeInSeconds %= 60;

  const secondsLeft = Math.floor(remainingTimeInSeconds);
  return {
    secondsLeft,
    minutesLeft,
    hoursLeft,
    daysLeft,
  };
}

function populateTimerWithData({
  secondsLeft,
  daysLeft,
  hoursLeft,
  minutesLeft,
}) {
  return `<div>
            <span>days left: </span>
            <span>${daysLeft}</span>
          </div>
          <div>
            <span>hours left: </span>
            <span>${hoursLeft} </span>
          </div>
          <div>
            <span>minutes left: </span>
            <span>${minutesLeft} </span>
          </div>
          <div>
            <span>seconds left: </span>
            <span>${secondsLeft} </span>
          </div>
`;
}

function onDateInputChange(inputDate) {
  if (!inputDate) {
    console.log(`🤬🤬🤬 You need to select time to continue 🤬🤬🤬 `);
    return;
  }
  if (timer.interval) {
    clearInterval(timer.interval);
  }

  timer.interval = setInterval(() => {
    const targetDate = calculateTargetDate(inputDate);
    console.log(`executing...`);
    timer.timerTempDiv.innerHTML = populateTimerWithData(targetDate);
  }, 1000);
}

class Timer {
  constructor() {
    this.interval = null;
  }

  init = () => {
    console.log(`app is running 🍆🍆🍆`);
    this.dateInput = document.querySelector(`#dateTimeInput`);
    this.timerTempDiv = document.querySelector(`#tempTimer`);
    console.log(this.dateInput.value);

    this.dateInput.addEventListener(`change`, () => {
      onDateInputChange(this.dateInput.value);
    });

    onDateInputChange(this.dateInput.value);
  };
}

const timer = new Timer();
const now = new Date().getTime();
