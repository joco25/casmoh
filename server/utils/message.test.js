const expect = require('expect')
const {generateMessage,generateLocationMessage} = require('./message')

describe('generateMessage',()=>{
    it('should generate the correct message object',()=>{
        let from = 'John';
        let text = 'This is how we row';
        let res = generateMessage(from,text)
            expect(res).toInclude({from})
     
            expect(res.createdAt).toBeA('number')
    })
})

describe('generateLocationMessage', ()=>{
    it('should generate the correct location object',()=>{
        let from = 'John';
        let lat=1
        let long=1
        let url = 'https://www.google.com/maps?q=1,1'
        let res= generateLocationMessage(from,lat,long)
            expect(res).toInclude({from})
        expect(res).toInclude({ url})
            expect(res.createdAt).toBeA('number')
    })
})