import packageJson from '../../../package.json';
import 'dotenv/config'


/**
 * Pattern for config is:
 * key: process.env['KEY'] ?? default
 */
const env = {
    version: packageJson.version,
    name: packageJson.name,
    description: packageJson.description,
    nodeEnv: process.env['NODE_ENV'] ?? 'development',
    port: process.env['PORT'] ?? 5000,
    clientCorsOrigins: {
        'test': process.env['DEV_ORIGIN'] ?? '*',
        'development': process.env['DEV_ORIGIN'] ?? '*',
        'production': process.env['PROD_ORIGIN'] ?? 'none'
    },
    appEndpoint: "http://localhost:3000",
    apiEndpoint: "http://localhost:3000",
    jwt_secret: "myS33!!creeeT",
    jwt_expiration_in_seconds: 36000,
    environment: "dev",
    permissionLevels: {
        "NORMAL_USER": 1,
        "PAID_USER": 4,
        "ADMIN": 2048
    },
    SMTP_HOST: process.env['MAIL_HOST'],
    SMTP_PORT: process.env['MAIL_PORT'],
    SMTP_USERNAME: process.env['MAIL_USERNAME'],
    SMTP_PASSWORD: process.env['MAIL_PASSWORD'],

}

export default env