declare namespace NodeJS {
  interface ProcessEnv {
    //db mysql
    DATABASE_URL: string;
    //host next
    NEXT_PUBLIC_HOST_URL: string;
    HOST_URL: string;
    //transfeera
    CLIENT_ID_TRANSFEERA_DESENV: string;
    CLIENT_SECRET_TRANSFEERA_DESENV: string;
    URL_TRANS_LOGIN_DESENV: string;
    URL_TRANSFEERA_DESENV: string;
    CLIENT_ID_TRANSFEERA_PROD: string;
    CLIENT_SECRET_TRANSFEERA_PROD: string;
    URL_TRANS_LOGIN_PROD: string;
    URL_TRANSFEERA_PROD: string;
    //jwt
    JWT_SECRET: string;
    //next-auth
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    //bearer token api
    TOKEN_API: string;
    NEXT_PUBLIC_TOKEN_API: string;
    //mail smpt
    MAIL_HOST: string;
    MAIL_PORT: number;
    MAIL_USER: string;
    MAIL_PASSWORD: string;
    //webhook n8n
    WEBHOOK_NEW_CUSTOMER: string;
    SEND_MESSAGE_CERTIFIER: string;
    WEBHOOK_INFO_REQUIREMENT: string;
  }
}
