const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')

// Tests to check that the test environment is set up correctly.
describe('Test environment tests', () => {
    
    test('Test environment test 1', () => {
        
        expect(1).toBe(1)
    })

    test('Test environment test 2', () => {
        
        expect(null).toEqual(null)
    })
})