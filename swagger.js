const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./api/routes/dailyReadingsRoutes.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "dailyReadings API",
        description: "Documentation automatically generated by the <b>swagger.autogen</b> module."
    },
    host: "localhost:50001",
    basePath: "/",
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "dailyReadings",
            "description": "Endpoints"
        }
    ],
    securityDefinitions: {
        api_key: {
            type: "apiKey",
            name: "API_KEY",
            in: "header"
        }
    },
    definitions: {

        dailyReading: {
            _id:"606abafb977eff055b52505a",
            dailyReading: "test reading",
            readingYear: "2021",
            readingMonth: "04",
            readingDay: "01",
            created_by: "Admin",
            created_date: "021-04-05T07:23:39.313Z",
            status: "saved"
        },
        dailyReadingsInput: [{
            $ref: "#/definitions/dailyReadingInput"    
             
        }],
        dailyReadingsOutput: [{
            $ref: "#/definitions/dailyReading"    
             
        }],
        dailyReadingInput: {
            dailyReading: "test reading",
            readingYear: "2021",
            readingMonth: "04",
            readingDay: "01",
            created_by: "Admin"
        },
        dailyReadingWasDeleted: {
            message: "Reading successfully deleted"
        },
        dailyReadingsMassUpdateInput: {
            status: "checked"
        },
        dailyReadingsMassUpdateOutput: {
            message: "dailyReadings update executed"
        }



    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js')
})