# ─────────────────────────────────────────
# Stage 1 — Build React app
# ─────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies (better caching)
COPY package*.json ./
RUN npm ci --silent

# Copy source
COPY . .

# Build React app
RUN npm run build

# ─────────────────────────────────────────
# Stage 2 — Serve with Nginx
# ─────────────────────────────────────────
FROM nginx:alpine

# Remove default config
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY default.conf /etc/nginx/conf.d/default.conf

# Fix permissions (required for non-root nginx)
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chown -R nginx:nginx /var/cache/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && mkdir -p /var/run \
    && touch /var/run/nginx.pid \
    && chown -R nginx:nginx /var/run

# Switch to non-root user
USER nginx

EXPOSE 80

# Healthcheck (FIXED)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://localhost || exit 1

CMD ["nginx", "-g", "daemon off;"]