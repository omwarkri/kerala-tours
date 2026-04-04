# Travels Toors - Kerala Tourism Application

A modern React-based web application for exploring Kerala's beautiful destinations and tour packages.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Docker (optional, for containerized deployment)

### Installation & Development

```bash
# 1. Install dependencies
npm ci

# 2. Start development server
npm start
```

The application will open at `http://localhost:3000`

## 📦 Scripts

```bash
npm start       # Start development server (port 3000)
npm run build   # Create production build
npm run serve   # Serve production build locally (port 3000)
```

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t travels-tours:latest .
```

### Run Container

```bash
# Run on port 80
docker run -p 80:8080 travels-tours:latest

# Or custom port
docker run -p 3000:80 travels-tours:latest
```

Access at `http://localhost:3000`

## 🔧 Jenkins Pipeline

The application includes a simple Jenkins pipeline for automated builds:

```
Stages:
1. Checkout     - Clone repository
2. Install      - npm ci
3. Build        - npm run build
4. Docker Build - Build Docker image
```

### Run Locally

```bash
./deploy.sh
```

## 📱 Contact Information

**Phone Numbers:**
- 📞 +91 7620290632
- 📞 +91 8080864204

**WhatsApp:** Available on the same numbers (24/7)

## 📁 Project Structure

```
src/
├── components/
│   ├── common/        # Reusable components
│   ├── HomePage/      # Home page components
│   └── places/        # Place-related components
├── pages/            # Page components
├── data/             # Static data
├── services/         # Service utilities
└── App.js            # Main app component

public/
├── index.html        # HTML entry point
├── manifest.json     # PWA manifest
└── robots.txt        # SEO robots file
```

## 🎨 Technologies

- **Frontend:** React 19, React Router 7, Tailwind CSS 3
- **Icons:** Lucide React
- **Build:** React Scripts 5
- **Server:** Nginx (production)

## 📝 Environment Variables

Create `.env` file (optional):
```env
REACT_APP_API_URL=https://your-api.com
```

## 🚢 Production Deployment

### Using Docker
```bash
docker build -t travels-tours:latest .
docker run -d -p 80:80 travels-tours:latest
```

### Using Node
```bash
npm run build
npm run serve
```

## 🔐 Security

- `.env` files are not committed
- Sensitive data kept locally
- Uses secure WhatsApp/Call integration

## 📊 Performance

- Optimized production builds
- SEO-friendly structure
- Responsive design for all devices

## 📞 Support

For issues or questions:
- **Call:** +91 7620290632 or +91 8080864204
- **WhatsApp:** Same numbers available 24/7

## 📄 License

This project is maintained by Travels Toors
