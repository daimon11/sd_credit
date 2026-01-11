declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ELKA_FRONT_SALARY_BFF_URL: string;
      ELKA_FRONT_PAYMENT_BFF_URL: string;
    }
  }
}

export {};
