import * as Joi from "joi";
import appConfig from "./app.config";

export default {
  load: [
    appConfig,
  ],
  envFilePath: '.env',
  validationOptions: {
    abortEarly: true,
  },
    validationSchema: Joi.object({
    BASE_URL: Joi.string().uri().required(),
    AUSER_NAME: Joi.string().required(),
    ADO_PAT: Joi.string().required(),
    APP_PORT: Joi.number().default(8080),
  }),
  cache: false,
};