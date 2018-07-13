angular.module('controllers', [])
.factory('Toast', function () {
    return {
        showToast: function (message, duration) {
            Materialize.toast(
                message,
                duration || 5000,
                'rounded custom-toast'
            );
        }
    };
})

.controller('SplashScreenCtrl', ['$scope', function($scope) {

   	$scope.params = {
      'data': {
         'duration' : 5000,
         //'backgroundImage' : 'img/background/31.jpg',
         'logo' : 'img/logo/login-shop.png',
         'redirectTo' : '/leftMenu'
       },
      'theme' : "layout1"
    }
}])

.controller('WizardCtrl', ['$scope', '$location', function($scope, $location) {
	$scope.params = {
	   'data': {
	     'containerBodyImage': 'img/background/31.jpg',
	     'btnPrev': 'Previous',
	     'btnNext': 'Next',
	     'btnFinish': 'Finish',
	     'items': [
		 {
		   logo: '',
		   iconSlider: 'icon-star-outline',
		   title: 'Fragment Example 1',
		   description: 'Text for Fragment Example 1 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		   buttonNext: 'Next'
		 },
		 {
		   logo: '',
		   iconSlider: 'icon-star-half',
		   title: 'Fragment Example 2',
		   description: 'Text for Fragment Example 2 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		   buttonNext: 'Next',
		   buttonPrevious: 'Previous'
		  },
		  {
		   logo: '',
		   iconSlider: 'icon-star',
		   title: 'Fragment Example 3',
		   description: 'Text for Fragment Example 3 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		   buttonPrevious: 'Previous',
		   buttonFinish: 'Finish'

		   }
		    ]
		  },
	     'events' : {
		 onFinish: function() {
		 $location.path("/login");
		}
	      },
	    'theme' : "layout1"
	    }
}])

.controller('loginCtrl', ['$scope', 'Toast', '$location', function($scope, Toast, $location) {
  let user_id = localStorage.getItem('id');
  let username = localStorage.getItem('username');
  if(user_id) {
    Toast.showToast("Welcome back, "+username+"!");
    $location.path("/leftMenu");
  }

 	$scope.params = {
	    'items': {
			logo : "img/logo/login-shop.png",
            username: 'Username',
            password: 'Password',
            skip: 'Skip',
            register: 'Register',
            login: 'Login',
            facebook: 'Facebook',
            twitter: 'Twitter',
            google: 'Google',
            pinterest: 'Pinterest',
            signInWith: 'Or sign in with:'
	    },
	    'theme' : "layout3", 
	    'events' : {
		    onLogin: function(params) {
          $.ajax({
              type: 'POST',
              url: 'http://houseofwellbeing.systems/index.php/api/user/login',
              data: params, 
              crossDomain: true,
              dataType: 'json',
              success: function (data) {
                if(data.error) {
                  Toast.showToast(data.error);
                }
                if(data.token) {
                  let decoded = jwt_decode(data.token);
                  //console.log(decoded);
                  if(decoded.image) {
                    localStorage.setItem('image', 'http://houseofwellbeing.systems/assets/uploads/images/'+decoded.image);
                  } else {
                    localStorage.setItem('image', 'img/logo/login-register.png');
                  }

                  localStorage.setItem('username', decoded.username);
                  localStorage.setItem('email', decoded.email);
                  localStorage.setItem('doctor_id', decoded.doctor_id);
                  localStorage.setItem('id', decoded.id);
                  Toast.showToast('Logged in successfully!.');
                  location.reload();
                  //$location.path("/leftMenu");
                }
              },
              error: function (responseData, textStatus, errorThrown) {
                Toast.showToast('POST failed.');
              }
          });
          
        },
        onRegister: function(params) {
            $location.path("/register");
        },
      }
  	};
}])

.controller('LogoutCtrl', ['$scope', 'Toast', '$location', function($scope, Toast, $location) {
  localStorage.removeItem('id');
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  location.reload();
}])

.controller('registerCtrl', ['$scope', 'Toast', '$location', function($scope, Toast, $location) {
  $scope.params = {
      'items': {
        logo : "img/logo/login-shop.png",
        iconAccount: 'icon-account',
        iconAccountMultiple: 'icon-account-multiple',
        iconHome: 'icon-home-variant',
        iconCity: 'icon-city',
        iconWeb: 'icon-web',
        button: 'submit',
        skip: 'already registered ?', 
        username: 'Username',
        password: 'Password',
        address: 'Address',
        city: 'City',
        state: 'State'
      },
      'theme' : "layout1", 
      'events' : {
        onSkip: function(params) {
          $location.path("/login");
        },
        onRegister: function(params) {
          $.ajax({
              type: 'POST',
              url: 'http://houseofwellbeing.systems/index.php/api/user/register',
              data: params, 
              crossDomain: true,
              dataType: 'json',
              success: function (data) {
                if(data.error) {
                  Toast.showToast(data.error);
                }
                if(data.token) {
                  let decoded = jwt_decode(data.token);
                  //console.log(decoded);
                  localStorage.setItem('username', decoded.username);
                  localStorage.setItem('email', decoded.email);
                  localStorage.setItem('id', decoded.id);
                  
                  Toast.showToast('Logged in successfully!.');
                  location.reload();
                  //$location.path("/leftMenu");
                }
              },
              error: function (responseData, textStatus, errorThrown) {
                Toast.showToast('POST failed.');
              }
          });
        },
      }
    };
}])

.controller('LeftMenuCtrl', ['$scope', 'Toast', '$location', function($scope, Toast, $location) {
  let user_id = localStorage.getItem('id');
  if(!user_id) {
    Toast.showToast("You are logged out!");
    $location.path("/login");
  }

 	$scope.params = {
	    'items': {
	      title: localStorage.getItem('username'),
	      description: localStorage.getItem('email'),
	      image: localStorage.getItem('image'),
	      containerBodyImage:  "img/background/31.jpg",
	      items: [
	        {
	          icon: "icon-newspaper",
	          pagePath : "templates/newsTips.html",
	          title: "Tips/News"
	        },
	        {
	          icon: "icon-currency-usd",
	          pagePath : "templates/paymentHistory.html",
	          title: "Payment History"
	        },
          {
            icon: "icon-package",
            pagePath : "templates/classes.html",
            title: "Classes"
          },
          {
            icon: "icon-food",
            pagePath : "templates/meals.html",
            title: "Meals"
          }, 
          {
            icon: "icon-eye",
            pagePath : "templates/leftMenuPage2.html",
            title: "Subscribe"
          }, 
          {
            icon: "icon-logout",
            pagePath : "templates/logout.html",
            title: "Logout"
          }
	      ]
	    },
	    'theme' : "layout1"
  	};
}])

.controller('ParallaxCtrl', ['$scope', function($scope) { 
  $scope.params = {
    'data': {
          headerImage: 'img/background/14.jpg',
          containerBodyImage : 'img/background/31.jpg',
          title: 'ArtistName',
          iconLike: 'icon-thumb-up',
          iconFavorite: 'icon-heart',
          iconShare: 'icon-share-variant',
          iconSkipPrevious: 'icon-skip-previous',
          iconPlay: 'icon-play',
          iconSkipNext: 'icon-skip-next',
          items: [
              {
                  id: 1,
                  title: 'SongName',
                  description: 'ArtistName',
                  image: 'img/avatar/0.jpg',
                  imageAlt: 'avatar',
                  icon: 'icon-heart-outline',
                  duration: '3:42'
              },
              {
                  id: 2,
                  title: 'SongName',
                  description: 'ArtistName',
                  image: 'img/avatar/1.jpg',
                  imageAlt: 'avatar',
                  icon: 'icon-heart-outline',
                  duration: '3:42'
              },
              {
                  id: 3,
                  title: 'SongName',
                  description: 'ArtistName',
                  image: 'img/avatar/2.jpg',
                  imageAlt: 'avatar',
                  icon: 'icon-heart-outline',
                  duration: '3:42'
              },
              {
                  id: 4,
                  title: 'SongName',
                  description: 'ArtistName',
                  image: 'img/avatar/3.jpg',
                  imageAlt: 'avatar',
                  icon: 'icon-heart-outline',
                  duration: '3:42'
              },
              {
                  id: 5,
                  title: 'SongName',
                  description: 'ArtistName',
                  image: 'img/avatar/4.jpg',
                  imageAlt: 'avatar',
                  icon: 'icon-heart-outline',
                  duration: '3:42'
              },
              {
                  id: 6,
                  title: 'SongName',
                  description: 'ArtistName',
                  image: 'img/avatar/5.jpg',
                  imageAlt: 'avatar',
                  icon: 'icon-heart-outline',
                  duration: '3:42'
              },
              {
                  id: 7,
                  title: 'SongName',
                  description: 'ArtistName',
                  image: 'img/avatar/6.jpg',
                  imageAlt: 'avatar',
                  icon: 'icon-heart-outline',
                  duration: '3:42'
              },
              {
                  id: 8,
                  title: 'SongName',
                  description: 'ArtistName',
                  image: 'img/avatar/7.jpg',
                  imageAlt: 'avatar',
                  icon: 'icon-heart-outline',
                  duration: '3:42'
              },
              {
                  id: 9,
                  title: 'SongName',
                  description: 'ArtistName',
                  image: 'img/avatar/1.jpg',
                  imageAlt: 'avatar',
                  icon: 'icon-heart-outline',
                  duration: '3:42'
              },
              {
                  id: 10,
                  title: 'SongName',
                  description: 'ArtistName',
                  image: 'img/avatar/2.jpg',
                  imageAlt: 'avatar',
                  icon: 'icon-heart-outline',
                  duration: '3:42'
              },
              {
                  id: 11,
                  title: 'SongName',
                  description: 'ArtistName',
                  image: 'img/avatar/0.jpg',
                  imageAlt: 'avatar',
                  icon: 'icon-heart-outline',
                  duration: '3:42'
              },
              {
                  id: 12,
                  title: 'SongName',
                  description: 'ArtistName',
                  image: 'img/avatar/3.jpg',
                  imageAlt: 'avatar',
                  icon: 'icon-heart-outline',
                  duration: '3:42'
              }
          ]
    },
    'events' : {
        onPlay: function(item) {
        },
        onNext: function(item) {
        },
        onPrevious: function(item) {
        },
        onLike: function(item) {
        },
        onFavorite: function(item) {
        },
        onShare: function(item) {
        },
        onItemClick: function(item) {
        }
    },
    'theme' : "layout1"
  };
}])

.controller('GoogleListCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.params = {
    'data': {
        title: 'PlaylistName',
        description: 'Author:Username',
        containerBodyImage: 'img/background/31.jpg',
        duration: '35:72',
        refreshMessage : 'Pull to refresh...',
        items: [
            {
                id: 1,
                title: 'Atrist Name',
                image: 'img/avatar-small/0.jpg',
                description: 'Birth year: 1984',
                shortDescription: 'Country: Germany',
                longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
                iconLike: 'icon-thumb-up',
                iconFavorite: 'icon-heart',
                iconShare: 'icon-share-variant'
            },
            {
                id: 2,
                title: 'Atrist Name',
                image: 'img/avatar-small/1.jpg',
                description: 'Birth year: 1980',
                shortDescription: 'Country: Germany',
                longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
                iconLike: 'icon-thumb-up',
                iconFavorite: 'icon-heart',
                iconShare: 'icon-share-variant'
            },
            {
                id: 3,
                title: 'Atrist Name',
                image: 'img/avatar-small/2.jpg',
                description: 'Birth year: 1984',
                shortDescription: 'Country: Germany',
                longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
                iconLike: 'icon-thumb-up',
                iconFavorite: 'icon-heart',
                iconShare: 'icon-share-variant'
            },
            {
                id: 4,
                title: 'Atrist Name',
                image: 'img/avatar-small/3.jpg',
                description: 'Birth year: 1984',
                shortDescription: 'Country: Germany',
                longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
                iconLike: 'icon-thumb-up',
                iconFavorite: 'icon-heart',
                iconShare: 'icon-share-variant'
            },
            {
                id: 5,
                title: 'Atrist Name',
                image: 'img/avatar-small/4.jpg',
                description: 'Birth year: 1984',
                shortDescription: 'Country: Germany',
                longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
                iconLike: 'icon-thumb-up',
                iconFavorite: 'icon-heart',
                iconShare: 'icon-share-variant'
            },
            {
                id: 6,
                title: 'Atrist Name',
                image: 'img/avatar-small/5.jpg',
                description: 'Birth year: 1984',
                shortDescription: 'Country: Germany',
                longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
                iconLike: 'icon-thumb-up',
                iconFavorite: 'icon-heart',
                iconShare: 'icon-share-variant'
            },
            {
                id: 7,
                title: 'Atrist Name',
                image: 'img/avatar-small/6.jpg',
                description: 'Birth year: 1984',
                shortDescription: 'Country: Germany',
                longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
                iconLike: 'icon-thumb-up',
                iconFavorite: 'icon-heart',
                iconShare: 'icon-share-variant'
            },
            {
                id: 8,
                title: 'Atrist Name',
                image: 'img/avatar-small/7.jpg',
                description: 'Birth year: 1984',
                shortDescription: 'Country: Germany',
                longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do',
                iconLike: 'icon-thumb-up',
                iconFavorite: 'icon-heart',
                iconShare: 'icon-share-variant'
            }
        ]
    },
    'events' : {
        onLike: function(item) {
            Toast.showToast('Like ' + item.id);
        },
        onFavorite: function(item) {
            Toast.showToast('Favorite ' + item.id);
        },
        onShare: function(item) {
            Toast.showToast('Share ' + item.id);
        },
        doRefresh: function () {
          $timeout(function () {
            $rootScope.$broadcast('scroll.refreshComplete');
          }, 2000);
        }
    },
    'theme' : "layout1"
  }
}])


.controller('NewsListCtrl', ['$scope', 'Toast', '$rootScope', function($scope, Toast, $rootScope) {
    $.ajax({
        type: 'GET',
        url: 'http://houseofwellbeing.systems/index.php/api/user/posts',
        crossDomain: true,
        dataType: 'json',

        async: false,
        success: function (data) {
          //console.log(data);
          if(data.error) {
            Toast.showToast(data.error);
          } else {          
            loadNewsTips($scope, data);
          }
        },
        error: function (responseData, textStatus, errorThrown) {
          Toast.showToast('POST failed.');
        }
    });
}])



.controller('PaymentHistoryCtrl', ['$scope', 'Toast', '$rootScope', function($scope, Toast, $rootScope) {
    $.ajax({
        type: 'GET',
        url: 'http://houseofwellbeing.systems/index.php/api/user/payments?user_id='+localStorage.getItem('id'),
        crossDomain: true,
        dataType: 'json',

        async: false,
        cache: false,
        timeout: 30000,
        success: function (data) {
          //console.log(data);

          if(data.error) {
            Toast.showToast(data.error);
          } else {
            loadPaymentHistory($scope, data);            
          }
        },
        error: function (responseData, textStatus, errorThrown) {
          Toast.showToast('POST failed.');
        }
    });
}])

.controller('ClassesCtrl', ['$scope', 'Toast', '$rootScope', function($scope, Toast, $rootScope) {

    $.ajax({
        type: 'GET',
        url: 'http://houseofwellbeing.systems/index.php/api/user/classes?doctor_id='+localStorage.getItem('doctor_id'),
        crossDomain: true,
        dataType: 'json',

        async: false,
        cache: false,
        timeout: 30000,
        success: function (data) {
          //console.log(data);
          if(data.error) {
            Toast.showToast(data.error);
          } else {
            loadClasses($scope, data);            
          }
        },
        error: function (responseData, textStatus, errorThrown) {
          Toast.showToast('POST failed.');
        }
    });
}])

.controller('MealsCtrl', ['$scope', 'Toast', '$rootScope', function($scope, Toast, $rootScope) {

    $.ajax({
        type: 'GET',
        url: 'http://houseofwellbeing.systems/index.php/api/user/meal',
        crossDomain: true,
        dataType: 'json',

        async: false,
        cache: false,
        timeout: 30000,
        success: function (data) {
          //console.log(data);
          if(data.error) {
            Toast.showToast(data.error);
          } else {
            loadMeals($scope, data);            
          }
        },
        error: function (responseData, textStatus, errorThrown) {
          Toast.showToast('POST failed.');
        }
    });
}])


// Custom functions 
function loadNewsTips($scope, data) {
  var items = [];
  $.each(data, function(index, value) {
    items.push({
      id: value.id,
      title: value.title,
      avatar: 'img/logo/login-register.png',
      image: 'http://houseofwellbeing.systems/uploads/blog/'+value.image,
      description: value.post, 
      shortDescription: convertDate(value.created, 1), //November 05, 1955
      firstButton: 'LIKE',
      secondButton: 'FOLLOW',     
    }); 

  });


  $scope.params = {
  'data': {
      refreshMessage : 'Pull to refresh...',
      items: items, 
      hidden: true 
  },
  'events' : {
      onLike: function(item) {
          Toast.showToast('Like ' + item.id);
      },
      onFavorite: function(item) {
          Toast.showToast('Favorite ' + item.id);
      },
      onShare: function(item) {
          Toast.showToast('Share ' + item.id);
      },
      doRefresh: function () {
        $timeout(function () {
          $rootScope.$broadcast('scroll.refreshComplete');
        }, 2000);
      }
    },
    'theme' : "layout3"
  }
}

function loadPaymentHistory($scope, data) {

    var items_1 = [];
    $.each(data, function(index, value) {
      
      items_1.push(
      {
          title: convertDate(value.date, 2), 
          icon: 'icon-home-variant', 
          items: [{
              description: value.pc, 
              iconHome: 'icon-home-variant', 
              iconWalk: 'icon-walk', 
              price: '$'+value.amount, 
              title: value.id
            }]
        }
      ); 
    });

    var group = {
        title: '',
        icon: 'icon-home-variant',
        items: []
    };

    var item = {
        title: '',
        description: '3:30min walking tour',
        price: '112$',
        iconWalk: 'icon-walk',
        iconHome: 'icon-home-variant'

    };
    
    

    $scope.params = {
    'data': {
        item: item,
        group: group,
        containerBodyImage: 'img/background/31.jpg',
        duration: '35:72',
        refreshMessage : 'Pull to refresh...',
        items: items_1
    },
    'events' : {
        doRefresh: function () {
          $timeout(function () {
            $rootScope.$broadcast('scroll.refreshComplete');
          }, 2000);
        }
    },
    'theme' : "layout4"
  }
}

function loadClasses($scope, data) {

    var items = [];
    var items_ = [];

    $.each(data, function(index, value) {
      
      items_.push(
      {
        description: value.membership_period + ' Days', 
        iconHome: 'icon-home-variant', 
        iconWalk: 'icon-walk', 
        price: '$'+value.membership_amount, 
        title: value.name
        }
      ); 
    });

    console.log(items_);


    var group = {
        title: '',
        icon: 'icon-home-variant',
        items: []
    };

    var item = {
        title: '',
        description: '3:30min walking tour',
        price: '112$',
        iconWalk: 'icon-walk',
        iconHome: 'icon-home-variant'

    };

    items = [
        {
          title: 'Packages', 
          icon: 'icon-home-variant', 
          items: items_
        }
    ];

    $scope.params = {
    'data': {
        item: item,
        group: group,
        containerBodyImage: 'img/background/31.jpg',
        duration: '35:72',
        refreshMessage : 'Pull to refresh...',
        items: items
    },
    'events' : {
        doRefresh: function () {
          $timeout(function () {
            $rootScope.$broadcast('scroll.refreshComplete');
          }, 2000);
        }
    },
    'theme' : "layout4"
  }
}


function loadMeals($scope, data) {

  items = [];
  $.each(data, function(index, value) {
    if(value.image)
    var image = 'http://houseofwellbeing.systems/assets/uploads/images/'+value.image;
    else 
    var image = 'img/background/no-image.jpeg';

    items.push(
        {
          id: value.id,
          title: value.title,
          image: image,
          description: value.prescription,
          shortDescription: 'Calories: '+value.calories,
          longDescription: 'Days: '+value.days,
          iconLike: 'icon-thumb-up',
          iconFavorite: 'icon-heart',
          iconShare: 'icon-share-variant'
        }
      );
  });

  $scope.params = {
    'data': {
        title: 'PlaylistName',
        description: 'Author:Username',
        containerBodyImage: 'img/background/31.jpg',
        duration: '35:72',
        refreshMessage : 'Pull to refresh...',
        items: items
    },
    'events' : {
        onLike: function(item) {
            Toast.showToast('Like ' + item.id);
        },
        onFavorite: function(item) {
            Toast.showToast('Favorite ' + item.id);
        },
        onShare: function(item) {
            Toast.showToast('Share ' + item.id);
        },
        doRefresh: function () {
          $timeout(function () {
            $rootScope.$broadcast('scroll.refreshComplete');
          }, 2000);
        }
    },
    'theme' : "layout1"
  }
}

function showLoader() {
  $(".spinner").removeClass('hide');
}

function hideLoader() {
  setTimeout(function () {
      $(".spinner").addClass('hide');
  }, 1000);
}

function htmlEncode(value){
  // Create a in-memory div, set its inner text (which jQuery automatically encodes)
  // Then grab the encoded contents back out. The div never exists on the page.
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}

function convertDate(userDate, format=0) 
{
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  var date = new Date(userDate);
  if(format==1) {
    yr      = date.getFullYear(),
    day     = date.getDate()  < 10 ? '0' + date.getDate()  : date.getDate(),
    newDate = monthNames[date.getMonth()] + ' ' + day + ',' + yr;
    return newDate;
  }

  if(format==2) {
    yr      = date.getFullYear(),
    day     = date.getDate()  < 10 ? '0' + date.getDate()  : date.getDate(),
    newDate = monthNames[date.getMonth()] + ' ' + yr;
    return newDate;
  }

  yr      = date.getFullYear(),
  month   = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
  day     = date.getDate()  < 10 ? '0' + date.getDate()  : date.getDate(),
  newDate = yr + '-' + month + '-' + day;
  return newDate;
}

$(document).ready(function () {
  $(document).ajaxStart(function () {
    showLoader();
  }).ajaxStop(function () {
    hideLoader();
  });
});