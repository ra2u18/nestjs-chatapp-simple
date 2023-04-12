FROM node:18-alpine AS base

## DEPS stage
FROM base as deps
# Install openssl for prisma
RUN apk update && apk add openssl
WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile

## Builder stage
FROM base as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN chmod +x /app/initiate.sh
RUN /app/initiate.sh build

## RUNNER stage
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder /app/initiate.sh ./initiate.sh
COPY --from=builder /app/node_modules ./node_modules
RUN chown -R nestjs:nodejs /app/node_modules

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
RUN chmod +x /app/initiate.sh

USER nestjs

CMD ["/bin/sh", "/app/initiate.sh", "start"]
