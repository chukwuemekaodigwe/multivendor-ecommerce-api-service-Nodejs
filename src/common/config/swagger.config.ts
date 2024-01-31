import swaggerJsdocs from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Multi-vendor Ecommerce App',
            version: '0.1.0',
            description: "This shows the API sefinition for the multivendor ecommerce application API",
            license: {
                name: 'MIT',
                url: 'https://spdx.ord/licenses/MIT.html'
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ["/src/**/routes.config.ts"],
};
  
const specs = swaggerJsdocs(options)

export default specs