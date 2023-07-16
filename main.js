$ = document.querySelector.bind(document)
$$ = document.querySelectorAll.bind(document)


const myApp = angular.module("MyApp", [])
    .service("MyService", function ($http) {
        this.getData = function () {
            return $http.get("data.json")
        }
    })
    .controller("MyCtrl", function ($scope, $http, MyService) {
        MyService.getData()
            .then(function (res) {
                $scope.countries = res.data
                $scope.regions = Array.from(new Set($scope.countries.map(country => country.region))).slice(0, 5).sort()
            })

        $scope.setFilterRegion = function (region) {
            $scope.filterRegion = region != "All" ? region : ''
        }

        $scope.darkMode = JSON.parse(localStorage.getItem("darkMode")) ? true : false
        $scope.changeStateDarkMode = function () {
            $scope.darkMode = JSON.parse(localStorage.getItem("darkMode")) ? false : true
            localStorage.setItem("darkMode", JSON.stringify($scope.darkMode))
            console.log($scope.darkMode)
        }
        $scope.setSelectedCountry = function (country) {
            localStorage.setItem("selectedCountry", JSON.stringify(country))
        }
    })
    .controller("CountryCtrl", function ($scope, $location, $window, MyService) {
        MyService.getData()
            .then(function (res) {
                $scope.countries = res.data
                if (!localStorage.getItem("selectedCountry")) {
                    $window.location.href = "index.html"
                }
                else {
                    $scope.country = JSON.parse(localStorage.getItem("selectedCountry"))
                    if ($scope.country.borders) {
                        $scope.borderCountries = $scope.countries.filter(country => $scope.country.borders.includes(country.alpha3Code))
                    }
                }
            })
        
    })