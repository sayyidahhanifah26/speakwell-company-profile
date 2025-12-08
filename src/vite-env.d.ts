/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RANDOMUSER_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
