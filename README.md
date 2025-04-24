# 🎬 MovieHub API

A RESTful API to manage and explore a catalog of movies. Built with **Node.js**, **Express.js**, and **MongoDB**, this project allows CRUD operations on movies and provides filtering/search features.

---

## ✨ Features

- 📥 Add new movies
- 📤 Fetch all movies
- 🎯 Filter by Director
- ✏️ Update by Movie Title or ID
- ❌ Delete by Title or ID
- 🌱 Seed database from `movie.json`

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Other:** File System (for JSON seeding), dotenv

---

## 📁 Project Structure

MONGODB/ ├── db/ │ └── db.conoect.js ├── Models/ │ ├── car.model.js │ ├── movie.model.js │ ├── students.model.js │ └── twitterProfile.model.js ├── .env ├── .gitignore ├── index.js ├── movie.json ├── package.json ├── package-lock.json └── README.md




---

## 📦 Setup

### 1. Clone the Repository

```bash
git clone https://github.com/hrishikesh1997/movie-catalog-backend.git
cd movie-catalog-backend


2. Install Dependencies
   npm install

3. Configure Environment
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority

4 Run the Server
  node index.js
Server runs at: http://localhost:3000



📮 API Endpoints

Method | Endpoint | Description
POST | /Addmovies | Add a new movie
GET | /Getmovies | Get all movies
GET | /movieByDirector/:Director | Get movies by director
PUT | /updateByid/:id | Update movie by ID
PUT | /UpdateByTitle/:movietitle | Update movie by title
DELETE | /DeletebyId/:id | Delete movie by ID
DELETE | /DeletebyTitle/:movietitle | Delete movie by title


🌱 Seeding Data
To seed data from movie.json:
Uncomment the seedData() function call in index.js.
Run the server once.
comment it again after seeding to avoid duplication.


