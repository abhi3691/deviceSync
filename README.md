# Sample MongoDB Device Sync Using Realm

Welcome to the Sample MongoDB Device Sync Using Realm project! This project demonstrates how to set up and implement device synchronization using MongoDB Realm. It provides a straightforward example to help you understand and integrate MongoDB Realm into your applications.

![e3ac30f7573c9aa05455b28467094f5f5d8da3f3_2_690x260](https://github.com/abhi3691/deviceSync/assets/54738565/dc2bd7f1-14c8-4272-98fc-36f557544ded)



https://github.com/abhi3691/deviceSync/assets/54738565/d9222362-2201-47df-a58a-e74e8ec02c63


## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

MongoDB Realm is a serverless platform that empowers you to build reactive, real-time applications. It offers device synchronization, making it easy to keep data consistent across multiple clients. This project is a simple example that shows how to set up and use MongoDB Realm for device synchronization.

## Features

- Basic setup of MongoDB Realm
- Device synchronization between a local database and MongoDB Atlas
- Example schema and data models
- Basic CRUD operations

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or higher)
- MongoDB Atlas account
- MongoDB Realm application

## Installation

Follow these steps to get started with the project:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/abhi3691/deviceSync.git
   cd deviceSync
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Configuration

1. **Set up MongoDB Atlas:**

   - Create a MongoDB Atlas cluster.
   - Create a database and collection for the project.

2. **Set up MongoDB Realm:**

   - Create a new MongoDB Realm app.
   - Enable Device Sync and link it to your MongoDB Atlas cluster.
   - Define the schema and permissions.

## Usage

1. **Run the application:**

   ```bash
   npm start
   ```

2. **Test the synchronization:**
   - Add, update, or delete documents in the local database.
   - Observe the changes being synced to the MongoDB Atlas cluster and vice versa.
