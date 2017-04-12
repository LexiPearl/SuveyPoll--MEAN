
var users= require('../controllers/users.js')
var polls=require('../controllers/polls.js')

module.exports=function(app){
    app.post('/login', function(req,res){
        console.log("this is login req body at routes login", req.body)
        users.login(req,res)
    });
    app.get('/dashboard', function(req,res){
        polls.dashboard(req,res)
    });
    app.post('/newPoll', function(req, res){
        console.log("this is the req.body from newPoll at routes newPoll", req.body)
        polls.newPoll(req,res)
    });
    app.get('/poll/:id', function(req, res){
        console.log("this is the req.body from poll/id", req.body)
        polls.showPoll(req,res)
    });
    app.post('/option/vote', function(req,res){
        console.log("you are at option vote  in routes", req.body)
        polls.vote(req,res)
});
    app.get('/poll/:id/delete', function(req,res){
        console.log("you are at poll/delete in routes", req.body)
        polls.delete(req,res)
    });
}
