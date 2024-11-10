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
const closePopupBtn = document.getElementById('close-popup-btn');
const selectedDateInput = document.getElementById('selected-date');
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

// Hide popup when Close button or Save button is clicked
[closePopupBtn, saveDateBtn].forEach((btn) => {
  btn.addEventListener('click', () => {
    datePopup.style.display = 'none';
    if (btn === saveDateBtn) {
      const formattedSelectedDate = selectedDate.toLocaleDateString();
      selectedDateInput.value = formattedSelectedDate;
      console.log(`Saved date: ${formattedSelectedDate}`);
    }
  });
});

// Get add task button element
const addTaskBtn = document.getElementById('add-task-btn');

// Setup event listener for add task button
addTaskBtn.addEventListener('click', () => {
  // Get task name, description, and selected date
  const taskName = document.getElementById('task-name').value;
  const taskDescription = document.getElementById('task-description').value;
  const selectedDate = document.getElementById('selected-date').value;

  // Validate inputs (optional)
  if (!taskName || !taskDescription || !selectedDate) {
    alert('Please fill in all fields');
    return;
  }

  // Create new task object
  const newTask = {
    name: taskName,
    description: taskDescription,
    dueDate: selectedDate
  };

  // Display new task in task list
  displayTask(newTask);

  // Clear input fields
  document.getElementById('task-name').value = '';
  document.getElementById('task-description').value = '';
  document.getElementById('selected-date').value = '';
});

// Function to display new task in task list
function displayTask(task) {
  // For now, just log the task to the console
  console.log('New Task:', task);
  
  // Create task list element
  const taskList = document.getElementById('task-list');
  const taskElement = document.createElement('div');
  taskElement.innerHTML = `
    <h3>${task.name}</h3>
    <p>${task.description}</p>
    <p>Due Date: ${task.dueDate}</p>
  `;
  taskList.appendChild(taskElement);
}

