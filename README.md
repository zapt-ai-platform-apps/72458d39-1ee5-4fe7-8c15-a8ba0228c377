# Kegel Exercise App

A user-friendly app designed to guide you through effective Kegel exercises, featuring a sleek black and red theme.

## User Journeys

1. [Sign In](docs/journeys/sign-in.md) - Authenticate your account to access personalized exercises.
2. [Choose Exercise](docs/journeys/choose-exercise.md) - Select from a variety of Kegel exercises tailored to your needs.
3. [Start Exercise Timer](docs/journeys/start-exercise-timer.md) - Begin your session with a built-in timer to track your progress.
4. [View Progress](docs/journeys/view-progress.md) - Monitor your exercise routine and improvements over time.

## External APIs and Services

- **Supabase**: Used for authentication and user management.
- **Sentry**: Error tracking and monitoring.
- **Umami**: Website analytics.
- **Progressier**: PWA functionality.

## Environment Variables

The following environment variables are required for the app:

- `COCKROACH_DB_URL`
- `NPM_TOKEN`
- `VITE_PUBLIC_APP_ID`
- `VITE_PUBLIC_APP_ENV`
- `VITE_PUBLIC_SENTRY_DSN`
- `VITE_PUBLIC_UMAMI_WEBSITE_ID`

Ensure these are defined in your `.env` file.

## External APIs Description

- **Supabase**: Provides authentication services, allowing users to sign in using various social providers or magic links.
- **Sentry**: Captures and logs errors from both frontend and backend, helping in monitoring and debugging.
- **Umami**: Tracks website analytics without compromising user privacy.
- **Progressier**: Adds Progressive Web App (PWA) capabilities, enabling offline access and better user experience.

---
**Note**: Replace `<your-env-file-content>` with your actual environment variables in the `.env` file.

# Getting Started

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd solidjs-vite-tailwind-vercel
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the required environment variables.

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   
5. **Build for Production**
   ```bash
   npm run build
   ```

6. **Preview the Production Build**
   ```bash
   npm run serve
   ```

For detailed instructions on each user journey, refer to the [User Journeys](#user-journeys) section above.