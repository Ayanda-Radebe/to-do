//setting up the date to be current date

const currentDateElement = document.getElementById('current-date');

const date = new Date();
const day = date.getDate();
const month = date.toLocaleString('default', { month: 'long' });
const year = date.getFullYear();

const formattedDate = `${month} ${day}, ${year}`;

currentDateElement.textContent = formattedDate;