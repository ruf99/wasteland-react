# Out In Tech | Roo Project

Hello! I made this project during the Out In Tech mentorship series, and this is a web-based application that interacts with a PostgreSQL database to manage and display album data from Spotify, particularly focusing on albums by Hozier. It allows users to view detailed analysis of selected albums and manage data updates in real-time.

## Features

**View Albums**: Users can search for artists and view up to four albums, with special functionalities for Hozier.
**Detailed Analysis**: Provides in-depth analysis of Hozier's albums, including song themes, similar music, and more.
**Interactive UI**: Allows users to interactively fetch and display data from a PostgreSQL database.
**Real-Time Updates**: Supports real-time data fetching for albums to ensure the UI always displays up-to-date information.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Express.js running on Node.js
- **Database**: PostgreSQL
- **API**: Custom REST API for handling data operations

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. Clone the repository
2. Install dependencies
3. Set up a PostgreSQL Database and note the credentials
4. Start the backend server on a terminal using npm run dev
5. Start the frontend server on a seperate terminal using npm start run

## Usage

1. Welcome Page: Click on Information to see a little blurb about this project.
2. Go to 'Analyze': Search for an Artist - Enter the name of an artist to view their albums.
3. If the entered artist is Hozier, click on 'View Analysis': This will provide detailed insights into each album by pulling data from the sql db.
4. Once you have viewed all albums, click on 'Back To Albums' to see a playlist generated for your listening and enjoy!
5. Clear Data: Use the "Clear All" button to reset the application state.
