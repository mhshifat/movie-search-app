declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: string;
    ES_HOST?: string;
    RBMQ_HOST?: string;
  }
}