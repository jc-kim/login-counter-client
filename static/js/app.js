var codeToMsg = {
  "-1": "The user name should be 5~20 characters long. Please try again.",
  "-2": "The password should be 8~20 characters long. Please try again.",
  "-3": "This user name already exists. Please try again.",
  "-4": "Invalid username and password combination. Please try again. "
};

var app = angular.module('app', []);

app.controller('loginController', ['$scope', '$http', function($scope, $http) {
  $scope.loginInfo = null;
  $scope.alert = null;

  var loginCallback = function(data) {
    if('error_code' in data) {
      $scope.alert = codeToMsg[data['error_code']];
      return;
    }
    $scope.loginInfo = {
      username: data['user_name'],
      login_count: data['login_count']
    };
    $scope.username = null;
    $scope.password = null;
    $scope.alert = null;
  };

  var fullUrl = function(url) {
    if(url[0] != '/') url = '/' + url
    return API_ROOT + url;
  }

  $scope.login = function(username, password) {
    $http.post(fullUrl('/login'), {
      username: $scope.username,
      password: $scope.password
    }).success(loginCallback);
  };

  $scope.signup = function(username, password) {
    $http.post(fullUrl('/signup'), {
      username: $scope.username,
      password: $scope.password
    }).success(loginCallback);
  };

  $scope.closeAlert = function() {
    $scope.alert = null;
  };

  $scope.logout = function() {
    $scope.loginInfo = null;
  };
}]);
