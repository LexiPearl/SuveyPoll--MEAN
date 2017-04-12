app.controller('pollController', ['$scope', 'userFactory', '$http', '$location', '$cookies', '$routeParams', '$route', function ($scope, userFactory, $http, $location, $cookies, $routeParams, $route) {
    $scope.pollInfo={}
    $scope.newPoll={}
    $scope.polls=[]
    var cookieJar=$cookies.getAll();
    if(!cookieJar.name){
        $location.url('/')
    }
    $scope.pollInformation=function(){userFactory.pollInformation($routeParams.id, function(messages){
        if (messages){
            console.log("I AM CONSOLE LOGGING MESSAGE", messages)
            console.log( "poll specifics", messages)
            console.log(messages[0])
            $scope.pollInfo=messages[0]
            console.log("this is scope.pollInfo", $scope.pollInfo)
        }
    })};
    $scope.pollInformation()
    $scope.addVote=function(option_id){
        console.log("you are in the poll Controller at addVote")
        console.log("this is scope.pollInfo",$scope.pollInfo)
        var poll_id=$scope.pollInfo._id
        userFactory.addVote(poll_id, option_id, function(message){
            if(message.created){
                console.log("I am console logging message in addVote", message)
                $scope.pollInformation();
            }
            else{
                console.log("addVote route worked in pollController")
                $route.reload();
            }
        })
    };
    $scope.logout=function(){
        console.log('log me out');
        $cookies.remove('id');
        $cookies.remove('name');
        $location.url('/');
    }
}]);
