# Meduvo

Welcome to Meduvo, "Calendly for patient care". This project is a web application for managing patient records and appointments. It allows users to add, update, and delete patients, as well as schedule and manage appointments. 
## 🔗 Links

[![my_portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/minchulan)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/minchulan/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/itsminchul)

## Features

- User authentication: Users can sign up and log in to access the application.
- Patient management: Users can view a list of patients, add new patients, update patient information, and delete patients.
- Appointment management: Users can view a list of appointments, schedule new appointments, update appointment details, and delete appointments.

## 🔗 Links

## Technologies Used

- React.js: Front-end JavaScript library for building user interfaces.
- Ruby on Rails: Back-end web application framework for handling server-side logic and database interactions.
- PostgreSQL: Relational database management system for storing patient and appointment data.
- HTML/CSS: Markup and styling for the user interface.
- React Router: Library for handling client-side routing in a React application.
- Context API: State management tool for sharing data across components.
- Active Model Serializers: Serialization library for converting ActiveRecord models to JSON.
- bcrypt: Library for hashing user passwords for secure authentication.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open the application in your browser: `http://localhost:3000`

## Configuration

The project requires a Ruby on Rails server and a PostgreSQL database. Make sure you have Ruby, Rails, and PostgreSQL installed on your system.

1. Set up the database: `rails db:create` and `rails db:migrate`
2. Start the Rails server: `rails server`
3. Update the API endpoint in the React app: Open `src/api/index.js` and set the `baseURL` to match your Rails server URL.

## Folder Structure

- `/src`: Contains the main React application code.
  - `/components`: React components for different parts of the application.
  - `/context`: Context providers and consumers for managing application state.
  - `/api`: API configuration and utility functions for making requests to the server.
  - `/routes`: Defines the application routes using React Router.
  - `/assets`: Static assets such as images and stylesheets.
- `/server`: Contains the Ruby on Rails server code.

## Contributing

Contributions to the project are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
