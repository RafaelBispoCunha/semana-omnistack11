const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection');

describe('ONG', () => {
    beforeEach(async ()=> {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () =>{
        const response = await request(app)
        .post('/ongs')
        //.set('Authorization', 'id Valido');
        .send({
                name: "ONG 002",
                email: "contanto@contato.com.br",
                whatsapp:"11999999999",
                city: "São Paulo",
                uf: "SP"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});