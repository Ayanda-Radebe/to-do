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
const taskList = document.getElementById('task-list');

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

  // Display task list
  taskList.style.display = 'block';
});

// Function to display new task in task list
function displayTask(task) {
  // Create task list element
  const taskElement = document.createElement('div');
  taskElement.className = 'task';
  taskElement.innerHTML = `
    <h3 contenteditable="false">${task.name}</h3>
    <p contenteditable="false">${task.description}</p>
    <p>Due Date: ${task.dueDate}</p>
    <button class="delete-btn">Delete</button>
    <button class="edit-btn">Edit</button>
    <button class="save-btn" style="display: none;">Save</button>
  `;

  // Delete task functionality
  taskElement.querySelector('.delete-btn').addEventListener('click', () => {
    taskElement.remove();

    // Hide task list if no tasks remain
    if (taskList.children.length === 0) {
      taskList.style.display = 'none';
    }
  });

  // Edit task functionality
  taskElement.querySelector('.edit-btn').addEventListener('click', () => {
    // Make text editable
    taskElement.querySelector('h3').contentEditable = 'true';
    taskElement.querySelector('p').contentEditable = 'true';

    // Show Save button, hide Edit button
    taskElement.querySelector('.edit-btn').style.display = 'none';
    taskElement.querySelector('.save-btn').style.display = 'inline';
  });

  // Save task functionality
  taskElement.querySelector('.save-btn').addEventListener('click', () => {
    // Update task object
    task.name = taskElement.querySelector('h3').textContent;
    task.description = taskElement.querySelector('p').textContent;

    // Make text non-editable
    taskElement.querySelector('h3').contentEditable = 'false';
    taskElement.querySelector('p').contentEditable = 'false';

    // Show Edit button, hide Save button
    taskElement.querySelector('.edit-btn').style.display = 'inline';
    taskElement.querySelector('.save-btn').style.display = 'none';
  });

  taskList.appendChild(taskElement);
}

// Hide task list by default
taskList.style.display = 'none';
