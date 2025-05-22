# Tax Loss Harvesting Tool

A responsive React application for tax loss harvesting that helps users identify and manage potential tax savings opportunities through strategic asset sales.

## Features

- Interactive dashboard displaying capital gains and potential tax savings
- Real-time calculation of tax loss harvesting opportunities
- Responsive design with modern UI components
- Mock API integration for demonstration purposes
- Detailed view of individual holdings with tax implications
- User-friendly interface for selecting and managing assets

## Screenshots

### Dashboard Overview
![Dashboard Overview](/assets/images/in1.png)

### Holdings List
![Holdings List](/assets/images/in2.png)

### Tax Savings Details
![Tax Savings Details](/assets/images/in3.png)

### Asset Selection
![Asset Selection](/assets/images/in4.png)

### Post harvesting
![Mobile View](/assets/images/in5.png)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd tax-loss-harvesting-tool
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Page components
├── services/          # API and business logic services
├── styles/            # Global styles and theme
├── types/             # TypeScript type definitions
└── utils/             # Utility functions

public/
├── assets/           # Static assets (images, fonts, etc.)
│   ├── images/      # Image files
│   ├── fonts/       # Font files
│   └── icons/       # Icon files
└── index.html       # Main HTML file
```

## Asset Usage

To reference assets in your React components, use the following patterns:

```jsx
// For images in public/assets directory
<img 
  src={`${process.env.PUBLIC_URL}/assets/images/logo.avif`} 
  alt="Logo" 
  style={{ height: 32 }} 
/>

// For other static assets in public folder
<img src={`${process.env.PUBLIC_URL}/assets/images/background.jpg`} alt="Background" />

// For CSS background images
.logo {
  background-image: url('/assets/images/background.jpg');
}
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Mock API

The application currently uses mock data to simulate API responses. The mock data is structured to demonstrate:
- Capital gains information
- Holdings data with tax implications
- Tax loss harvesting opportunities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the development team. 