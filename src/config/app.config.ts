import { registerAs } from "@nestjs/config";

export default registerAs('app', () => ({
    baseURL: process.env.BASE_URL,
    aUserName: process.env.AUSER_NAME,
    AdoPAT: process.env.ADO_PAT,
    port: parseInt(process.env.APP_PORT || process.env.PORT || '8080', 10),
}))