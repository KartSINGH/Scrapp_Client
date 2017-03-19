var app = angular.module('scrapp', ['ui.router', 'angular-loading-bar']);

app.config(function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.spinnerTemplate = '<div class="se-pre-con" ></div>';
}])
app.config(function (cfpLoadingBarProvider, $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {


    $locationProvider.hashPrefix('');

    $stateProvider

        .state('raise-request', {
            url: "/Step2",
            templateUrl: "./reqForm.html",
            controller: "step2Control"
        })
        .state('otp-enter', {
            url: "./otp-enter",
            templateUrl: "/templates/otp_in.html",
            controller: "otpControl"
        })
        .state('raise-request.subs', {
            url: "/",
            templateUrl: "templates/form.html",
            controller: 'formCtrl'

        })
        .state('raise-request.subsPricing', {
            url: "/pricing",
            templateUrl: "templates/pricing.html",
            controller: 'PriceCtrl'

        })
        .state('raise-request.submitted', {
            url: "/submitted",
            templateUrl: "templates/request_submitted.html",
            controller: 'SubmitedCtrl'

        })
        .state('MainCtrl', {
            url: "/",
            templateUrl: "./templates/frontPage.html",
            controller: "MainCtrl"

        })
});
app.controller('SubmitedCtrl',function($scope){
console.log("Final Submission done");
});
app.controller('MainCtrl', function ($rootScope, $scope, $state, $http) {
    angular.element(document).ready(function () {
       console.log("hello");
    });
    $scope.verify = function () {
        $rootScope.phone_no = $scope.phone_no;
        console.log($scope.phone_no);

        $http({
            method: 'POST',
            url: 'https://sendotp.msg91.com/api/generateOTP',
            headers: {
                "application-Key": "w7gEzSbCuU7xnHloQyf1Cq8SFtbEBOq0aShp5EVo2iJ6-IleyhL7ZVCIIGasO2_EfcDk-4YgwahdGaTQf9nRSD3KIflNgjB0QKyqAEGgUlhfQPwSHp4HqzlabTtSiYydAZafinYK8GsUudgYOkQeXw=="
            },
            data: {
                countryCode: 91,
                mobileNumber: $scope.phone_no,
                getGeneratedOTP: true
            }
        }).then(function (data) {

            $rootScope.s_otp = data.data.response.oneTimePassword;
            console.log($rootScope.s_otp);

            $state.go("otp-enter");


        }, function (error) {
            console.log("error");
            alert("error occured");
        })





    }

});
app.controller("step2Control", function ($scope) {

});
app.controller("PriceCtrl", function ($scope) {
    console.log("priceControl");

});

app.controller("formCtrl", function ($scope, $rootScope, $http,$state) {
    console.log('form controller called');

    $scope.signup = function () {
        $rootScope.User = $scope.User;
        console.log($rootScope.User);
        $http({
            method: 'POST',
            url: 'http://localhost:7000/raise-request/submit-request',
            data: {
                phone_number: $rootScope.phone_no,
                user_email: $scope.User.email,
                user_name: $scope.User.name,
                res_address: $scope.User.res_address,
                scrap_amount: $scope.User.scrap_amount,
                time: $scope.User.time
            },
           
        }).then(function (data) {
            $state.go('raise-request.submitted');
        }, function (data) {
            alert(data);
            console.log(data);
        })

    }
});

app.controller("otpControl", function ($scope, $rootScope, $state) {

    $scope.verify1 = function () {
        var u_otp = $scope.otp;
        console.log("User otp is : " + " " + $scope.otp);

        console.log($rootScope.s_otp);
        if (u_otp == $rootScope.s_otp) {
            $state.go("raise-request.subs");
        } else {
            alert("WRONG OTP");
        }
    }

    console.log('otp controller called');

    $scope.verify = function () {
        
   $state.go('MainCtrl');





    }




});