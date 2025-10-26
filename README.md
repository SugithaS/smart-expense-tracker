# Smart Expense Tracker
Smart Expense Tracker is a web application designed to help users monitor their spending, create budgets, and manage personal finances with ease and efficiency.


Setup Steps:
Step-by-step instructions to run the project locally:

Clone the repository

git clone https://github.com/SugithaS/smart-expense-tracker.git

cd your-project

Install dependencies

For frontend:

cd frontend
npm install

For backend:
cd backend
npm install

Setup environment variables

Create a .env file in the backend folder with:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run the project
Start backend server:
cd backend
npm start

Start frontend:
cd frontend
npm start
Open your browser at http://localhost:3000

Tech Stack
Frontend: HTML, CSS, JavaScript
Backend: Node.js
Database: MongoDB

Screenshots:

<img width="1900" height="910" alt="Screenshot 2025-10-26 214055" src="https://github.com/user-attachments/assets/23507cb6-82a1-4083-85ac-7a100f7db46f" />
<img width="1919" height="1014" alt="Screenshot 2025-10-26 214218" src="https://github.com/user-attachments/assets/61585ae0-086e-4635-ab2d-73f3c44e8dfc" />
<img width="1919" height="1068" alt="Screenshot 2025-10-26 214235" src="https://github.com/user-attachments/assets/95428c6c-10cc-4ae1-b329-69acdb5a35f8" />


Assumptions
Users will enter only valid expense amounts.
Each user account is unique and can track personal expenses separately.
Expense categories are pre-defined (e.g., Food, Transport, Entertainment).

Bonus Features Implemented
Monthly Calendar View: Shows daily expense totals visually.
Expense Summary: Automatically calculates total expenses for the month.

