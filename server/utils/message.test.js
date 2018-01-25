const expect = require('expect')
const {generateMessage} = require('./message')

describe('generateMessage',()=>{
    it('should generate the correct message object',()=>{
        let from = 'John';
        let text = 'This is how we row';
        let res = generateMessage(from,text)
            expect(res).toInclude({from})
            expect(res).toInclude({text})
            expect(res.createdAt).toBeA('number')
    })
})