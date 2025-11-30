import request from 'supertest'
import server,{connectDB} from '../server'
import db from '../config/db'

describe ('GET /api', () => {
    it('should respond with a JSON message', async () => {
        const response = await request(server).get('/api')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toEqual({msg: 'Desde Api'})
        console.log(response.body)

        expect(response.status).not.toBe(404)  
        expect(response.body).not.toEqual({msg: 'desde api'})
    })
})

describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar a la BD')
        )
    })
})
