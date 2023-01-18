{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent.value.trim()
        })
        render();
    }

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1)
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="section__listItem"> 
                <button class="button js-done">${task.done ? "✔" : ""}</button>
                <span ${task.done ? "class=\"section__content\"" : ""}>
                  ${task.content}
                </span>
                <button class="button button--remove js-remove">🗑️</button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    }

    const init = () => {
        render();
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const newTaskContent = document.querySelector(".js-task")
            if (newTaskContent === "") {
                return;
            }
            addNewTask(newTaskContent);
            newTaskContent.focus();
            form.reset();
        })
    }
    init();
}