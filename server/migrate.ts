/* eslint-disable import/no-anonymous-default-export */
export default {
  uri: Bun.env.MONGO_URI, // => string
  collection: 'migrations',
  migrationsPath: './migrations',
  templatePath: './migrations/template.ts',
  autosync: false,
};
