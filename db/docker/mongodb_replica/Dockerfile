# Check the following option in Docker Settings -> General (otherwise it wont work. wasted 1 hour on this shit):
# Add the *.docker.internal names to the host's etc/hosts file (Requires password)

ARG MONGO_VERSION

FROM mongo:${MONGO_VERSION}

# think about using multiple replica sets in production
ENTRYPOINT mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip 0.0.0.0 & MONGOD_PID=$!; \
INIT_REPL_CMD="rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }] })"; \
# init with user as root (not needed for prisma)
# INIT_USER_CMD="db.getUser('$MONGO_INITDB_ROOT_USERNAME') || db.createUser({ user: '$MONGO_INITDB_ROOT_USERNAME', pwd: '$MONGO_INITDB_ROOT_PASSWORD', roles: [ 'root' ] })"; \
until ($MONGO_COMMAND admin --port $MONGO_REPLICA_PORT --eval "$INIT_REPL_CMD"); do sleep 1; done; \
echo "REPLICA SET ONLINE"; wait $MONGOD_PID;
