# Multimedia Server Access

This project involves building a website that allows access to multimedia content (audio and videos) stored locally or in real-time. The goal is to create an experience similar to popular platforms like YouTube and Netflix.

## Features

- **User Authentication**: Users must log in to access multimedia content.
- **Multimedia Viewing**: Authenticated users can view and play the multimedia content available on the site.

## Technologies Used

- **HTML**: For structuring the web pages.
- **CSS**: For styling the web pages and enhancing visual appeal.
- **JavaScript**: For adding interactivity and dynamic behaviors to the site.
- **Node.js**: As the server-side platform.
- **Express**: A Node.js framework for simplifying web application development.
- **PostgreSQL**: For storing user authentication information.
- **Elephantsql**: Online platform for hosting the PostgreSQL database.
- **Bcrypt**: Library for securely hashing user passwords.
- **Render Dashboard**: Platform for hosting the server from the GitHub repository.

## Project Structure

- `index.html`: The main page where users log in and access multimedia content.
- `media/`: Directory for storing audio and video files to be played on the site.
- `server.js`: Node.js file managing the server and PostgreSQL database connection.

## How to Run

1. Clone the repository:
    ```bash
    git clone https://github.com/xfelipealves/trabalho-multimidia.git
    ```
2. Ensure audio and video files to be made available are stored in the `media/` folder.
3. Configure PostgreSQL database connection via Elephantsql.
4. Open a terminal in the project's root directory and install Node.js dependencies:
    ```bash
    npm install
    ```
5. Start the server:
    ```bash
    node server.js
    ```
6. Access the site via your web browser and log in to view available multimedia content.

## Contribution

Feel free to open issues and submit pull requests. Suggestions, bug fixes, and improvements are welcome.
