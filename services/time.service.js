const hasPassedXNumberOfDays = (date, numberOfDays) => {
  const givenDate = new Date(date);
  const difference = Date.now() - givenDate.getTime();
  const daysPassed = Math.floor(difference / (1000 * 60 * 60 * 24));

  return daysPassed >= numberOfDays;
};

const getTimeDifferenceInMinutes = (date) => {
  const differenceInMilliseconds = Date.now() - new Date(date);
  const minutes = differenceInMilliseconds / (1000 * 60);
  // const utcTimeDifference = minutes + new Date().getTimezoneOffset();
  return minutes;
};

const unixTimeInMinutes = (date) => {
  const timeInMilliseconds = new Date(date).getTime();
  const timeInMinutes = timeInMilliseconds / (1000 * 60);
  return timeInMinutes;
};

const nextMonthDate = (currentDate) => {
  const currentMonth = currentDate.getMonth();
  const nextMonth = (currentMonth + 1) % 12; // Handles December (11 + 1 = 12 % 12 = 0)
  const nextYear = currentMonth === 11 ? currentDate.getFullYear() + 1 : currentDate.getFullYear();

  // Get the day of the input date (e.g., 31st, 30th, etc.)
  const day = currentDate.getDate();

  // Get the last day of the next month
  const lastDayOfNextMonth = new Date(nextYear, nextMonth + 1, 0).getDate();

  // Determine the day for the next month date, considering month-end scenarios
  const nextMonthDay = Math.min(day, lastDayOfNextMonth);

  return new Date(nextYear, nextMonth, nextMonthDay);
};

const nextYearDate = (currentDate) => {
  const currentYear = currentDate.getFullYear();
  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  // Determine the number of days in February for the current year
  const daysInFebruary = isLeapYear(currentYear) ? 29 : 28;

  // Define the number of days in each month
  const daysInMonths = [31, daysInFebruary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Get the current month and day
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  // Calculate the date for the same day next year
  const nextYear = currentYear + 1;
  let nextMonth = currentMonth;
  let nextDay = currentDay;

  // Handle cases where the current day exceeds the days in the next month
  if (nextDay > daysInMonths[nextMonth]) {
    nextMonth += 1;
    nextDay = 1;
  }

  // Return the date for the same day next year
  return new Date(nextYear, nextMonth, nextDay);
};

module.exports = {
  hasPassedXNumberOfDays,
  getTimeDifferenceInMinutes,
  unixTimeInMinutes,
  nextMonthDate,
  nextYearDate,
};
