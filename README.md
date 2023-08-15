# Meduvo

Welcome to Meduvo, "Calendly for patient care". This project is a web application for managing patient records and appointments. It's designed to streamline patient scheduling and care coordination for healthcare practitioners, including doctors, pharmacists, and other healthcare providers. Meduvo allows users to efficiently manage patient appointments, update patient information, and keep track of important healthcare schedules.

## Table of Contents

- [Meduvo](#meduvo)
  - [Table of Contents](#table-of-contents)
  - [🔗 Links](#-links)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
  - [Configuration](#configuration)
  - [Folder Structure](#folder-structure)
  - [Contributing](#contributing)
  - [License](#license)

## 🔗 Links

[![Portfolio](https://img.shields.io/badge/portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/minchulan)
[![LinkedIn](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/minchulan/)
[![Twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/itsminchul)

## Features

- **User Authentication:** Doctors, pharmacists, and healthcare practitioners can sign up and log in to access the application securely.
- **Patient Management:** Users can view patient records, add new patients, update patient information, and remove patients as needed.
- **Appointment Management:** Practitioners can schedule new appointments, update appointment details, and manage their patient's healthcare schedules.
- **Geolocation Integration:** Conveniently fetch patient locations for appointments using geolocation.

## Technologies Used

- **React.js:** Front-end JavaScript library for building user interfaces.
- **Ruby on Rails:** Back-end web application framework for handling server-side logic and database interactions.
- **PostgreSQL:** Relational database management system for storing patient and appointment data.
- **HTML/CSS:** Markup and styling for the user interface.
- **React Router:** Library for handling client-side routing in a React application.
- **Context API:** State management tool for sharing data across components.
- **Active Model Serializers:** Serialization library for converting ActiveRecord models to JSON.
- **bcrypt:** Library for hashing user passwords for secure authentication.
- **Geolocation API:** Integrating geolocation features for efficient appointment scheduling.

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

Contributions to the project are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request. We invite healthcare practitioners, developers, and UI/UX designers to contribute to the project.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

