; (function () {
    'use strict';

    angular
        .module('app')
        .constant('CONSTANTS', {
            'LOGIN_URL': 'https://digitalspatial.com/cgi-bin/userbase.cgi?action=validate',
            'LOC_URL': 'http://getgeo.net/scp/getloc.php',
            'SEARCH_URL': 'http://getgeo.net/scp/search.php',
            'CHECKIN_URL': 'http://getgeo.net/scp/checkin.php',
            'NEWLOC_URL': 'http://getgeo.net/scp/newloc.php',
            'COMMENT_URL': 'http://getgeo.net/scp/comment.php',
            'X_USER_AGENT': 'AyoCustomApp/1.0',
            'KEY':'SfEhimTMHeeNBdCeOfczUowbGOyaFjWvzSHTeEhftHbqmrXEQz',
            'SESSION_KEY': 'site_session',
            'SESSION_OPTIONS': {
                'domain': '.digitalspatial.com',
                'path': '/',
                'secure': true
            },
            'CATEGORIES': [
                { id: 'Dental', name: 'Dentist', icon: 'ion-ionic' },
                { id: 'Dermatologist', name: 'Dermatologist', icon: 'ion-ionic' },
                { id: 'Dispensary', name: 'Dispensary', icon: 'ion-ionic' },
                { id: 'Federal', name: 'Federal Medical Centre', icon: 'ion-ionic' },
                { id: 'General', name: 'General Hospital', icon: 'ion-ionic' },
                { id: 'Importer', name: 'Importer', icon: 'ion-ionic' },
                { id: 'Maternity', name: 'Maternity Clinic', icon: 'ion-ionic' },
                { id: 'Mega', name: 'Mega Distribution', icon: 'ion-ionic' },
                { id: 'Optician', name: 'Optician', icon: 'ion-ionic' },
                { id: 'Paediatric', name: 'Paediatric', icon: 'ion-ionic' },
                { id: 'PMS', name: 'Patent Medical Store', icon: 'ion-ionic' },
                { id: 'Pharma ', name: 'Pharma Logistics', icon: 'ion-ionic' },
                { id: 'Pharmacy', name: 'Pharmacy', icon: 'ion-ionic' },
                { id: 'PHC', name: 'Primary Health Care Centre', icon: 'ion-ionic' },
                { id: 'Private', name: 'Private Hospital', icon: 'ion-ionic' },
                { id: 'Public', name: 'Public Teaching Hospital', icon: 'ion-ionic' },
                { id: 'Wholesaler', name: 'Wholesaler', icon: 'ion-ionic' },
            ],
            'COMMENT_OPTIONS': [
                { name: 'CLOSED DOWN', value: 'CLOSED DOWN' },
                { name: 'NO LONGER RELEVANT', value: 'NO LONGER RELEVANT' },
                { name: 'MOVED', value: 'MOVED' },
                { name: 'MORIBOUND', value: 'MORIBOUND' },
                { name: 'PREMISE REGISTRATION CHALLENGES', value: 'PREMISE REGISTRATION CHALLENGES' }
            ],
            'MAP_DEFAULTS': {
                zoomControlPosition: 'topleft',
                zoom: 10,
                userIcon: {
                    iconUrl: 'img/ionic.png',
                    iconRetinaUrl: 'img/ionic.png',
                    iconSize: [38, 95],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76],
                    shadowUrl: 'img/ionic.png',
                    shadowRetinaUrl: 'img/ionic.png',
                    shadowSize: [68, 95],
                    shadowAnchor: [22, 94]
                }
            }
        });

})();
