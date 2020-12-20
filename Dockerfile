ARG BASE_IMAGE=node:15.4.0-alpine

FROM $BASE_IMAGE AS root
WORKDIR /app
COPY package.json ./
RUN npm i

FROM root AS api-packages
COPY packages/apis/package*.json ./packages/apis/
RUN npm i

FROM api-packages AS api
COPY packages/apis ./packages/apis/
RUN cd packages/apis && npm run build

FROM api-packages AS internal-packages

FROM internal-packages AS api-server-packages
COPY packages/api-server/package*.json ./packages/api-server/
RUN npm i

FROM api-server-packages AS api-server-dev
COPY --from=api /app/packages/apis /app/packages/apis/
COPY ormconfig.js ./
RUN cp ormconfig.js /app/packages/api-server
WORKDIR /app/packages/api-server
COPY packages/api-server ./
ENTRYPOINT ["npm", "run", "dev"]

FROM api-server-dev AS api-server
RUN npm run build

FROM internal-packages AS oauth-frontend-packages
COPY packages/oauth-frontend/package*.json ./packages/oauth-frontend/
RUN cd packages/oauth-frontend &&  npm i --legacy-peer-deps

FROM internal-packages AS management-frontend-packages
COPY packages/management-frontend/package*.json ./packages/management-frontend/
COPY --from=oauth-frontend-packages /app/packages/oauth-frontend/node_modules /app/packages/management-frontend/node_modules/
RUN cd packages/management-frontend &&  npm i --prefer-offline --legacy-peer-deps

FROM oauth-frontend-packages AS oauth-frontend-dev
COPY --from=api /app/packages/apis /app/packages/apis/
WORKDIR /app/packages/oauth-frontend
COPY packages/oauth-frontend ./

ENTRYPOINT ["npm", "run", "start-with-proxy"]

FROM oauth-frontend-dev AS oauth-frontend
RUN cd packages/oauth-frontend && npm run build

FROM management-frontend-packages AS management-frontend-dev
COPY --from=api /app/packages/apis /app/packages/apis/
WORKDIR /app/packages/management-frontend
COPY packages/management-frontend ./
ENTRYPOINT ["npm", "start"]


FROM management-frontend-dev AS management-frontend
WORKDIR /app/packages/management-frontend
RUN npm run build

FROM internal-packages AS oauth-backend-packages
COPY packages/oauth-backend/package*.json packages/oauth-backend/
RUN npm i

FROM oauth-backend-packages AS oauth-backend-dev
COPY --from=api /app/packages/apis /app/packages/apis/
WORKDIR /app/packages/oauth-backend
COPY packages/oauth-backend ./
ENTRYPOINT ["npm", "run", "dev"]
