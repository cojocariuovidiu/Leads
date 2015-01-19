(function (window, angular) {  'use strict';

  angular
    .module('app.services')
    .factory('attributeSvc', ['$resource', function($resource){

      var Attribute = $resource( '/api/attributes/:id', {id: '@id'},{
        update: { method: 'PUT' },
        save  : { method: 'POST'}
      });

      // speedy attribute lookup for form reference
      Attribute.trackingTypes = [
        {type: 'Phone'},
        {type: 'Email'},
        {type: 'Visit'},
        {type: 'Meeting'},
        {type: 'Cold Call'},
        {type: 'Interest'},
        {type: 'Research'},
        {type: 'Accept'},
        {type: 'Decline'}
      ];
      Attribute.reminderTypes = [
        {type: 'Phone'},
        {type: 'Email'},
        {type: 'Meet'},
        {type: 'ToDo'},
        {type: 'Finish'}
      ];
      Attribute.ranks = [
        {rank: 'Hot'},
        {rank: 'Warm'},
        {rank: 'Cool'},
        {rank: 'Cold'},
        {rank: 'Dead'}
      ];

      return Attribute;

  }]);

})(window, window.angular);

