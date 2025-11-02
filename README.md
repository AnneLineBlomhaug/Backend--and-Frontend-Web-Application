 Virtual Event Management System (VEM)
The Virtual Event Management System (VEM) is a web application designed to create, manage, and register for virtual events. It features a backend API built with Node.js, Express, and Sequelize (connected to an Aiven MySQL database) and a frontend built with Express and EJS templates, styled with Bootstrap.
 Features
- Event Management: Create and list events with titles, descriptions, dates, capacities, and unique invite keys.
- Search: Search events by title, description, or type.
- Stats: View event attendance statistics (requires authentication).
- Speakers: List speakers with names and bios.
- Registration: Register attendees for events using invitation keys.
- Authentication: JWT-based admin login (default: `admin`/`P4ssword`).
 Project Structure
```
java/event/
??? backend/                Backend API
?   ??? config/
?   ?   ??? database.js     Sequelize database config with Aiven MySQL
?   ??? routes/
?   ?   ??? auth.js         Authentication routes
?   ?   ??? events.js       Event management routes
?   ?   ??? init.js         Database initialization route
?   ?   ??? speakers.js     Speaker routes
?   ?   ??? attendees.js    Attendee registration routes
?   ??? public/
?   ?   ??? ca.pem          Aiven SSL certificate
?   ??? .env                Environment variables (not tracked)
?   ??? app.js              Main backend file
?   ??? package.json        Backend dependencies and scripts
?   ??? swagger.json        API documentation
??? frontend/               Frontend EJS application
?   ??? public/
?   ?   ??? css/
?   ?   ?   ??? bootstrap.min.css   Bootstrap CSS
?   ?   ?   ??? styles.css          Custom CSS
?   ?   ??? js/
?   ?       ??? bootstrap.bundle.min.js   Bootstrap JS
?   ??? views/
?   ?   ??? partials/
?   ?   ?   ??? header.ejs   Navbar and head
?   ?   ?   ??? footer.ejs   Footer with scripts
?   ?   ??? index.ejs        Events page (root)
?   ?   ??? search.ejs       Search events page
?   ?   ??? stats.ejs        Event stats page
?   ?   ??? speakers.ejs     Speakers list page
?   ?   ??? register.ejs     Attendee registration page
?   ??? app.js               Main frontend file
?   ??? package.json         Frontend dependencies and scripts
??? README.md                This file
```

 Prerequisites
- Node.js: v16 or higher
- npm: v8 or higher
- MySQL Database: Hosted on Aiven.io (or a local MySQL instance)
- Aiven SSL Certificate: `ca.pem` for secure database connection
 Setup
 Backend
1. Navigate to Backend Directory:
   ```powershell
   cd C:\Users\Admin\Desktop\java\event\backend
   ```
2. Install Dependencies:
   ```powershell
   npm install
   ```
3. Configure Environment Variables:
   - Create a `.env` file in `backend/` with:
     ```
     PORT=3000
     DB_HOST=mysql-census-onlinelabswriter-census.h.aivencloud.com
     DB_PORT=15592
     DB_USER=avnadmin
     DB_PASS=AVNS__-EaeLbWi1XkCTe6hL6
     DB_NAME=defaultdb
     ADMIN_USERNAME=admin
     ADMIN_PASSWORD=P4ssword
     ```
   - Replace values with your Aiven credentials if different.
4. Place SSL Certificate:
   - Copy `ca.pem` from Aiven to `backend/public/ca.pem`.
5. Start the Backend:
   ```powershell
   npm start
   ```
   - Runs on `http://localhost:3000`.
6. Initialize Database:
   ```powershell
   curl -X POST http://localhost:3000/api/init
   ```
   - Creates tables and seeds initial data (e.g., admin user).
 Frontend
1. Navigate to Frontend Directory:
   ```powershell
   cd C:\Users\Admin\Desktop\java\event\frontend
   ```
2. Install Dependencies:
   ```powershell
   npm install
   ```
3. Start the Frontend:
   ```powershell
   npm start
   ```
   - Runs on `http://localhost:8000`.
 Usage
1. Access the App:
   - Open `http://localhost:8000` in your browser.
   - The root page (`index.ejs`) displays and manages events.
2. Navigation:
   - Use the navbar to visit:
     - Events: Create and list events (requires JWT token).
     - Search: Search for events.
     - Stats: View event statistics (requires JWT token).
     - Speakers: List all speakers.
     - Register: Register for an event with an invitation key.
3. Authentication:
   - Login via the backend:
     ```powershell
     curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"P4ssword\"}"
     ```
     - Copy the returned `token` and replace `'YOUR_JWT_TOKEN'` in `index.ejs`, `stats.ejs`, and `search.ejs`.

 API Endpoints
- Documentation: View Swagger UI at `http://localhost:3000/doc`.
- Key Routes:
  - `POST /api/auth/login`: Authenticate admin.
  - `GET /api/events`: List events (authenticated).
  - `POST /api/events`: Create an event (authenticated).
  - `POST /api/search`: Search events.
  - `GET /api/events/stats`: Event stats (authenticated).
  - `GET /api/speakers`: List speakers.
  - `POST /api/attendees/register`: Register an attendee.

 Styling
- Bootstrap: Used for responsive design and navbar.
- Custom CSS: `public/css/styles.css` adds shadows, backgrounds, and event card styles.
 Troubleshooting
- Backend Connection Fails:
  - Check `.env` values and `ca.pem` path.
  - Verify Aiven MySQL is accessible (`mysql -h <DB_HOST> -P <DB_PORT> -u <DB_USER> -p`).
- Frontend Errors:
  - Ensure `views/` contains all EJS files.
  - Replace JWT tokens in scripts with valid ones.
- Port Conflicts:
  - Change `PORT` in `backend/.env` or frontend `app.js` if `3000` or `8000` are in use.

License
This project is unlicensed use it as you see fit
