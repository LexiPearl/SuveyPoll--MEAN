app.controller('loginController', ['$scope', 'userFactory', '$http', '$location', '$cookies', function ($scope, userFactory, $http, $location, $cookies) {
    $scope.newPoll={}
    $scope.polls=[]
    userFactory.getPolls(function(polls){
        $scope.polls=polls
    })
    console.log("these are the cookies", $cookies)
    var cookieJar=$cookies.getAll();
    $scope.cookies=cookieJar
    console.log("this is cookieJar", cookieJar)
    $scope.user={}
    if(!cookieJar.name){
        $location.url('/')
    }
    $scope.loginUser = function (){
        console.log($scope.user.name + ' is trying to login');
        userFactory.login($scope.user, function(data){
            if (data.data.logged_in){
                console.log("in userFactory.login successful");
                $cookies.put('id', data.data.user._id);
                $cookies.put('name', data.data.user.name);
                $location.url('/dashboard')
            }
            else{
                console.log("in userFactory.login unsuccessful");
                alert('Please enter a valid name');
            }
        });
    };
    $scope.pollInfo=function(poll_id){
        $location.url('/poll/'+poll_id)
};
$scope.addPoll = function (){
    console.log("you are in the login Controller at addPoll!")
    console.log("this is scope new appointment!",$scope.newPoll)
    console.log(cookieJar.name)
    var name=cookieJar.name
    console.log("new poll.option1", $scope.newPoll.optionUno)
    console.log("new poll.option2", $scope.newPoll.optionDos)
    console.log("new poll.option3", $scope.newPoll.optionTres)
    console.log("new poll.option4", $scope.newPoll.optionCuatro)
     if (!$scope.newPoll.question){
        alert('question must be at least 8 characters')
    }
    else if ($scope.newPoll.question.length < 8){
        alert('question must be at least 8 characters')
    }
     if (!$scope.newPoll.optionUno){
        alert('option 1 must be at least 3 characters')
    }
    else if ($scope.newPoll.optionUno.length < 3){
        alert('option 1 must be at least 3 characters')
    }
    else if (!$scope.newPoll.optionDos){
        alert('option 2 must be at least 3 characters')
    }
    else if ($scope.newPoll.optionDos.length < 3){
        alert('option 2 must be at least 3 characters')
    }
    else if (!$scope.newPoll.optionTres){
        alert('option 3 must be at least 3 characters')
    }
    else if ($scope.newPoll.optionTres.length < 3){
        alert('option 3 must be at least 3 characters')
    }
    else if (!$scope.newPoll.optionCuatro){
        alert('option 4 must be at least 3 characters')
    }
    else if ($scope.newPoll.optionCuatro.length < 3){
        alert('option 4 must be at least 3 characters')
    }
    else{
        userFactory.newPoll($scope.newPoll, name, function(message){
            if (message.created){
                console.log("I AM CONSOLE LOGGING MESSAGE", message)
                console.log( "message specifics", message.message)
                $scope.newPoll={}
                userFactory.getPolls(function(messages){
                    $scope.polls=messages
                })
                $location.url('/dashboard')
            }
            else{
                alert('please recheck your entries')
            }
        })
    }
};
    $scope.delete=function(poll_id){
        console.log("this is the poll id in loginController delete", poll_id)
        userFactory.delete(poll_id, function(message){
            if(message.deleted){
                console.log("I am console logging message in loginController cancel", message)
                console.log("The appointment was deleted!")
                userFactory.getPolls(function(polls){
                    $scope.polls=polls
                })
                $location.url('/dashboard')
            }
        })
    };
    $scope.logout=function(){
        console.log('log me out');
        $cookies.remove('name');
        $cookies.remove('id');
        $location.url('/');
    }
}]);
