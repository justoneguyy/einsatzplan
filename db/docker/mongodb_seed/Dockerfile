ARG MONGO_VERSION
ARG DATA_PATH=/data

FROM mongo:${MONGO_VERSION}

# change shell in order to use arrays
SHELL ["/bin/bash", "-c"]

COPY . ${DATA_PATH}

RUN echo "Starting data import..."

# the employees can only be seeded after the groups and roles are seeded because we need the objectIds of the groups and roles
# define the collections to import (name = fileName(.json) = collectionName(toUpper))
CMD collections=("role" "group"); \
    for name in "${collections[@]}"; do \
      collection=$(echo $name | awk '{print toupper(substr($0,1,1))substr($0,2)}'); \
      file="${DATA_PATH}/${name}.json"; \
      if [ -f "$file" ]; then \
        echo "Importing Collection '$collection'..."; \
        if mongoimport --host mongo --db einsatzplan --collection $collection --type json --file $file --jsonArray; then \
          echo "Successfully imported Collection '$collection'."; \
        else \
          echo "Failed to import Collection '$collection'."; \
          exit 1; \
        fi; \
      else \
        echo "File '$file' not found./nPlease provide a valid name which matches the file and which is also a json"; \
        exit 1; \
      fi; \
    done

RUN echo "Data import completed."
