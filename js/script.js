window.addEventListener('DOMContentLoaded', () => {

    const tabs = require('../js/modules/tabs'),
          cards = require('../js/modules/cards'),
          forms = require('../js/modules/forms'),
          modal = require('../js/modules/modal'),
          slider = require('../js/modules/slider'),
          calculation =require('../js/modules/calculation'),
          timer = require('../js/modules/timer');


     tabs();
     modal();
     cards();
     forms();
     slider();
     calculation();
     timer();     

})  
