(function (window, angular) {  'use strict';

  angular
    .module('app')
    .factory('attributeSvc', ['$resource', function($resource){

      var Attribute = $resource( '/api/attributes/:id', {id: '@id'},{
        update: { method: 'PUT' },
        save  : { method: 'POST'}
      });
      Attribute.trackingTypes = [
        {type: 'Phone'},
        {type: 'Email'},
        {type: 'Visit'},
        {type: 'Meeting'},
        {type: 'Cold Call'},
        {type: 'Interest'},
        {type: 'Accept'},
        {type: 'Decline'}
      ];

      Attribute.leadTypes = [
        {type: 'None'},
        {type: 'Doctor'},
        {type: 'Dentist'},
        {type: 'Business'},
        {type: 'Private'},
        {type: 'Realtor'},
        {type: 'Office'},
        {type: 'Gallery'}
      ];

      return Attribute;

  }]);

})(window, window.angular);

