FROM postgres:15

# Set environment variables
ENV POSTGRES_PASSWORD=password \
    POSTGRES_DB=three_tier_app \
    POSTGRES_USER=postgres

# Copy initialization script
COPY init.sql /docker-entrypoint-initdb.d/

# Expose PostgreSQL port
EXPOSE 5432
