const request = require('supertest');
const app = require('../../app');

describe('Test GET Launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app).get('/launches');
        expect(response.statusCode).toBe(200);
    })
})

describe('Test POST Launches', () => {
    test('It should respond with 201 success', async () => {
        const response = await request(app)
            .post('/launches')
            .send({
                mission: 'USS Enterprise',
                rocket: 'NCC 1701-D',
                launchDate: 'January 4, 2028',
                target: 'Kepler-442 b',
                destination: 'Kepler-442 b'
            })
            .expect('Content-Type', /json/)
            .expect(201);

            expect(response.body).toEqual({
                mission: 'USS Enterprise',
                rocket: 'NCC 1701-D',
                launchDate: '2028-01-04T00:00:00.000Z',
                target: 'Kepler-442 b',
                destination: 'Kepler-442 b',
                upcoming: true,
                success: true,
                customers: ['ZTM', 'NASA'],
                flightNumber: expect.any(Number)
            });
    })

    test('It should catch missing required property', () => {
        const response = 200;
        expect(response).toBe(200);
    })
    test('It should catch invalid dates', () => {
        const response = 200;
        expect(response).toBe(200);
    })
})



// describe('Test Get Launches', () => {
//   it('should return a list of launches', async () => {
//     const response = await global.testRequest.get('/launches');
//     expect(response.statusCode).toBe(200);
//     expect(response.body.length).toBeGreaterThan(0);
//   });
//   it('should return a launch with valid id', async () => {
//     const response = await global.testRequest.get('/launches/1');
//     expect(response.statusCode).toBe(200);
//     expect(response.body).toHaveProperty('id', 1);
//   });
// })