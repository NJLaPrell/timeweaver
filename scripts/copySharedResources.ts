const shell = require("shelljs");

shell.cp("-R", "src/app/state/models/*", "server/src/models/shared/");
