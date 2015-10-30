(function ___d1007_assistant___(ns) {
   ns.UI_Base = new ns.Class(
     {
       initialize: function(element) {
         this.el = element;
         this.showed = false;
         // alert('ui_base');
       },
       html: function(val) {
         this.el.html(val);
       },
       __show: function() {
         this.el.show();
         return true;
       },
       __hide: function() {
         this.el.hide();
         return true;
       },
       show: function() {
         if(this.showed) return;
         this.showed = this.__show();
       },
       hide: function() {
         if(!this.showed) return;
         this.showed = ! this.__hide();
       },
       toggle: function() {
         return this.showed ? this.hide() : this.show();
       }
     });

   ns.UI_CardManager = ns.UI_Base.extend(
     {
       initialize: function(element) {
         this.parent(element);

         this.cards = {};
         this.last_card = null;
         // alert('cardmanager');
       },
       add_card: function(card_name, card_el) {
         this.cards[card_name] = card_el;
       },
       switch_card: function(card_name) {
         if (this.last_card != null) {
           if (card_name == this.last_card) return;
           this.cards[this.last_card].hide();
         }
         this.cards[card_name].fadeIn('slow');
         this.last_card = card_name;
       }
     });


   // One-Stop Center
   ns.OSC =  ns.UI_CardManager.extend(
     {
       initialize: function() {
         this.parent.apply(this, arguments);
         this.duration = 'normal';
         this.keyboard = new ns.Keyboard();

         this.content_loaded = false;
         var _i = this;
         this.trigger = $('#btn-osc');
         this.trigger.bind('click', function() {_i.toggle();});
       },
       __show: function() {
         var _i = this;
         $('#osc .panel').css('visibility','hidden');
         $('#osc').slideDown(this.duration);
         var p = ns.position('#osc');
         // 高度只有在 .panel 完全展开后才能取得，故使用人工采集值
         $('#fx_heler_box').css(ns.position('#btn-osc')).show()
           .animate({width:p.width,height:432,top:p.top,left:p.left,opacity:0}, this.duration,
                    function() {
                      $('#fx_heler_box').hide();
                      $('#osc .panel').css('visibility','visible');
                      $('#osc .panel').fadeIn('slow');

                      if (! _i.content_loaded) _i.load_content();

                    });
         return true;
       },
       __hide: function() {
         $('#osc .panel').css('visibility','hidden');
         var p = ns.position('#osc');
         p.opacity = 1;
         $('#osc').slideUp(this.duration);
         $('#fx_heler_box').css(p).show()
           .animate(ns.position('#btn-osc'), this.duration,
                    function() {
                      $('#fx_heler_box').hide();
                      //$('#osc .panel').css('visibility','visible');
                      //$('#osc .panel').fadeIn('slow');
                    });
         return true;
       },
       switch_keyboard: function(keymap) {
         this.keyboard.use_keymap(keymap);
         this.switch_card('main_keyboard');
         this.keyboard.ui_ready(true);
       },
       load_content: function() {
         $('#osc .panel .body').append('<div class="loading card"></div>');
         this.add_card('loading', $('#osc .loading'));
         this.switch_card('loading');
         var _i = this;
         $.ajax({
                  type: "GET",
                  url: '/osc/contents/',
                  success: function(c) {
                    $('#osc .panel .body').append(c);
                    _i.add_card('main_keyboard', $('#main_keyboard'));
                    _i.switch_keyboard(keymap_home);

                    _i.content_loaded = true;
                  },
                  error: function(c) {alert(c);}
                });
       }
     });


   ns.Keyboard = new ns.Class(
     {
       initialize: function() {
         this._ui_ready = false;
         this.keymap = null;
         this.bind_events();
       },
       bind_events: function() {
         var keys = ['0','1','2','3','4','5','6','7','8','9'];
         var _i = this;

         $('li#da_key_0').bind('click',   function (evt) {return _i.on_keyup  (evt, '0');});
         $(document).bind('keydown', '0', function (evt) {return _i.on_keydown(evt, '0');});
         $(document).bind('keyup',   '0', function (evt) {return _i.on_keyup  (evt, '0');});

         $('li#da_key_1').bind('click',   function (evt) {return _i.on_keyup  (evt, '1');});
         $(document).bind('keydown', '1', function (evt) {return _i.on_keydown(evt, '1');});
         $(document).bind('keyup',   '1', function (evt) {return _i.on_keyup  (evt, '1');});

         $('li#da_key_2').bind('click',   function (evt) {return _i.on_keyup  (evt, '2');});
         $(document).bind('keydown', '2', function (evt) {return _i.on_keydown(evt, '2');});
         $(document).bind('keyup',   '2', function (evt) {return _i.on_keyup  (evt, '2');});

         $('li#da_key_3').bind('click',   function (evt) {return _i.on_keyup  (evt, '3');});
         $(document).bind('keydown', '3', function (evt) {return _i.on_keydown(evt, '3');});
         $(document).bind('keyup',   '3', function (evt) {return _i.on_keyup  (evt, '3');});

         $('li#da_key_4').bind('click',   function (evt) {return _i.on_keyup  (evt, '4');});
         $(document).bind('keydown', '4', function (evt) {return _i.on_keydown(evt, '4');});
         $(document).bind('keyup',   '4', function (evt) {return _i.on_keyup  (evt, '4');});

         $('li#da_key_5').bind('click',   function (evt) {return _i.on_keyup  (evt, '5');});
         $(document).bind('keydown', '5', function (evt) {return _i.on_keydown(evt, '5');});
         $(document).bind('keyup',   '5', function (evt) {return _i.on_keyup  (evt, '5');});

         $('li#da_key_6').bind('click',   function (evt) {return _i.on_keyup  (evt, '6');});
         $(document).bind('keydown', '6', function (evt) {return _i.on_keydown(evt, '6');});
         $(document).bind('keyup',   '6', function (evt) {return _i.on_keyup  (evt, '6');});

         $('li#da_key_7').bind('click',   function (evt) {return _i.on_keyup  (evt, '7');});
         $(document).bind('keydown', '7', function (evt) {return _i.on_keydown(evt, '7');});
         $(document).bind('keyup',   '7', function (evt) {return _i.on_keyup  (evt, '7');});

         $('li#da_key_8').bind('click',   function (evt) {return _i.on_keyup  (evt, '8');});
         $(document).bind('keydown', '8', function (evt) {return _i.on_keydown(evt, '8');});
         $(document).bind('keyup',   '8', function (evt) {return _i.on_keyup  (evt, '8');});

         $('li#da_key_9').bind('click',   function (evt) {return _i.on_keyup  (evt, '9');});
         $(document).bind('keydown', '9', function (evt) {return _i.on_keydown(evt, '9');});
         $(document).bind('keyup',   '9', function (evt) {return _i.on_keyup  (evt, '9');});
       },
       use_keymap: function(keymap) {
         $('ul.main_keyboard li>div').html('');
         for (x in keymap) {
           $('li#da_key_'+x+' div').html(keymap[x][0]);
         }
         this.keymap = keymap;
       },
       ui_ready: function(value) {
         if (value != undefined) this._ui_ready = value;
         return this._ui_ready;
       },
       on_keydown: function(evt, keycode) {
         // var keycode2 = evt.data.combi;
         $('li#da_key_'+keycode).addClass('keydown');
         return false;
       },
       on_keyup: function(evt, keycode) {
         // var keycode2 = evt.data.combi;
         $('li#da_key_'+keycode).removeClass('keydown');
         if(this.keymap == null || ns.undef(keycode, this.keymap))
           return false;

         this.keymap[keycode][1]();
         return false;
       }
     });



   var da;

   var keymap_home = {
     '1':['积分查询', function(){ns.debug('积分查询'); da.switch_keyboard(keymap_point); }],
     '2':['最新营销活动', function(){ns.debug('最新营销活动');}],
     '3':['业务办理', function(){ns.debug('业务办理');}],
     '4':['使用意见', function(){ns.debug('使用意见');}],
     '0':['人工服务', function(){ns.debug('人工服务');}]
   };

   var keymap_point = {
     '1':['积分查询一', function(){ns.debug('积分查询一');}],
     '2':['查询二', function(){ns.debug('查询二');}],
     '0':['返回', function(){ns.debug('返回'); da.switch_keyboard(keymap_home); }]
   };


   function init() {
     da = new ns.OSC($('#osc'));
   }

   jQuery(function(){
            init();
          });
 })(Namespace);


$(function ___lib___() {
    return;
    heeei.Person = function(name, age) {
      this.name = name;
      this.age  = age;
    };
    heeei.Person.prototype = {
      getName: function(prefix) {
        prefix = prefix || 'I am ';
        return prefix + this.name;
      },
      getAge: function() {
        return this.age;
      },
      intro: function() {
        return this.getName() + this.getAge();
      }
    };

    heeei.Coder = function(name, age, code) {
      heeei.Person.apply(this, arguments);
      heeei.Coder.__super__  =  heeei.Person.prototype;
      this.code = code;
    };
    heeei.Coder.prototype = {
      intro: function() {
        return this.code + '_' + heeei.Coder.__super__.intro.apply(this);
      }
    };

    var p = new heeei.Person('person', 18);
    alert(p.intro());
    var lot = new heeei.Coder('lot', 20, 'A007');
    alert(lot.intro());

    return;
    //heeei.position('#wm_livehelp');
    $('#wm_livehelp .panel').css('visibility','hidden');
    $('#wm_livehelp').slideDown('slow');
    $('#fx_heler_box').css(heeei.position('#btn_livehelp')).show()
      .animate({width:725,height:432,top:112,left:438}, 'slow',
               function() {
                 $('#fx_heler_box').hide();
                 $('#wm_livehelp .panel').css('visibility','visible');
                 $('#wm_livehelp .panel').fadeIn('slow');
                 // $('#fx_heler_box').fadeOut(
                 //   function(){
                 //     $('#wm_livehelp .panel').css('visibility','visible');

                 //   });
               });

    aide.addCard('menu_index', $('#menu_index'));
    aide.switch_menu_card('keymap_index');



   dojo.inherits  =   function (subclass, superclass)  {
     if ( typeof  superclass  !=  ' function ')  {
       dojo.raise( " superclass:  " + superclass + "  borken " );
     }
     subclass.prototype  =   new  superclass();
     subclass.prototype.constructor  =  subclass;
     subclass.superclass  =  superclass.prototype;
     //  DEPRICATED: super is a reserved word, use 'superclass'
     subclass['super']  =  superclass.prototype;
   } ;

  });



