function ServicesCtrl($scope, $http){
    console.log("Hello From ServiceController");
    //$scope.message = "Hello World From Controller";
 
    $scope.renderServiceClients = function (response) {
        $scope.serviceClients = response;
    };

    $scope.all = function () {
        //get all
        $http.get("/serviceClients").success($scope.renderServiceClients);
    };
    
    $scope.create = function () {
        $http.post("/serviceClients", $scope.serviceClient)
        .success(function (response) {
            $scope.all();
        });       
    };


    $scope.remove = function (id) {
        $http.delete("/serviceClients/" + id)
        .success(function (response) {
            $scope.all();
        });
    };

    $scope.select = function (id) {
        $http.get("/serviceClients/" + id)
        .success(function (response) {
            $scope.serviceClient = response;
        });
    };

    $scope.update = function () {
        $http.put("/serviceClients/" + $scope.serviceClient._id, $scope.serviceClient)
        .success(function (response) {
            $scope.all();
        });
    };









    $scope.all();
}