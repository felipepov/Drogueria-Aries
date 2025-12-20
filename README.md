# Drogueria Aries

A web application for a pharmacy (droguería) in San Miguel de Tucumán, Argentina. This project was developed for client **Jose Antonio Muratore** but was never fully deployed or utilized due to a company merger that occurred before completion.

## Project History

This project was commissioned to create a modern web presence for Drogueria Aries, a local pharmacy business. The application was designed to showcase products, manage inventory, and provide information about the pharmacy's location and hours.

However, during development, the company underwent a merger, which resulted in the project no longer being needed. As a result, the application was never fully completed or deployed to production. The codebase remains as a reference implementation and demonstration of the work completed.

## Current Status

The application is in a **partially complete** state:

- ✅ Frontend UI/UX design completed
- ✅ Firebase integration setup (authentication, Firestore, storage)
- ✅ Product management interface (add/delete products)
- ✅ Responsive design with Bootstrap 5
- ⚠️ Products section has placeholder UI (skeleton loaders) - database connection was never fully configured
- ⚠️ Not deployed to production

## Technology Stack

- **Frontend Framework**: Vanilla JavaScript (ES6 modules)
- **Build Tool**: Webpack 5
- **CSS Framework**: Bootstrap 5.0.0-beta1
- **CSS Preprocessor**: Sass/SCSS
- **Backend/Database**: Firebase
  - Firebase Authentication (Google Sign-In)
  - Cloud Firestore (database)
  - Firebase Storage (image uploads)
- **Deployment**: Firebase Hosting (configured but not deployed)

## Project Structure

```
Drogueria-Aries/
├── src/                    # Source files
│   ├── assets/            # Images and SVG icons
│   ├── js/                # JavaScript modules
│   │   ├── index.js       # Main application logic
│   │   └── views/         # View controllers
│   ├── sass/              # SCSS stylesheets
│   ├── template.html      # Main page template
│   └── prodtemplate.html  # Products page template
├── dist/                   # Built/compiled files
├── firebase.json          # Firebase configuration
└── webpack.*.js          # Webpack build configurations
```

## Features

### Implemented

- **Home Page**: Hero section with call-to-action
- **Products Section**: Display of discounted products (with skeleton loading placeholders)
- **Products List Page**: Full product listing with management interface
- **Admin Panel**: 
  - Add new products (with image upload)
  - Delete products
  - Toggle discount status
- **Authentication**: Google Sign-In integration
- **Contact Information**: Map integration, hours, phone, email
- **Responsive Design**: Mobile-friendly layout

### Incomplete

- Database connection for products (currently shows skeleton placeholders)
- Production deployment
- Role-based access control (planned but not implemented)
- Product pagination
- Additional admin features

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account (if you want to use the database features)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Drogueria-Aries
```

2. Install dependencies:
```bash
npm install
```

**Note**: The project uses `node-sass` which may have compatibility issues with newer Node.js versions. If installation fails, you may need to use an older Node.js version or migrate to `sass` (Dart Sass).

### Development

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:8080` (or the port specified in webpack.dev.js).

### Building for Production

**Important**: This project uses older package versions that may have compatibility issues with Node.js 17+. 

**Option 1: Use Node.js 16 or earlier** (Recommended)
```bash
# If you have nvm installed:
nvm use 16
npm run build
```

**Option 2: Use Node.js 18+ with legacy OpenSSL** (Workaround)
```bash
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

**Note**: You may still encounter build errors with postcss-loader. If so, you may need to:
- Use Node.js 16 or earlier, or
- Manually copy the updated HTML files to the `dist/` folder if you only changed HTML/CSS

The compiled files will be in the `dist/` directory.

## Deployment

### Deploying to Firebase Hosting

To deploy the application with your changes to Firebase Hosting:

1. **Build the project** (this compiles all changes including skeleton placeholders):
```bash
npm run build
```

2. **Make sure you're logged into Firebase CLI**:
```bash
firebase login
```

3. **Verify your Firebase project** (if not already set):
```bash
firebase use <your-project-id>
```

4. **Deploy to Firebase Hosting**:
```bash
npm run deploy
```

Or directly:
```bash
firebase deploy --only hosting
```

### Deployment Checklist

Before deploying, ensure:
- ✅ All changes are built (`npm run build` completed successfully)
- ✅ Firebase project is configured correctly
- ✅ Firebase config in HTML files matches your project
- ✅ You're logged into Firebase CLI
- ✅ The `dist/` folder contains the latest build

### What Gets Deployed

The deployment process:
1. Builds all source files (HTML, JS, CSS, assets)
2. Optimizes and minifies code
3. Uploads the `dist/` folder to Firebase Hosting
4. Makes the site available at your Firebase Hosting URL

**Note**: The skeleton placeholders will be visible on the deployed site until the database connection is properly configured.

### Firebase Configuration

The project includes Firebase configuration, but you'll need to:

1. Set up your own Firebase project
2. Update the Firebase config in `src/template.html` and `src/prodtemplate.html`
3. Configure Firestore rules and indexes
4. Set up Firebase Storage for image uploads

## Known Issues

- Products section displays skeleton placeholders instead of actual products (database connection incomplete)
- `node-sass` may not compile on newer Node.js versions
- Some features are incomplete or not fully tested

## Author

**Felipe Poviña**

Developed for client **Jose Antonio Muratore**

## License

ISC

## Notes

This project serves as a portfolio piece and reference implementation. It demonstrates:
- Modern web development practices
- Firebase integration
- Responsive design
- Product management interfaces
- Authentication flows

The project was discontinued due to business circumstances (company merger) and is maintained for educational and portfolio purposes.

