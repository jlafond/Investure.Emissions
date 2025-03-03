/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_START_YEAR: string;
    readonly VITE_END_YEAR: string;
    readonly VITE_COUNTRY_DICTIONARY: string;
    readonly VITE_SELECTABLE_COUNTRIES: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }