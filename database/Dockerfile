FROM mysql:8.0

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=password \
    MYSQL_DATABASE=three_tier_app

# Copy initialization script
COPY init.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306

# MySQL will automatically execute any .sql files in /docker-entrypoint-initdb.d/
# when the container starts for the first time
CMD ["mysqld"]
