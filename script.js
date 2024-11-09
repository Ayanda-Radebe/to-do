// Setting up the date to be current date
const currentDateElement = document.getElementById('current-date');
const date = new Date();
const day = date.getDate();
const month = date.toLocaleString('default', { month: 'long' });
const year = date.getFullYear();
const formattedDate = `${month} ${day}, ${year}`;
currentDateElement.textContent = formattedDate;

const calendarIcon = document.getElementById('calendar-icon');
const datePopup = document.getElementById('date-popup');
const datePickerInput = document.getElementById('date-picker');
const saveDateBtn = document.getElementById('save-date-btn');
let selectedDate;

// Initialize flatpickr
let fpInstance = flatpickr(datePickerInput, {
  disableMobile: true,
  closeOnSelect: false,
  onChange: function(selectedDates) {
    selectedDate = selectedDates[0];
  }
});

// Show popup and calendar when calendar icon is clicked
calendarIcon.addEventListener('click', () => {
  datePopup.style.display = 'block';
  fpInstance.open();
});

// Hide popup and calendar when Save button is clicked
saveDateBtn.addEventListener('click', () => {
  datePopup.style.display = 'none';
  console.log(`Saved date: ${selectedDate}`);
});
