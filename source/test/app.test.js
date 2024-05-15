const request = require('supertest')
const app = require('../index')

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
})