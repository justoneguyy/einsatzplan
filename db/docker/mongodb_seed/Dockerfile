ARG MONGO_VERSION

FROM mongo:${MONGO_VERSION}

COPY init.json /init.json
CMD mongoimport --host mongo --db einsatzplan --collection employees --type json --file /init.json --jsonArray
