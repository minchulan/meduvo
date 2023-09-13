# Meduvo - Calendly for Patient Care Scheduling

Meduvo is a full-stack web application designed to simplify and streamline patient care scheduling. It provides a user-friendly interface for patients, caregivers, and healthcare providers to efficiently manage appointments, ensuring a seamless experience in healthcare management.

## Table of Contents

- [Introduction](#introduction)
- [Learning Goals](#learning-goals)
- [Requirements](#requirements)
- [Project Setup](#project-setup)
- [Models and Relationships](#models-and-relationships)
- [Getting Started with Create React App](#react)

## Introduction

Welcome to Meduvo, your platform for managing patient care scheduling. In this project, I've combined the power of a Rails API backend with a React frontend to create a robust healthcare scheduling solution. Meduvo is designed to streamline patient scheduling and care coordination for healthcare practitioners, including doctors, pharmacists, and other healthcare providers. It allows users to efficiently manage patient appointments, update patient information, and keep track of important healthcare schedules.

## Learning Goals

The primary objectives of the Meduvo project are as follows:

- Build a full-stack application using a Rails backend and a React frontend.
- Implement at least three models on the backend, including reciprocal many-to-many relationships using has-many-through relationships with a joins table.
- Enable full CRUD (Create, Read, Update, Delete) actions for the resources, including form-based updates.
- Follow RESTful routing conventions for backend routes.
- Implement active record validations for model attributes.
- Ensure proper handling of error responses and front-end state updates.
- Create multiple client-side routes using React Router for seamless navigation.
- Implement user authentication and authorization, including secure password protection.

## Requirements

To meet the project requirements, Meduvo adheres to the following criteria:

- Use a Rails API backend combined with a React frontend.
- Feature at least three models on the backend with a reciprocal many-to-many relationship.
- Implement full CRUD actions for resources, including form-based updates.
- Maintain RESTful routing conventions for backend routes.
- Utilize active record validations for model attributes.
- Manage error responses and front-end state updates effectively.
- Create and manage multiple client-side routes using React Router.
- Implement user authentication and authorization with secure password protection.

## Project Setup

To kickstart your Meduvo project, you can use the [project template](https://github.com/learn-co-curriculum/project-template-react-rails-api) provided. The template is configured similarly to the labs from this phase, making it easier to deploy your app to platforms like Render. Refer to the template's README for detailed setup instructions.

Alternatively, you can choose to set up your project from scratch using this [project setup guide](https://github.com/learn-co-curriculum/react-rails-project-setup-guide).


### Models and Relationships

Models for Meduvo:
- User
- Patient
- Appointment

Relationships:
- User has many Appointments and has many Patients through Appointments.
- Patient has many appointments and has many users through Appointments.
- Appointment belongs to User and Patient.

## React
# Getting Started with Create React App

Thinking in React: https://reactjs.org/docs/thinking-in-react.html

Step 1: Break The UI Into A Component Hierarchy
Step 2: Build A Static Version in React
Step 3: Identify The Minimal (but complete) Representation Of UI State
Step 4: Identify Where Your State Should Live
Step 5: Add Inverse Data Flow

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
