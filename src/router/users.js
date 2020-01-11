const { Router } = require("express");
const _ = require("underscore");
const users = require("../mock/users.json");

const router = Router();

router.get('/', (req, res)=>{
    res.json(users);
});

router.post('/', (req, res)=>{
    if(req.body){
        console.log("Validando...");
        const id = users.length +1;
        console.log(`Novo ${id}`);
        const newUser = {id, ...req.body};
        console.log(newUser);
        users.push(newUser);
        res.send("Concluido!!!");
    }else{
        res.sendStatus(500).json({error: "There was an error."});
    }
});

router.delete('/:id', (req, res)=>{
    const { id } = req.params
    _.each(users, (user, i)=> {
        if (user.id === id){
            users.splice(i,1);
        }
    });
    res.send(users);
});

router.put('/:id', (req, res)=> {
    const { id } = req.params;
    const {name, username, email} = req.body;
    if(name || username || email){
        _.each(users, (user, i)=>{
            if(user.id === id){
                user.name = name;
                user.username = username;
                user.email = email;
            }
        });
        res.json(users);
    }else{
        res.status(500).json({error: "there is an error"});
    }
})

module.exports = router;
