# ToDo Application

This site is built using React + TypeScript + Vite + Firebase

Live website is hosted at https://presto-tech-2cd37.web.app/

## Setting up the project

### Firebase Config

1. **Create a Firebase Project:**

   - Go to [Firebase Console](https://console.firebase.google.com/u/0/) and create a new project.
   - Install firebase cli using `npm install -g firebase-tools`

2. **Deploy Functions and Firestore**

   - Login via firebase cli using `firebase login`
   - Go to ./firebase/functions using `cd firebase/functions`
   - Execute `npm run deploy:functions` and `npm run deploy:firestore-rules`. You might need to set them up first
     from Firebase console.

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
   - Run `npm run dev` to start the application on your local system. This points to firebase emulators.
   - Go to firebase/functions using `cd firebase/functions`. Then to start firebase emulators, run `npm run serve`
   - If you don't want to use emulators, run `npm run dev:prod` to connect to Firebase production.

### Hosting

1. **CI/CD**

   - CI/CD is setup, so any merge or PR to `master` branch will deploy the code using Github actions.

2. **Manual Hosting**

   - First, deploy all your functions, firestore rules and firestore indexes using `firebase deploy --only functions` etc.
   - In root directory, run `npm run firebase:deploy-hosting`, and it will host the application.

### Assumptions and Improvement Scope

1. **Color Scheme Preferences**

   - The application respects the user's device color scheme settings (light or dark mode).
   - Implement a color mode switch option to improve user experience. This allows users to toggle between light and dark modes.

2. **Authentication**

   - For authentication, emailId and password is used. Email verification is not handled.
   - Didn't opt for Google or other providers, since most users (including me) don't like to use Google to signin to random websites.

3. **Task Reminders**

   - Task Reminders only run at 2PM IST once. It checks for reminder added tasks, which are due the next day and not completed. Any task that falls under these conditions, the user shall receive a reminder mail.
   - Email Verification should be done if an user wants to setup this service, otherwise unwanted people might get
     notified of this.
   - Unsubscribe to a task reminder should also be present.

4. **Rate Limiter**

   - Rate limiter should be setup to prevent abuse of API calls, since Firebase pricing depends on usage.
   - It can also help against DDoS attacks and Brute-Force attacks.

5. **Client-Side Validation**

   - When submitting forms, values are only validated in client side, and not on server side.
   - This can lead to bugs and security issues as well.

6. **Data Fetching**

   - Data Fetching is done, using Firebase function calls. But, for a more complex application, tools like
     react-query can be very beneficial, since it helps with automatic caching and code management.

7. **React-Router actions**

   - Form submissions are managed using React states and onClick event handlers.
   - React-Router's action functions can handle form submission and data loading which can increase UX.
