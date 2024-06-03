# ToDo Application

This site is built using React + TypeScript + Vite + Firebase

## Setting up the project

### Firebase Config

1. **Create a Firebase Project:**

   - Go to [Firebase Console](https://console.firebase.google.com/u/0/) and create a new project.

2. **Set Up Authentication:**
   - Navigate to the "Authentication" tab under "Build."
   - Set up authentication with the Email/Password provider.

### Clone the Repository

1. **Clone the Repo:**

   - Clone the repository to your local system.

2. **Update Firebase Configuration:**

   - Open the `./firebase.ts` file and update the configurations with the Firebase config values provided for your project.

3. **Set Up Environment Variables:**
   - Duplicate the `.example.env` file and rename it to `.env`.
   - Paste the following Firebase config values into the `.env` file:
     ```
     VITE_FIREBASE_API_KEY=<your-firebase-api-key>
     VITE_FIREBASE_APP_ID=<your-firebase-app-id>
     VITE_FIREBASE_MEASUREMENT_ID=<your-firebase-measurement-id>
     ```

### Setting up the Client

1. **Install Dependencies:**

   - Run `npm install` to install all the dependencies.

2. **Start the Application:**
   - Run `npm run dev` to start the application on your local system.
