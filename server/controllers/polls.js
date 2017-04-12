var mongoose = require('mongoose');
var Option = mongoose.model('Option');
var Poll = mongoose.model('Poll')

module.exports={
    newPoll: function(req, res){
        console.log("at polls.js new poll", req.body)
        var poll=req.body.poll
            console.log("this is req body poll", poll)
        var question=req.body.question
        var optionUno=req.body.optionUno
        var optionDos=req.body.optionDos
        var optionTres=req.body.optionTres
        var optionCuatro=req.body.optionCuatro
        if (optionUno!==undefined && optionDos!==undefined && optionTres!==undefined && optionCuatro!==undefined){
            var name=req.body.name
            console.log("this is name question option 1/2/3/4 in polls.js newPoll", name, question, optionUno, optionDos, optionTres, optionCuatro)
            var newPoll=new Poll({name:name, question:question})
            console.log("this is the new poll", newPoll)
            console.log("this is the new poll id", newPoll.id)
            var poll=newPoll
            poll.save(function(err){
                if(err){
                    console.log('something went wrong')
                    console.log(err)
                    res.json(err)
                }
                else{
                    console.log("this is the new poll",poll)
                    Poll.findOne({_id: newPoll.id}, function(err, poll2){
                        var newOption={option:optionUno}
                        console.log("this is optionUno", newOption)
                        poll2.option.push(newOption)
                        var newOption={option:optionDos}
                        console.log("this is optionDos, newOption")
                        poll2.option.push(newOption)
                        var newOption={option:optionTres}
                        console.log("this is optionTres", newOption)
                        poll2.option.push(newOption)
                        var newOption={option:optionCuatro}
                        console.log("this is optionCuatro, newOption")
                        poll2.option.push(newOption)
                        console.log("this is the new poll", newPoll)
                        if(poll2.option.length!==4){
                            console.log("left option blank")
                            Poll.remove({_id: newPoll.id}, function(err){
                                if(err){
                                    console.log("something went wrong in polls.js newPoll")
                                    console.log(err)
                                    res.json(err)
                                }
                                else{
                                    console.log('successfully deleted poll')
                                    res.json({deleted:true})
                                }
                            })
                        }
                        else{
                            poll2.save(function(err){
                                if(err){
                                    console.log('something went wrong in polls.js newPoll')
                                    console.log(err)
                                    res.json(err)
                                }
                                else{
                                    console.log('successfully added a new poll')
                                    res.json({created:true, poll:poll2})
                                }
                            })
                        }
                    })
                }
            })
        }
        else{
            console.log('something went wrong')
            res.json(err)
        }
    },
    dashboard: function(req,res){
        Poll.find({}).sort([['date', 'ascending']]).exec(function(err, polls){
            if(err){
                console.log('something went wrong')
            }
            else{
                res.json(polls)
            }
        })
    },
    showPoll: function(req,res){
        console.log("at polls.js showPoll", req.body)
        console.log("this is req params id",req.params.id)
        Poll.find({_id:req.params.id}, function(err, polls){
              if(err){
                  console.log('something went wrong in polls.js showPoll')
              }
              else{
                 res.json(polls)
             }
        })
    },
    vote: function(req,res){
        console.log("at polls.js vote", req.body)
        console.log("this is req poll id", req.body.poll_id)
        console.log("this is req option id", req.body.option_id)
        Poll.findOne({_id: req.body.poll_id}, function(err, option){
            console.log("this is option", option);
            console.log("This is option.option", option.option)
            for(var i=0; i<option.option.length; i++){
                if(option.option[i]._id==req.body.option_id){
                    option.option[i].votes += 1;
                    option.save(function(err){
                        if(err){
                            console.log("something went wrong in polls.js vote")
                            console.log(err)
                            res.json(err)
                        }
                        else{
                            console.log('successfully added a vote')
                            res.json({created:true, option:option})
                            }
                    })
                }
            }
        })
    },
    delete: function(req,res){
        console.log("at polls.js delete", req.body)
        console.log("this is req params id", req.params.id)
        Poll.remove({_id: req.params.id}, function(err){
            if(err){
                console.log("something went wrong in polls.js delete")
                console.log(err)
                res.json(err)
            }
            else{
                console.log('successfully deleted poll')
                res.json({deleted:true})
            }
        })
    },
}
