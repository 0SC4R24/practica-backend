const request = require('supertest')
const app = require('../index')

const {verifyToken} = require("../utils/handleJwt")

describe('users', () => {
    let token = ''
    let id = ''

    it('should register a user', async () => {
        const response = await request(app)
            .post('/api/auth/register/user')
            .send({
                name: 'user',
                email: 'user@mail.com',
                password: 'user12345',
                age: 25,
                city: 'Madrid',
                interests: ['sports', 'food'],
                role: 'user',
                avatar: 'http://localhost:3000/api/storage/6643bc324f81dbd5cb5dc943',
                canReceiveOffers: true
            })
            .set('Accept', 'application/json')
            .expect(200)
        token = response.body.token
    })

    it('should login a user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'user@mail.com',
                password: 'user12345'
            })
            .set('Accept', 'application/json')
            .expect(200)
        token = response.body.token
    })

    it('should get all users', async () => {
        const response = await request(app)
            .get('/api/auth/users')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        id = response.body[0]._id
    })

    it('should get a user by id', async () => {
        await request(app)
            .get(`/api/auth/user/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })

    it('should update a user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'user@mail.com',
                password: 'user12345'
            })
            .set('Accept', 'application/json')
            .expect(200)
        token = response.body.token
        body = await verifyToken(token)
        id = body._id

        await request(app)
            .patch(`/api/auth/user/${id}`)
            .send({
                name: 'user24',
                city: 'Barcelona',
                age: 28
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })

    it('should create a commerce', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test24@test.com',
                password: 'test12345'
            })
            .set('Accept', 'application/json')
            .expect(200)
        token = response.body.token

        const response2 = await request(app)
            .post('/api/auth/register/commerce')
            .send({
                email: 'comercio12@comercio.com',
                password: 'commerce12345',
                name: 'commerce',
                description: 'description of commerce',
                address: 'Barcelona',
                cif: 'A123532678',
                phone: '9122357278'
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        token = response2.body.token
    })

    it('should get all commerces', async () => {
        const response = await request(app)
            .get('/api/commerces')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })
})