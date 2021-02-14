import { data } from "./index";
export const postInfo = data.find((post) => post.id === 3);
export const dockerPostgres = `
# Troubleshooting Postgres Docker Image Initialization Script

In this article, I'll describe some basic troubleshooting associated with using the official [Docker Postgres image](https://hub.docker.com/_/postgres).
Specifically, this article will consider some common pitfalls encountered in using the intialization script feature of this image.

## Permission 
The first thing to be aware of is that the script must have executable permissions set, because Docker copies over the permissions from the local filesystem.

If, looking the docker postgis container logs (\`docker-compose logs --follow postgis\`) contain the following error, 
\`\`\`
postgis    | /usr/local/bin/docker-entrypoint.sh: running /docker-entrypoint-initdb.d/init.sh
postgis    | /usr/local/bin/docker-entrypoint.sh: /docker-entrypoint-initdb.d/init.sh: /bin/bash: bad interpreter: Permission denied
\`\`\`

then the initialization script should be made executable:, 
\`\`\`
chmod +x migration/bin/init/init.sh
\`\`\`

## Re-running the initialization script on a fresh docker image

If creating a fresh docker image with a new DB, then the init.sh script will need to run again. There may be some manual clean up to do in order for the Postgres image to run the init script.

For example, it is important to remove any existing postres data volume. Otherwise, the intialization script will not run. 

Find the volume by running 
\`\`\`
docker volume ls -q
\`\`\`

Look for the volume by name, in my case it was 
\`\`\`
breadcrumbs_pg_data
\`\`\`

If it exists, delete it by running 
\`\`\`
docker volume rm breadcrumbs_pg_data
\`\`\`

If you get the error: 
\`\`\`
Error response from daemon: remove breadcrumbs_pg_data: volume is in use - [d473cd3b40293fc1023f1108f2b09118a59df03950178fa24e1f55c636246da8]
\`\`\`

Then remove the indicated container. In this case: 
\`\`\`
docker rm d473cd3b4029
\`\`\`


Note that this removes the DB data; so be careful. 

Now it should be possible to create a fresh postgres image with use of the initialization script. 
`;
