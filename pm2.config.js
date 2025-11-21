module.exports = {
  apps: [
    {
      name: "server",
      script: "dist/main.js",
      instances: 1,
      autorestart: true,
      watch: false
    }
  ]
}
