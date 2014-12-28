(function (window, angular) {  'use strict';

  angular
    .module('app.services')
    .factory('leadSvc', ['$resource', function($resource){

      var Lead = $resource('/api/leads/:id', {id: '@id'},{
        update: { method: 'PUT' },
        save  : { method: 'POST'},
        delete: { method: 'DELETE'}
      });
      Lead.prototype.update = function() {
        return this.$update({id: this._id});
      };
      Lead.prototype.remove = function () {
        return this.$delete({id: this._id});
      };
      Lead.trackingTypes = [
        {type: 'Phone'},
        {type: 'Email'},
        {type: 'Visit'},
        {type: 'Meeting'},
        {type: 'Cold Call'},
        {type: 'Interest'},
        {type: 'Accept'},
        {type: 'Decline'}
      ];

      Lead.leadTypes = [
        {type: 'None'},
        {type: 'Doctor'},
        {type: 'Dentist'},
        {type: 'Business'},
        {type: 'Private'},
        {type: 'Realtor'},
        {type: 'Office'},
        {type: 'Gallery'}
      ];

      return Lead;
  }]);

})(window, window.angular);

