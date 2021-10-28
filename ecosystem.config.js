module.exports = {
  apps: [{
    name: "new ssstutter",
    script: "./app.js",
    watch: true,
    instances: 1,
    exec_mode: "cluster",
    ignore_watch: ["logs", "dbs", "uploads", "assets/*"],
    env: {
      "NODE_ENV": "production",
      "PORT": 8000,
    }
  }]
};
