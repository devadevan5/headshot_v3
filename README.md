# Headshot.com - AI-Powered Professional Headshots

This project is a modern, responsive web application that allows users to generate professional headshots using AI. It is built with React, Vite, and Tailwind CSS, and it includes features for user authentication, subscription management, and an admin dashboard for managing the application.

## 🚀 Features

-   **AI Headshot Generation:** Users can upload a selfie, choose an outfit and background, and generate a professional headshot.
-   **User Authentication:** Secure user authentication with email/password, OTP, and social login (Google, Apple).
-   **Subscription Management:** Users can manage their subscription plans, view billing history, and purchase credits.
-   **Admin Dashboard:** A comprehensive dashboard for administrators to manage users, content, and system settings.
-   **Responsive Design:** The application is fully responsive and works on all devices.
-   **PWA Support:** The application can be installed as a Progressive Web App (PWA) for a native-like experience.

## 🛠️ Tech Stack

-   **React 18:** For building the user interface.
-   **Vite:** As the build tool and development server.
-   **Tailwind CSS:** For styling the application.
-   **React Router v6:** for routing.
-   **Lucide React:** For icons.

## 📋 Prerequisites

-   Node.js (v16.x or higher)
-   npm or yarn

## 🛠️ Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/headshot-app.git
    cd headshot-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the necessary environment variables. You can use the `.env.example` file as a template.

4.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will be available at `http://localhost:5173`.

## 📁 Project Structure

```
.
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── account-settings/
│   │   ├── admin-dashboard/
│   │   ├── authentication/
│   │   ├── dashboard/
│   │   ├── headshot-generation/
│   │   └── subscription-management/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   ├── index.jsx
│   └── Routes.jsx
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.mjs
```

## 🎨 Styling

This project uses **Tailwind CSS** for styling. The configuration can be found in `tailwind.config.js`. Global styles are defined in `src/styles/index.css`.

## ✅ Testing

This project uses Vitest for testing. To run the tests, use the following command:

```bash
npm run test
# or
yarn test
```

## 📦 Deployment

To build the application for production, run the following command:

```bash
npm run build
```

This will create a `dist` directory with the production-ready files.

## 🙏 Acknowledgments

-   Built with love and coffee.
-   Powered by React and Vite.
-   Styled with Tailwind CSS.
