#!/bin/bash
set -e

echo "🚀 Travels Toors deployment helper"
echo "========================================"

if ! command -v node >/dev/null 2>&1; then
  echo "❌ Node.js is required. Install Node.js 18+ and npm."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "❌ npm is required. Install Node.js and npm."
  exit 1
fi

case "${1:-build}" in
  build)
    echo "📦 Installing dependencies..."
    npm ci

    echo "🔨 Building production assets..."
    npm run build

    echo "✅ Build complete. Output available in ./build"
    echo "👉 Run locally with Docker: ./deploy.sh docker"
    ;;

  docker)
    if ! command -v docker >/dev/null 2>&1; then
      echo "❌ Docker is required to build the container."
      exit 1
    fi

    echo "📦 Building Docker image..."
    docker build -t travels-toors:latest .

    echo "✅ Docker image built: travels-toors:latest"
    echo "👉 Run it with:"
    echo "   docker run -d -p 3000:80 --name travels-toors travels-toors:latest"
    echo "Visit http://localhost:3000"
    ;;

  help|-h|--help)
    echo "Usage: ./deploy.sh [build|docker]"
    echo "  build   - install dependencies and build the app"
    echo "  docker  - build the Docker production image"
    ;;

  *)
    echo "Unknown command: $1"
    echo "Usage: ./deploy.sh [build|docker]"
    exit 1
    ;;
esac
