/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_START_YEAR: string;
    readonly VITE_END_YEAR: string;
    readonly VITE_COUNTRY_DICTIONARY: string;
    readonly VITE_SELECTABLE_COUNTRIES: string;
    readonly VITE_WORLD_BANK_API_URL_TEMPLATE: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }