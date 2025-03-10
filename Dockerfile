# Base Node.js image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@10.5.2

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with specific config for CI environment
RUN pnpm install --frozen-lockfile --ignore-scripts

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Install pnpm in builder stage
RUN npm install -g pnpm@10.5.2

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED 1

# Set production environment
ENV NODE_ENV production

# Set redirect environment variables for build
ENV REDIRECT_MAC="https://example.com/mac"
ENV REDIRECT_WIN="https://example.com/win"
ENV REDIRECT_LINUX="https://example.com/linux"
ENV REDIRECT_LINUX_DEV="https://example.com/linuxdev"
ENV REDIRECT_DEBIAN="https://example.com/debian"

# Build the application
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create necessary directories and set permissions
RUN mkdir -p /app/public/images
RUN chown -R nextjs:nodejs /app/public

COPY --from=builder /app/public ./public
RUN chown -R nextjs:nodejs /app/public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"] 