app.factory('userFactory', ['$http', function($http){
    var users= [];
    var factory = {};
    factory.login = function(user, callback){
        console.log('user in the factory', user);
        $http.post('/login', user).then(function(response){
            console.log("response from login", response)
            callback(response)
        })
    };
    factory.pollInformation = function(id, callback){
    console.log("this is the poll id", id);
    $http.get('/poll/'+id).then(function(response){
        console.log("pollInformation route worked")
        var message=response.data
        console.log("this is response.data from pollInformation", message)
        callback(message)
        })
    };
    factory.newPoll = function(poll, name, callback){
        console.log('I am adding a poll', poll);
        console.log("this is the name for the poll", name);
        var question=poll.question
        var optionUno=poll.optionUno
        var optionDos=poll.optionDos
        var optionTres=poll.optionTres
        var optionCuatro=poll.optionCuatro
        var newPoll={name:name, question:question, optionUno:optionUno, optionDos:optionDos, optionTres:optionTres, optionCuatro:optionCuatro}
        console.log("this is the new poll in the UserFactory", newPoll)
        $http.post('/newPoll', newPoll).then(function(response){
            console.log("newPoll route worked in userFactory")
            var message=response.data
            console.log("this is response.data from newPoll", message)
            callback(message)
        })
    };
    factory.addVote = function(poll_id, option_id, callback){
        console.log("I am adding a vote")
        var vote={poll_id:poll_id, option_id:option_id}
        $http.post('/option/vote', vote).then(function(response){
            console.log("option/id/vote route worked")
            var message=response.data
            console.log("This is response.data from addVote", message)
            callback(message)
        })
    };
    factory.delete = function(poll_id, callback){
        console.log("I am deleting a poll")
        var id=poll_id
        $http.get('/poll/'+id+'/delete').then(function(response){
            console.log("poll/id/delete route worked")
            var message=response.data
            console.log("This is response.data from delete", message)
            callback(message)
        })
    };
    factory.getPolls = function (callback){
        $http.get('/dashboard').then(function(response){
            console.log("factory get messages response", response);
        var messages=response.data
        console.log("response.data", messages)
        callback(messages);
        console.log("callback messages", messages)
    })};
    return factory
}]);
