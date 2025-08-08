import { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.0',
    info: {
        title: "API for Blog Management",
        version: '1.0.0',
        description: "API documentation using Swagger",
        contact: {
            name: "Skills with Placide from Solvit",
            email: "ikundabayoplacide500@gmail.com",
            url: "http://localhost:5500"
        }
    },
    servers: [
        {
            url: "http://localhost:5500",
            description: "Local Development server"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        schemas: {
            RoleEnum: {
                type: 'string',
                enum: ['admin', 'user'],
                description: 'User role in the system',
                example: 'user'
            },
            GenderEnum: {
                type: 'string',
                enum: ['male', 'female', 'other'],
                description: 'Gender of the user',
                example: 'male'
            },
            User: {
                type: 'object',
                required: ['name', 'email', 'password', 'role', 'gender'],
                properties: {
                    id: {
                        type: 'integer',
                        format: 'int64',
                        description: 'Unique identifier for the user',
                        example: 1
                    },
                    name: {
                        type: 'string',
                        description: 'Name of the user',
                        example: 'Placide'
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        description: 'Email address of the user',
                        example: 'placide@example.com'
                    },
                    password: {
                        type: 'string',
                        format: 'password',
                        description: 'Password for the user account',
                        minLength: 6,
                        writeOnly: true
                    },
                    role: {
                        $ref: '#/components/schemas/RoleEnum'
                    },
                    gender: {
                        $ref: '#/components/schemas/GenderEnum'
                    },
                    phoneNumber: {
                        type: 'string',
                        nullable: true,
                        description: 'Phone number of the user',
                        example: '+1234567890'
                    },
                    isActive: {
                        type: 'boolean',
                        description: 'Indicates if the user account is active',
                        default: true,
                        example: true
                    },
                    created_at: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Timestamp when the user was created',
                        example: '2023-10-01T12:00:00Z'
                    },
                    updated_at: {
                        type: 'string',
                        format: 'date-time',
                        description: 'Timestamp when the user was last updated',
                        example: '2023-10-01T12:00:00Z'
                    },
                    deleted_at: {
                        type: 'string',
                        format: 'date-time',
                        nullable: true,
                        description: 'Timestamp when the user was deleted, null if not deleted',
                        example: null
                    }
                },
                example: {
                    id: 1,
                    name: 'Placide',
                    email: 'placide@example.com',
                    password: 'password123',
                    role: 'user',
                    gender: 'male',
                    phoneNumber: '+1234567890',
                    isActive: true,
                    created_at: '2023-10-01T12:00:00Z',
                    updated_at: '2023-10-01T12:00:00Z',
                    deleted_at: null
                }
            }
        }
    }
};

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts']
};

export default swaggerOptions;