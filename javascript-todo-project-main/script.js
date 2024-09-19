const monthElement = document.getElementById('month');
const calendarBody = document.getElementById('calendar-body');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');


const add_task = document.querySelector(".add-task")
const close_icon = document.querySelector(".close-icon")
const calendar_container = document.querySelector(".calendar-container")
const tasks_list_div = document.querySelector(".task-items")
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let task_list_arr =
    [
        {
            "date": "2024-09-01",
            "tasks": [
                {
                    "name": "Team Meeting",
                    "time": "09:00",
                    "content": "Discuss the new project plan and milestones."
                },
                {
                    "name": "Email Client",
                    "time": "11:00",
                    "content": "Send the latest project updates to the client."
                }
            ]
        },
        {
            "date": "2024-09-02",
            "tasks": [
                {
                    "name": "Work on Presentation",
                    "time": "10:00",
                    "content": "Prepare slides for the upcoming presentation."
                },
                {
                    "name": "Call with Supplier",
                    "time": "15:00",
                    "content": "Discuss supply chain issues and updates."
                }
            ]
        },
        {
            "date": "2024-09-03",
            "tasks": [
                {
                    "name": "Project Review",
                    "time": "09:30",
                    "content": "Review project progress with the team."
                },
                {
                    "name": "Submit Report",
                    "time": "14:00",
                    "content": "Submit the monthly performance report."
                }
            ]
        },
        {
            "date": "2024-09-04",
            "tasks": [
                {
                    "name": "Client Presentation",
                    "time": "11:00",
                    "content": "Present the final project deliverables to the client."
                },
                {
                    "name": "Team Lunch",
                    "time": "13:00",
                    "content": "Team lunch at the downtown cafe."
                }
            ]
        },
        {
            "date": "2024-09-05",
            "tasks": [
                {
                    "name": "Review Feedback",
                    "time": "10:00",
                    "content": "Review feedback from the client and make necessary changes."
                },
                {
                    "name": "Plan Next Week",
                    "time": "15:00",
                    "content": "Plan tasks and meetings for the upcoming week."
                }
            ]
        }
    ]





function updateCalendar(month, year) {
    monthElement.textContent = `${months[month]} ${year}`;
    calendarBody.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            if (i === 0 && j < firstDay) {
                cell.textContent = '';
            } else if (date > daysInMonth) {
                break;
            } else {
                cell.textContent = date;
                cell.dataset.day = date; // Store the day in a data attribute
                cell.dataset.month = month; // Store the month index in a data attribute
                cell.dataset.year = year; // Store the year in a data attribute
                cell.classList.add(`${cell.dataset.day}-${cell.dataset.month}-${cell.dataset.year}`)


                if (date === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                    cell.classList.add('today');
                }
                date++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }
}


prevButton.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar(currentMonth, currentYear);
});

nextButton.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar(currentMonth, currentYear);
});

updateCalendar(currentMonth, currentYear);

function show_add_task(day, month, year) {
    calendar_container.style.border = " 1px dashed black"
    add_task.classList.remove("hide");
    add_task.classList.add("show");

    function addTask() {
        // Fetch the input values
        const taskName = document.getElementById('task-name').value;
        const taskDateTime = document.getElementById('task-date-time').value;
        const taskContent = document.getElementById('task-content').value;

        let temp_month = month++;
        let temp_day = day;
        month = (month <= 9) ? `0${month}` : month;
        day = (day <= 9) ? `0${day}` : day
        const dateStr = `${year}-${month}-${day}`;
        console.log(dateStr);



        // Create a new task object
        const newTask = {
            name: taskName,
            time: taskDateTime || "00:00", // Default to "00:00" if time is not provided
            content: taskContent
        };

        // Find if the date already exists in the task list
        const existingDateEntry = task_list_arr.find(task => task.date === dateStr);

        if (existingDateEntry) {
            console.log(existingDateEntry)

            // If the date exists, add the new task to the existing tasks
            existingDateEntry.tasks.push(newTask);

            show_task_details(temp_day, temp_month, year)
        } else {
            // If the date doesn't exist, create a new entry
            task_list_arr.push({
                date: dateStr,
                tasks: [newTask]
            });
        }




        document.getElementById('task-name').value = '';
        document.getElementById('task-date-time').value = '';
        document.getElementById('task-content').value = '';


        close_icon.onclick()
    }

    document.getElementById('save-btn').addEventListener('click', addTask);



}



function show_task_details(day, month, year) {
    month++
    month = (month <= 9) ? `0${month}` : month + 1;
    day = (day <= 9) ? `0${day}` : day
    const dateStr = `${year}-${month}-${day}`;
    tasks_list_div.innerHTML = ''; // Clear previous content
    console.log(dateStr);

    // Find the tasks for the given date
    const current_date_task = task_list_arr.find(val => val.date === dateStr);

    if (current_date_task) {
        current_date_task.tasks.forEach(task => {
            const li = document.createElement("li")

            const p = document.createElement("p");
            p.innerHTML = `<strong>${task.name}</strong> at ${task.time}<br>${task.content}`;

            li.appendChild(p)
            tasks_list_div.appendChild(li);
        });
    } else {
        const p = document.createElement("p");
        p.textContent = 'No tasks for this day.';
        tasks_list_div.appendChild(p);
    }
}

function display_all_task_details() {


    task_list_arr.forEach(current_date_task => {
        let date_head = document.createElement("h4")
        date_head.classList.add("date-head")
        date_head.innerHTML = current_date_task.date;
        tasks_list_div.appendChild(date_head)


        if (current_date_task) {
            current_date_task.tasks.forEach(task => {
                const li = document.createElement("li")

                const p = document.createElement("p");
                p.innerHTML = `<strong>${task.name}</strong> at ${task.time}<br>${task.content}`;


                
                li.appendChild(p)
                tasks_list_div.appendChild(li);
            });
        } else {
            const p = document.createElement("p");
            p.textContent = 'No tasks for this day.';
            tasks_list_div.appendChild(p);
        }
    })

}

display_all_task_details()



function handleDayClick(event) {
    const day = event.target.dataset.day;
    const month = event.target.dataset.month;
    const year = event.target.dataset.year;

    show_add_task(day, month, year);
    show_task_details(day, month, year)
}

// Re-apply event listeners after calendar update
function reapplyEventListeners() {
    document.querySelectorAll('td').forEach(cell => {
        cell.addEventListener('click', handleDayClick);
    });
}

// Initial event listener setup
reapplyEventListeners();

// Update event listeners after calendar is updated
prevButton.addEventListener('click', reapplyEventListeners);
nextButton.addEventListener('click', reapplyEventListeners);

close_icon.addEventListener("click", () => {
    add_task.classList.remove("show");
    add_task.classList.add("hide");
    calendar_container.style.border = "none"
    tasks_list_div.innerHTML = ""
    display_all_task_details()
});