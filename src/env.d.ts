/* eslint-disable */
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_API_KEY: string;
  readonly PUBLIC_API_URL: string;
  readonly PUBLIC_STRIPE_KEY: string;
  readonly STRIPE_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
