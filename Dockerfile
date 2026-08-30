FROM node:24-bookworm-slim AS development

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN corepack enable
RUN rm -rf /usr/local/lib/node_modules/npm /opt/yarn-v1.22.22 \
    && rm -f /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/yarn /usr/local/bin/yarnpkg

WORKDIR /site
RUN chown node:node /site

USER node
RUN corepack prepare pnpm@11.24.0 --activate

COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile && rm -rf .pnpm-store

COPY --chown=node:node . .

EXPOSE 4321

CMD ["pnpm", "dev", "--host", "0.0.0.0"]
