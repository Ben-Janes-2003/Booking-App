# Booking App Frontend

This is the React frontend for my full-stack booking application. I built this to create a clean, modern, and responsive interface where users can view available time slots and book them with ease. It also includes a simple-to-use admin area for managing the available slots.

The main goal was to build a complete, production-ready application that follows modern web development practices from start to finish.



---
## What It Can Do

* **Full User Authentication:** Users can register for a new account and log in to a persistent session.
* **View Available Slots:** A public page that lists all available time slots fetched in real-time from the backend.
* **Book a Slot:** Logged-in users can book any available slot with a single click.
* **View "My Bookings":** A protected page where users can see a list of all their upcoming bookings.
* **Admin Features:**
    * **Create New Slots:** A protected admin-only page for creating new time slots.
    * **Conditional UI:** The navigation bar dynamically shows the "Create Slot" link only to logged-in admins.
* **Quality of Life Features:**
    * **Modern Toast Notifications:** Clean, non-blocking pop-ups for feedback.
    * **Loading Spinners:** Smooth loading animations for a better user experience.

---
## Tech I Used

This project was built with a modern, fast, and scalable tech stack.

* **Framework:** React with Vite
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State Management:** Zustand
* **API Communication:** Axios
* **Routing:** React Router DOM

---
## Getting Started Locally

Want to run this on your own machine? Here’s how:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Ben-Janes-2003/Booking-App.git](https://github.com/Ben-Janes-2003/Booking-App.git)
    cd Booking-App
    ```

2.  **Install the dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    * Create a new file in the root of the project named `.env.development`.
    * Add the URL of your local backend API to this file:
        ```
        VITE_API_URL=http://localhost:8080/api
        ```
        *(Change the port if your local backend runs on a different one.)*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The app should now be running on `http://localhost:5173`.

---
## Deployment

This app is set up for continuous deployment on **AWS Amplify**. Any push to the `main` branch will automatically trigger a new build and deploy the latest version to the live URL.
