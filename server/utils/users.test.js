const expect = require('expect')
const {Users} = require('./users')

describe('Users',()=>{
    let users;

    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id:'1',
            name:'Mike',
            room:'Happy'
        }, {
                id: '2',
                name: 'John',
                room: 'Joyful'
            }, {
                id: '3',
                name: 'Fred',
                room: 'Excited'
            }, {
                id: '4',
                name: 'Frank',
                room: 'Happy'
            }]
    })
    describe('Add new User',()=>{
        it('should add new user', () => {
            let users = new Users();
            let user = { id: '123', name: 'joco', room: 'SL' }
            let res = users.addUser(user.id, user.name, user.room)

            expect(users.users).toEqual([user])
        })
    })
    
    describe('Get user list',()=>{
        it('should return names for Happy', () => {
            let list = users.getUserList('Happy')
            expect(list.length).toEqual(2)
            expect(list).toEqual(['Mike', 'Frank'])

        })
        it('should return names for Joyful', () => {
            let list = users.getUserList('Joyful')
            expect(list.length).toEqual(1)
            expect(list).toEqual(['John'])
        })

    })
    describe('Remove a User',()=>{
        it('should remove a user', () => {
            var user = users.removeUser('1')
            expect(user.id).toEqual('1')
        })

        it('should not remove user', () => {
            var user =users.removeUser('6')
            expect(user).toBeFalsy()
        })
    })
    describe('Find User',()=>{
        it('should find user', () => {
            let user = users.getUser('2')
            expect(user.name).toEqual('John')
        })

        it('should not find user', () => {
            let user = users.getUser('7')
            expect(user).toNotExist()
        })
    })

    

})