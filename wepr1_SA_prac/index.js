#!/usr/bin/env node

const readline = require('readline');

//-------------------------------------------------------------------------------------
// Task class defines the attributes of a Task object.
class Task {
    constructor(id, title, description, completed) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.completed = completed;
    }
}

//-------------------------------------------------------------------------------------
// TaskManager class defines the methods and attributes of the TaskManager object. This object is at the core of all the
// functionality of this application.
class TaskManager {
    constructor() {
      this.tasks = []; // Defining an empty array of tasks to store and retrieve tasks.
      this.taskId = 1;
    }

 // addTask method takes a title and a description, creates a task object to store all tha values. Then the object is then stored in the array.
    addTask(title, description) {
      const task = new Task(this.taskId, title, description, this.completed=' '); // Instantiates a new task object and gives it the parameters of the addTask method
      this.tasks.push(task);
      this.taskId++; // Makes sure that each task will not have the same id with each instantiation.
      console.log(`Task added successfully.`);
    }

  // markTaskAsCompleted takes a task id, searches for the matching object in the tasks array, then marks it as completed
    markTaskAsCompleted(taskId) {
      const task = this.tasks.find((task) => task.id === taskId); // Calling find() method to find matching task object in tasks array and stores the value
      if (task) {
        task.completed = 'X'; //stores an 'X' to the object with corresponding id.
        console.log(`Task marked as completed.`);
      } else {
        console.log(`Task not found.`);
    }
    }

 //listTasks method simply displays the tasks
    listTasks() {
    if(this.tasks.length === 0){
      console.log("No tasks to display.")
    }
    else{
      console.log('Tasks:');
      this.tasks.forEach((task) => {
      console.log(`[${task.completed}] ${task.id}: ${task.title}`) // Displaying the tasks
      });
    }
  }
  
  //deleteTask method takes in a id value and removes the object with the corresponding id from the list.
    deleteTask(taskId) {
      const taskIndex = this.tasks.findIndex((task) => task.id === taskId); // Calling the findIndex() method to find matching task object in tasks array and stores the value

    if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1); //Deleting the task
        console.log(`Task deleted successfully.`);
      } else {
        console.log(`Task not found.`);
      }
    }
  }
//-------------------------------------------------------------------------------------

  async function runTaskManager() {
    // APPLICATION ENTRY POINT
    const scanner = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const taskManager = new TaskManager(); // Instantiating a new TaskManager object to provide this program access to the TaskManager methods.

    let nextChoice = true; //Controls the while loop that keeps prompting the user until they opt to exit the program. While true, will keep prompting. 

    while (nextChoice) {
      console.log(`
  Task Manager Application:
  ---------------------------
  1. Add a task
  2. Mark a task as completed
  3. List tasks
  4. Delete a task
  5. Exit`);

      // Prompting and reading in the user's choice and storing it in 'answer' variable.
      const answer = await new Promise((resolve) => {
        scanner.question('Enter your choice: ', (input) => {
          resolve(input);
        });
      });
      // Validating the user's input.
      if (answer !== '1' && answer !== '2' && answer !== '3' && answer !== '4' && answer !== '5') {
        console.log('Error! Please enter a valid choice');
      } else {

      switch (answer) {

          case '1':
                console.log('Add a task:');
                const title = await new Promise((resolve) => {
                  scanner.question('Enter task title: ', (input) => {
                  resolve(input);
                  });
                });
                const description = await new Promise((resolve) => {
                  scanner.question('Enter task description: ', (input) => {
                  resolve(input);
                  });
                });
                taskManager.addTask(title, description); // Calling method to add task to array
                break;

          case '2':
                console.log('Mark a task as completed:');
                const taskId = await new Promise((resolve) => {
                  scanner.question('Enter the task ID to mark as completed: ', (input) => {
                  resolve(parseInt(input));
                  });
                });
                taskManager.markTaskAsCompleted(taskId); // Calling method to mark task with given id as completed
                break;

          case '3':
                taskManager.listTasks(); //Calling method to display all the tasks in the array
                break;

          case '4':
                console.log('Delete a task:');
                const deleteTaskId = await new Promise((resolve) => {
                  scanner.question('Enter the task ID to delete: ', (input) => {
                  resolve(parseInt(input));
                  });
                });
                taskManager.deleteTask(deleteTaskId); // Calling method remove task with given id from the array
                break;

          case '5':
                nextChoice = false; //Will terminate the while loop before the next iteration
                break;
        }
      }
    }
    // Exit the program
    process.exit(0);
}
runTaskManager();
