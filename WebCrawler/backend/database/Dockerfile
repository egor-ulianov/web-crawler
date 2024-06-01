FROM postgres:16.2-alpine

COPY ./create_tables.sql /docker-entrypoint-initdb.d/create-tables.sql

EXPOSE 5432