FROM oven/bun:1 AS base

LABEL description="Vodding"
LABEL org.opencontainers.image.source="https://github.com/lodu/vodding"
LABEL org.opencontainers.image.url="https://github.com/lodu/vodding"
LABEL org.opencontainers.image.documentation="https://github.com/lodu/vodding"
LABEL maintainer="Ludo <ludo@lodu.dev>"
LABEL version="1.0"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.revision="Initial release ✨"
LABEL org.opencontainers.image.title="Vodding - The Ultimate Streaming Experience 🚀"
LABEL org.opencontainers.image.description="A blazing fast component for the revolutionary Vodding application. Stream like never before! 🎉"


WORKDIR /app/

FROM base AS install

WORKDIR /temp/

COPY package.json bun.lockb /temp/
COPY packages/app/package.json /temp/packages/app/
COPY packages/common/package.json /temp/packages/common/
COPY packages/web/package.json /temp/packages/web/

RUN bun install


FROM base AS app_development

COPY . /app/
RUN bun install


WORKDIR /app/packages/app/
ENV NODE_ENV=development
EXPOSE 5432
ENTRYPOINT  ["bun"]
CMD ["run", "dev"]

FROM base AS web_development

COPY . /app/
RUN bun install


WORKDIR /app/packages/web/
ENV NODE_ENV=development
EXPOSE 5173
ENTRYPOINT  ["bun"]
CMD ["run", "dev"]


FROM base AS app_production_build
COPY --from=install /temp/node_modules node_modules
COPY . .

WORKDIR /app/packages/app/
ENV NODE_ENV=production
RUN bun run build

FROM base AS app_production
COPY --from=app_production_build /app/packages/app/dist /app/packages/app/dist

COPY packages/common/package.json /app/packages/common/
COPY packages/app/package.json /app/packages/app/

WORKDIR /app/packages/app/
EXPOSE 5432
ENTRYPOINT [ "bun" ]
CMD [ "run", "start" ]



FROM base AS web_production_build
COPY --from=install /temp/node_modules node_modules
COPY . .

WORKDIR /app/packages/web
ENV NODE_ENV=production

RUN bun run build



FROM nginx:latest AS web_production
COPY --from=web_production_build /app/packages/web/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

