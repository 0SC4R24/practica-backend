const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Oscar Viudez - Practica Final Backend",
            version: "1.0.0",
            description: "Entrega Final de la asignatura de Backend con Node.js, Express, Swagger y Slack en U-tad",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer"
                },
            },
            schemas:{
                commerces: {
                    type: "object",
                    required: ["name", "cif", "address", "email", "password", "phone", "description"],
                    properties: {
                        name: {
                            type: "string",
                            example: "Nombre del Comercio"
                        },
                        cif: {
                            type: "string",
                            example: "A12345678"
                        },
                        address: {
                            type: "string",
                            example: "Direccion del Comercio"
                        },
                        email: {
                            type: "string",
                            example: "info@comercio.com"
                        },
                        password: {
                            type: "string",
                            example: "password123"
                        },
                        phone: {
                            type: "integer",
                            example: 123456789
                        },
                        description: {
                            type: "string",
                            example: "Descripcion del Comercio"
                        }
                    }
                },
                users: {
                    type: 'object',
                    required: ['name', 'email', 'password', 'age', 'city', 'interests', 'role', 'avatar', 'canReceiveOffers'],
                    properties: {
                        name: {
                            type: 'string',
                            example: 'Nombre del Usuario'
                        },
                        email: {
                            type: 'string',
                            example: 'usuario@correo.com'
                        },
                        password: {
                            type: 'string',
                            example: 'password123'
                        },
                        age: {
                            type: 'integer',
                            example: 25
                        },
                        city: {
                            type: 'string',
                            example: 'Madrid'
                        },
                        interests: {
                            type: 'array',
                            items: {
                                type: 'string',
                                example: ['sports', 'food']
                            }
                        },
                        role: {
                            type: 'string',
                            example: 'user'
                        },
                        avatar: {
                            type: 'string',
                            example: 'https://github.com/0SC4R24.png'
                        },
                        canReceiveOffers: {
                            type: 'boolean',
                            example: true
                        }
                    }
                },
                pages: {
                    type: 'object',
                    required: ["id", "city", "activity", "title", "description", "totalScore", "reviews", "photos", "texts"],
                    properties: {
                        id: {
                            type: 'string',
                            example: '123456789'
                        },
                        city: {
                            type: 'string',
                            example: 'Madrid'
                        },
                        activity: {
                            type: 'string',
                            example: 'sports'
                        },
                        title: {
                            type: 'string',
                            example: 'Titulo de la Pagina'
                        },
                        description: {
                            type: 'string',
                            example: 'Descripcion de la Pagina'
                        },
                        totalScore: {
                            type: 'integer',
                            example: 4
                        },
                        reviews: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    user_id: {
                                        type: 'string',
                                        example: '123456789'
                                    },
                                    score: {
                                        type: 'integer',
                                        example: 4
                                    },
                                    comment: {
                                        type: 'string',
                                        example: 'Comentario del Usuario'
                                    }
                                }
                            }
                        },
                        photos: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'integer',
                                        example: 2
                                    },
                                    photo: {
                                        type: 'string',
                                        example: 'image.jpg'
                                    }
                                }
                            }
                        },
                        texts: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'integer',
                                        example: 2
                                    },
                                    text: {
                                        type: 'string',
                                        example: 'Texto de la Pagina'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ["./routes/*.js"]
}

module.exports = swaggerJsdoc(options)