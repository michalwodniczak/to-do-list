{
    let tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent.value.trim() }
        ];
        render();
    }

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ]
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        const previousDoneValue = tasks[taskIndex].done

        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !previousDoneValue },
            ...tasks.slice(taskIndex + 1)
        ]
        render();
    }

    const toggleAllTaskDone = () => {
        if (tasks.length > 0) {
            const buttonAllTaskDone = document.querySelector(".js-doneAllTask");
            buttonAllTaskDone.addEventListener("click", () => {
                tasks = tasks.map(task => { return { ...task, done: true } });
                render();
            });
        };
    };

    const renderButtons = () => {
        let htmlButtonString = "";
        if (tasks.length > 0) {
            htmlButtonString = `
            <button class="section__button js-hiddenTask">Ukryj ukończone</button>
            <button class="section__button js-doneAllTask">Ukończ wszystkie</button>
            `;
        };
        document.querySelector(".js-hidden").innerHTML = htmlButtonString;
    };

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
        renderButtons();
        bindEvents();
        toggleAllTaskDone();
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

    const onFormSubmit = (event) => {
        const form = document.querySelector(".js-form")

        event.preventDefault();
        const newTaskContent = document.querySelector(".js-task")
        if (newTaskContent === "") {
            return;
        };
        addNewTask(newTaskContent);
        newTaskContent.focus();
        form.reset();
    }

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    }

    init();
}