# HyperionDev Full Stack Web Development Bootcamp - Level 3 - Task 9 - To Do List 2

## Description

This task involved taking a simple "To Do list" project from earlier in the course and modifying it to save the user's to do list to a MongoDB database so that it persists from session to session and also to add user authentication with JWT (JSON Web Tokens). A user can log in, add items to their to do list and delete items as well.

## Table of Contents

- [Instructions](#instructions)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)

## Instructions

These were the instructions I was given to guide me in this task:

**Follow these steps:**

- You have previously created a simple to-do app using React where a user could add a number of items that get displayed as a to-do list. The user could also delete a specific item from the list.
- Modify this task so that a user is required to log in to your application before they can use it by entering a username and password for your app directly.
- Each users’ to-do list should be saved to a database. When a user logs in they should only be able to see and modify their own to-do list. The user’s to-do list should be preserved between sessions.
- Please remember to use JWT as demonstrated in this task.

### Technologies

This project uses:

- HTML
- CSS
- Javascript ECMAScript 2021
- React
- Node
- Express
- MongoDB
- JWT (JSON Web Tokens)

## Installation

To run this project, do the following:

1. Copy the directory called 'firstMongo' to your local machine.
2. Navigate to this directory from the command line interface. E.g. cd c:/firstMongo.
3. In the command line interface type 'npm install'.
4. Once it has finished installing, type 'npm start'.
5. Now navigate to the "/frontend" directory inside "firstMongo". E.g. cd c:/firstMongo/frontend.
6. In the command line interface, once again type 'npm install'.
7. Once it has finished installing, type 'npm start'.
8. You have now started both the backend and frontend servers.
9. Open [http://localhost:3000](http://localhost:3000) to view the project in your web browser.

## Usage

1. Once you open the project in your browser [http://localhost:3000](http://localhost:3000), you will see the forms to add, update or delete cars from the database and the "Results" list, where the contents of the database are displayed. See figure 1 below.

![figure 1](screenshots/screenshot1.png)
Figure 1

### Add a Car

2. To add a car to the database, fill in the "Add" form on the left side of the screen and click on the "Add Car" button at the bottom. You will see the "Results" list update with the new car information. See figure 2 and 3 below.

![figure 2](screenshots/screenshot2.png)
Figure 2

![figure 3](screenshots/screenshot3.png)
Figure 3

### Update a Car

3. To update the information for an existing car in the database, use the "Update" form. First enter the name of the owner who's car you want to update (important!), then fill in the other boxes with updated information. Lastly, click on the "Update Car" button at the bottom. You will see that the car will be updated in the "Results" list. See figure 4 and 5 below.

![figure 4](screenshots/screenshot4.png)
Figure 4

![figure 5](screenshots/screenshot5.png)
Figure 5

### Update Many Cars

4. To update the information for several cars at once, use the "Update Many" form. Fill in the name of the owner of the existing cars on the list that you want to update (important!), then fill in the colour that you would like them to be updated with. Lastly, click the "Update Cars" button at the bottom of the form. You will see the cars have been updated on the "Results" list. See figure 6 and 7 below.

![figure 6](screenshots/screenshot6.png)
Figure 6

![figure 7](screenshots/screenshot7.png)
Figure 7

### List All Cars or List Older Cars

5. To list the Model, Make, Registration and current owner for all cars older than 5 years, click the "List Older Cars" button. To refresh the list to show ALL the cars in the database again, click the "List All Cars" button. See figure 8 below.

![figure 8](screenshots/screenshot8.png)
Figure 8

### Delete a Car

6. To delete a car from the database, use the "Delete" form. Enter the name of the owner of the car that you want to delete, then click the "Delete Car" button. See figure 9 below.

![figure 9](screenshots/screenshot9.png)
Figure 9

7. You will see that the car has been deleted/removed from the list/database.

## Credits

This project was created by Evan Malherbe as part of a task for HyperioDev Full Stack Development Bootcamp - December 2021 [GitHub profile](https://github.com/evanmalherbe)
