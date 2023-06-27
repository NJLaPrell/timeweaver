module.exports = {
  apps: [
    {
      name: "Rest Server",
      script: "./server/npm",
      args: "run start:dev:rest-server",
      watch: [
        "server/index.ts",
        "server/lib",
        "server/models",
        "server/routes",
      ],
      log_file: "RestServer.log",
    },
  ],
};
