FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS build
COPY package*.json ./
RUN npm install
#RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
# Uncomment the line below if you have a build step (e.g., TypeScript)
# RUN pnpm run build

FROM base AS runtime
ENV NODE_ENV=production

# Use non-root user for security
RUN groupadd --gid 1001 nodejs && \
    useradd --uid 1001 --gid nodejs --shell /bin/bash --create-home nodejs

COPY --from=build --chown=nodejs:nodejs /app/package.json ./
COPY --from=build --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nodejs:nodejs /app/index.js ./index.js

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "fetch('http://localhost:3000/health').then(r => r.status === 200 ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

CMD ["node", "index.js"]