# WebSocket Server

## Overview

This repository contains a simple WebSocket server created for a technical test. The server fetches, cleans, and sends data to clients using a WebSocket connection. It pulls data from specific URLs, focusing on stats from six different regions, and sends this data to connected clients.

## Key Features

- **Data Fetching**: The server retrieves statistics for six regions from specified URLs every minute.
- **Data Cleaning**: The fetched data is cleaned before being sent so the data is ready to use on the client as is.
- **Caching**: Data is cached for 60 seconds to avoid unnecessary API calls.
- **WebSocket Communication**: Data is sent to clients through a WebSocket connection.
- **Connection Limit**: No more than 5 users can connect to the server at the same time.
- **Error Handling**: The server handles errors that may occur during data fetching, cleaning, or sending.
- **Rate Limiting and Retry**: To manage API limits and handle temporary issues during data fetching.

## Tech Stack

- **Node.js**: Used to build the server.
- **TypeScript**: Provides type safety.
- **Axios**: Handles HTTP requests.
- **WebSocket**: Enables real-time data communication.
- **Heroku**: The server is hosted on Heroku.

## Getting Started

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/catvasion/websocket-server.git
   cd websocket-client

   ```

2. **Install the dependencies**:

   ```
   npm install

   ```

3. **Running the App**:
   To start the app in development mode, run:
   ```
   npm start
   ```

Thanks for checking out this WebSocket server project!
