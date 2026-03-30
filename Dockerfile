# Stage 1 — Build (sab kuch yahan)
FROM node:20.14-alpine AS builder
WORKDIR /app

# Dependencies pehle copy karo (layer caching ke liye)
COPY package*.json ./
RUN npm ci

# Source copy karo aur build karo
COPY . .
RUN npm run build --if-present

# Stage 2 — Production image (slim)
FROM node:20.14-alpine AS runner
WORKDIR /app

# tini install karo — proper PID 1 signal handling
RUN apk add --no-cache tini

ENV NODE_ENV=production
ENV PORT=80

# Sirf zaroorat ki cheezein copy karo
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/server.js ./

# Non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 80

# Healthcheck — ECS/Docker ko pata chalega container theek hai ya nahi
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:80/health || exit 1

# tini as entrypoint — SIGTERM properly handle hoga
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]

