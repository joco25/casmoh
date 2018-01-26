class Users{
    constructor(){
        this.users= []
    }

    addUser (id, name,room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        let user = this.getUser(id);
        if(user){
            this.users= this.users.filter((user) => {
                return user.id !== id;
            })
        }
        return user;
    }

    getUser(id){
        let user = this.users.filter((user)=>{
            return user.id === id
        })
        return user[0];
    }

    getUserList(room){
        let users = this.users.filter((user)=>{
            return user.room === room;
        })
        let namesArray = users.map((user)=> user.name);

        return namesArray;
    }

    existingNames(name){
        let existingName = this.users.filter((user) => {
           return  user.name.toLowerCase() === name.toLowerCase()
        })

        return existingName;
    }
    
    
}

module.exports= {Users}