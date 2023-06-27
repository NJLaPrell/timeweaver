const shell = require("shelljs");

shell.cp("-R", "server/src/lib", "server/dist");
shell.cp("-R", "server/src/models", "server/dist");
shell.cp("-R", "server/src/routes", "server/dist");
//shell.cp('-R', 'server/package.json', 'gek-docker/server');
//shell.cp('-R', 'server/package-lock.json', 'gek-docker/server');
//shell.cp('.env.prod', 'gek-docker/server/.env');
shell.cp(".env.dev", ".env");
shell.cp(".env", "server/.env");
