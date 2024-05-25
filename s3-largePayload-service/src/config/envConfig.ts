// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config().parsed;

interface ENV {
  LARGEFILE_BUCKET: string | undefined;
}

interface Config {
  LARGEFILE_BUCKET: string;
}

export const getConfig = (): ENV => {
  return {
    LARGEFILE_BUCKET: process.env.LARGEFILE_BUCKET,
  };
};

const getSanitezedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitezedConfig(config);

export default sanitizedConfig;
