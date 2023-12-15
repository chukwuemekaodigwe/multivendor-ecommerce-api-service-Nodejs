import packageJson from '../../../package.json';

/**
 * Pattern for config is:
 * key: process.env['KEY'] ?? default
 */
const config = {
    version: packageJson.version,
    name: packageJson.name,
    description: packageJson.description,
    nodeEnv: process.env['NODE_ENV'] ?? 'development',
    port: process.env['PORT'] ?? 3000,
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
    }
}

export default config