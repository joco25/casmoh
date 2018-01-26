var expect = require('expect')
var {isRealString}= require('./validation')

describe('isRealString',()=>{
    it('should reject non-string values',()=>{
        let res=isRealString(291)
        expect(res).toBeFalsy()
    })
    it('should reject with only spaces',()=>{
        let res = isRealString('   ')
        expect(res).toBe(false)
    })
    it('should allow string with non-space characters',()=>{
        let res = isRealString('oke$lite do this')
        expect(res).toBeTruthy()
    })
})