#!/usr/bin/env node

/**
 * wepr1_SA_prac
 * Summative assessment practical
 *
 * author Luyanda Madonsela <https://github.com/Luyanda-Madonsela>
 */

const readline = require('readline');

class Task {
  constructor(id, title, description, completed) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];
    this.nextTaskId = 1;
  }

  addTask(title, description) {
    const task = new Task(this.nextTaskId, title, description, this.completed=' ');
    this.tasks.push(task);
    this.nextTaskId++;
    console.log(`Task added successfully.`);
  }

  markTaskAsCompleted(taskId) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      task.completed = 'X';
      console.log(`Task marked as completed.`);
    } else {
      console.log(`Task not found.`);
    }
  }

  listTasks() {
	if(this.tasks.length === 0){
		console.log("No tasks to display.")
	}
	else{
		console.log('Tasks:');
		this.tasks.forEach((task) => {
		console.log(`[${task.completed}] ${task.id}: ${task.title}`)
		});
	}
  }
  
  deleteTask(taskId) {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);

	if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      console.log(`Task deleted successfully.`);
    } else {
      console.log(`Task not found.`);
    }
  }
}

async function runTaskManager() {
  const scanner = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const taskManager = new TaskManager();

  let nextChoice = true;

  while (nextChoice) {
    console.log(`
Task Manager Application:
---------------------------
1. Add a task
2. Mark a task as completed
3. List tasks
4. Delete a task
5. Exit`);

    const answer = await new Promise((resolve) => {
      scanner.question('Enter your choice: ', (input) => {
        resolve(input);
      });
    });

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
				taskManager.addTask(title, description);
				break;


        case '2':
				console.log('Mark a task as completed:');
				const taskId = await new Promise((resolve) => {
					scanner.question('Enter the task ID to mark as completed: ', (input) => {
					resolve(parseInt(input));
					});
				});
				taskManager.markTaskAsCompleted(taskId);
				break;


        case '3':
				taskManager.listTasks();
				break;


        case '4':
				console.log('Delete a task:');
				const deleteTaskId = await new Promise((resolve) => {
					scanner.question('Enter the task ID to delete: ', (input) => {
					resolve(parseInt(input));
					});
				});
				taskManager.deleteTask(deleteTaskId);
				break;

        case '5':
				nextChoice = false;
				break;
      }
    }
  }

  // Exit the program
  process.exit(0);
}

runTaskManager();
