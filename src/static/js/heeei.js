// -*- coding: utf-8 -*-
var heeei = Namespace = {version:1.0};


(function Core(ns){
   ns.undef = function(/*String*/ name, /*Object?*/ object){
     //summary: Returns true if 'name' is defined on 'object' (or globally if 'object' is null).
     //description: Note that 'defined' and 'exists' are not the same concept.
     return (typeof (object || window)[name] == "undefined"); // Boolean
   };

   var Global = {};
   ns.set = function(key, value) { Global[key] = value; };
   ns.get = function(key, default_value) { return ns.undef(key, Global) ? (typeof default_value == "undefined" ? null : default_value) : Global[key]; };

   ns.debug = function () {
     ns.debug = ns.get('debug', false) ? function() {
       if(window.console) console.log.apply(this, arguments);
     } : function() {};
     return ns.debug.apply(this, arguments);
   };

   ns.iEnum = function() { // return a enum object. >> enum=$e('SYSTEM_MESSAGE', 'SYSTEM_ERROR');
     var _enum = {};
     for(var i=0,l=arguments.length; i<l; i++)
       _enum[arguments[i]] = i+1;
     return _enum;
   };

   ns.rndUrl = function() {
     //$.browser.msie
     return '?'+(new Date()).getTime();
   };

   ns.lang = (navigator.systemLanguage || navigator.userLanguage || navigator.language || navigator.browserLanguage || '').replace(/-.*/,'');

   /*
    Function: type (From: mootools)
    Returns the type of object that matches the element passed in.

    Arguments:
    obj - the object to inspect.

    Example:
    >var myString = 'hello';
    >$type(myString); //returns "string"

    Returns:
    'element' - if obj is a DOM element node
    'textnode' - if obj is a DOM text node
    'whitespace' - if obj is a DOM whitespace node
    'array' - if obj is an array
    'object' - if obj is an object
    'string' - if obj is a string
    'number' - if obj is a number
    'boolean' - if obj is a boolean
    'function' - if obj is a function
    false - (boolean) if the object is not defined or none of the above.
    */
   ns.type = function(obj){
     if (obj === null || obj === undefined) return false;
     var type = typeof obj;
     if (type == 'object'){
       if (obj.htmlElement) return 'element';
       if (obj.push) return 'array';
       if (obj.nodeName){
         switch (obj.nodeType){
         case 1: return 'element';
         case 3: return obj.nodeValue.test(/\S/) ? 'textnode' : 'whitespace';
         }
       }
     }
     return type;
   };

   /*
    ns.extend = function(){
    var args = arguments;
    args = (args[1]) ? [args[0], args[1]] : [this, args[0]];
    for (var property in args[1]) args[0][property] = args[1][property];
    return args[0];
    };
    ns.clone = function(obj){
    var cloned = {};
    ns.extend(cloned, obj);
    return cloned;
    };
    */

   /*
    Class: Class
    The base class object of the <http://mootools.net> framework.

    Arguments:
    properties - the collection of properties that apply to the class. Creates a new class, its initialize method will fire upon class instantiation.

    Example:
    (start code)
    var Cat = new heeei.Class({
    initialize: function(name){
    this.name = name;
    }
    });
    var myCat = new Cat('Micia');
    alert (myCat.name); //alerts 'Micia'
    (end)
    */

   ns.Class = function(properties){
     var klass = function(){
       if (this.initialize && arguments[0] != 'noinit') return this.initialize.apply(this, arguments);
       else return this;
     };
     for (var property in this) klass[property] = this[property];
     klass.prototype = properties;
     return klass;
   };

   ns.Class.prototype = {

     /*
      Property: extend
      Returns the copy of the Class extended with the passed in properties.

      Arguments:
      properties - the properties to add to the base class in this new Class.

      Example:
      (start code)
      var Animal = new heeei.Class({
      initialize: function(age){
      this.age = age;
      }
      });
      var Cat = Animal.extend({
      initialize: function(name, age){
      this.parent(age); //will call the previous initialize;
      this.name = name;
      }
      });
      var myCat = new Cat('Micia', 20);
      alert (myCat.name); //alerts 'Micia'
      alert (myCat.age); //alerts 20
      (end)
      */

     extend: function(properties){
       var pr0t0typ3 = new this('noinit');

       var parentize = function(previous, current){
         if (!previous.apply || !current.apply) return false;
         return function(){
           this.parent = previous;
           return current.apply(this, arguments);
         };
       };

       for (var property in properties){
         var previous = pr0t0typ3[property];
         var current = properties[property];
         if (previous && previous != current) current = parentize(previous, current) || current;
         pr0t0typ3[property] = current;
       }
       return new ns.Class(pr0t0typ3);
     },

     /*
      Property: implement
      Implements the passed in properties to the base Class prototypes, altering the base class, unlike <Class.extend>.

      Arguments:
      properties - the properties to add to the base class.

      Example:
      (start code)
      var Animal = new heeei.Class({
      initialize: function(age){
      this.age = age;
      }
      });
      Animal.implement({
      setName: function(name){
      this.name = name
      }
      });
      var myAnimal = new Animal(20);
      myAnimal.setName('Micia');
      alert(myAnimal.name); //alerts 'Micia'
      (end)
      */

     implement: function(){
       for(var i=0, l=arguments.length; i<l; i++){
         var properties = arguments[i];
         for (var property in properties)
           this.prototype[property] = properties[property];
       }
     }
     /*
      ,
      mixin: function() {
      var base_init = this.prototype.initialize;
      for(var i=0, l=arguments.length; i<l; i++){
      var klass = arguments[i];

      if (!ns.undef('initialize', klass)) {
      var obj_init = klass.initialize;
      this.implement(
      {
      initialize: function() {
      base_init.apply(this, arguments);
      obj_init.apply(this, arguments);
      }
      });
      delete klass.initialize;
      }
      this.implement(klass);
      }
      return this;
      }
      */
   };

 })(Namespace);


(function UIHelper(ns){
   var MT = ns.iEnum('Loading', 'TimeOut', 'Error', 'Growl', 'Hover', 'Stop', 'Resume'); // Message Type
   var MT_last;

   ns.set('MessageType', MT);

   function getMousePosition(e){
     var x = 0, y = 0;
     e = e || window.event;
     if (e.pageX || e.pageY) {
       x = e.pageX;
       y = e.pageY;
     } else if (e.clientX || e.clientY) {
       x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
       y = e.clientY + document.body.scrollTop  + document.documentElement.scrollTop;
     }
     return { 'x': x, 'y': y };
   }

   ns.position = function(el) {
     var e = $(el);
     var p = e.offset();
     return {
       width: e.outerWidth(),
       height: e.outerHeight(),
       top: p.top,
       left: p.left
     };
   };

   ns.UI = new ns.Class(
     {
       initialize: function(element) {
         this.element = element;
         this.showed = false;
       },
       html: function(value) {
         this.element.html(value);
       },
       _show: function() {
         this.element.show();
       },
       show: function() {
         if(this.showed) return;
         this._show();
         this.showed = true;
       },
       _hide: function() {
         this.element.hide();
       },
       hide: function() {
         if(!this.showed) return;
         this._hide();
         this.showed = false;
       },
       toggle: function() {
         if (this.showed) {
           this.hide();
         } else {
           this.show();
         }
       }
     });

   var TipPanel = ns.UI.extend(
     {
       show_at_mouse: function(msg, e) {
         var pos = getMousePosition(e);
         this.element.css({left: pos.x+16, top:pos.y+24});
         this.html(msg);
         this.show();
       }
     });

   var page_tippanel = new TipPanel($('#page_tippanel'));
   heeei.set('page_tippanel', page_tippanel);

   var page_message = function (msg, type, sp) {
     if (msg=='') { $('#page_message').fadeOut(); return; }
     MT_last = type;
     switch(type) {
     case MT.Loading:
       $('#page_message').show();
       $('#page_message .message').html(msg);
       break;

     case MT.Growl:
     case MT.TimeOut:
       $('#page_message').show();
       $('#page_message .message').html(msg);
       setTimeout ( function(){$('#page_message').fadeOut();}, sp || 5000 );
       break;

     case MT.Error:
       $('#page_message').show();
       $('#page_message .message').html(msg);
       break;

     case MT.Hover:
       sp.hover(
         function (e) {
           page_tippanel.show_at_mouse('Ctrl + Enter', e);
         },
         function () {
           page_tippanel.hide();
         }
       );
       break;

     case MT.Stop:
       $('#page_message .message').html(msg);
       $('#page_message').show();
       break;

     case MT.Resume:
       if (MT_last != MT.Stop) return;
       page_message(msg, MT.Timeout);
       break;

     default:
       alert(msg);
     }
   };
   heeei.set('message', page_message);
 })(Namespace);


(function WebMessager(ns){
   // Interface of wm
   ns.wm_front = {
     init: wm_init,
     reply: reply,
     pause: pause
   };

   // import jQuery
   var $ = jQuery,
   MT = ns.get('MessageType'),
   message = ns.get('message'),

   WM_members = {},
   WM_join_url, WM_update_url, WM_post_url, WM_vote_url,
   WM_ui,

   WM_Conected = false,
   WM_update_interval = 5000,
   WM_update_demon = null,
   WM_update_demon_started = false,

   WM_user_last_input = null,

   ChatroomEventType = {
     'Open': 1,
     'Close': 2,
     'Join': 10,
     'Quit': 11,
     'Post': 20
   },
   ChatroomEventTypeStr = {
     '1': 1,
     '2': 2,
     '10': '进入',
     '11': 'Quit',
     '20': '发言'
   },
   UI = {},
   WM_UI_LIST = ['WMChatroomUI', 'WMLivehelpUI'];

   UI.WMLivehelpUI = ns.UI.extend(
     {
       initialize: function() {
         this.parent($('#wm_livehelp'));
         this.duration = 'slow';
         var self = this;

         $('#btn_livehelp').bind('click', toggle_livehelp_window);
         $('#btn_close_livehelp').bind('click', toggle_livehelp_window);

         this.ratepanel = new ns.UI($('#wm_ratepanel'));
         this.chatpanel = new ns.UI($('#wm_chatpanel'));

         this.chatpanel._show = function() {
           this.element.fadeIn('slow');
         };
         this.chatpanel.show();

         $('#wm_livehelp .return').bind('click',
                                        function(){
                                          start_viewupdate_demon();
                                          self.ratepanel.hide();
                                          self.chatpanel.show();
                                          return false;
                                        });
         message('快捷键 Ctrl + Enter :P', MT.Hover, $('#fm_wm_submit'));
       },
       _show: function() {
         //ns.position('#wm_livehelp');
         $('#wm_livehelp .panel').css('visibility','hidden');
         $('#wm_livehelp').slideDown(this.duration);
         var p = ns.position('#wm_livehelp');
         // 高度只有在 .panel 完全展开后才能取得，故使用人工采集值
         $('#fx_heler_box').css(ns.position('#btn_livehelp')).show()
           .animate({width:p.width,height:432,top:p.top,left:p.left}, this.duration,
                    function() {
                      $('#fx_heler_box').hide();
                      $('#wm_livehelp .panel').css('visibility','visible');
                      $('#wm_livehelp .panel').fadeIn('slow');
                    });
       },
       _hide: function() {
         $('#wm_livehelp .panel').css('visibility','hidden');
         var p = ns.position('#wm_livehelp');
         $('#wm_livehelp').slideUp(this.duration);
         $('#fx_heler_box').css(p).show()
           .animate(ns.position('#btn_livehelp'), this.duration,
                    function() {
                      $('#fx_heler_box').hide();
                      //$('#wm_livehelp .panel').css('visibility','visible');
                      //$('#wm_livehelp .panel').fadeIn('slow');
                    });
       },
       toggle: function() {
         if (!WM_Conected) connect();
         else {
           if (this.showed) {
             this.hide();
             stop_viewupdate_demon();
           } else {
             this.show();
             start_viewupdate_demon();
           }
         }
       },
       render_post: function(data) {
         var conents = data.contents;
         var r = '';
         for (var i=0,l=conents.length; i<l; i++) {
           c = conents[i];
           if (c.type=='greeting') {
             alert('not imp greeting conents!');
           } else {
             r += '<div class="post_info">';
             r += '<span class="author"><a title="'+c.author+'" href="/user/3890688/">'+c.author+'</a> : </span>';
             r += '<span class="timestamp">'+c.created+'</span>';
             r += '</div>';
             r += '<div class="post_content">'+c.content+'</div>';
           }
         }
         return r;
       },
       update: function (data) {
         $('#wm_updated').val(data.wm_updated);
         $('#wm_status span').text(data.wm_status);
         $('#wm_message span').html(data.wm_updated);

         //$('#wm_posts').append(TrimPath.processDOMTemplate("wm_post_jst", data));
         $('#wm_posts').append(this.render_post(data));

         if (!ns.undef('csr', data)) {
           var csr = data.csr;
           $('.csr_avatar').attr('src', csr.avatar_url);
           $('.csr_name').text(csr.name);
           $('.csr_position').text(csr.position);
           $('.csr_sn').text(csr.sn);
         }
         this.update_vote(data);
       },
       update_vote: function(data) {
         if (!ns.undef('vote', data)) {
           var self = this;
           var vote = data.vote;
           $('#wm_ratepanel_body').html(vote.content);
           if (!vote.voted) {
             // in vote form
             // $('#fm_wm_vote_uid').val(4);
             $('.vote').rating(
               {
                 container: $('#wm_rate_star'),
                 required: true,
                 callback: function(value, link){self.switch_to_ratepanel();}
               });
             $('#wm_vote_form').submit(submit_vote_form);
           } else {
             $('#wm_rate_star').empty().append(
               $('<b class="stars star_' + vote.my_vote + '"><b></b></b>')
                 .bind('click', function(){self.switch_to_ratepanel();}));
           }
         }
       },
       switch_to_ratepanel: function() {
         this.chatpanel.hide();
         this.ratepanel.show();
         stop_viewupdate_demon();
       }
     });
   function toggle_livehelp_window(a,b,c,d) {
     WM_ui.toggle();
     return false;
   }
   function submit_vote_form() {
     message('正在保存数据，请稍候 :) ...', MT.Loading);
     var data = $('#wm_vote_form').serialize();
     ns.debug(data);
     $.ajax({
              type: "POST",
              url: WM_vote_url+ns.rndUrl(),
              data: data,
              dataType: "json",
              success: function(data){
                WM_ui.update_vote(data);
                message('好了，谢谢您的评价', MT.TimeOut);
              },
              error: function(data){
                message('保存失败，请检查网络连接 :(', MT.TimeOut);
              }
            });

     return false;
   }
   // -------------------------------------------------------------------------
   UI.WMChatroomUI = new ns.Class(
     {
       initialize: function() {
         this.element = $('#wm_chatroom');
         this.user_panel = new WMUserPanel();
       },
       hide: function() {},
       show: function() {},
       update: function (data) {
         $('#wm_updated').val(data.wm_updated);
         $('#wm_status span').text(data.wm_status);
         $('#wm_message span').html(data.wm_updated);
         //$('#wm_posts').append(TrimPath.processDOMTemplate("wm_post_jst", data));
         $('#wm_posts').append(this.render_post(data));
         this.user_panel.sync_members(data);
         //this.user_panel.process_events(data);
       },
       render_post: function(data) {
         var conents = data.contents;
         var r = '';
         for (var i=0,l=conents.length; i<l; i++) {
           c = conents[i];
           if (c.type=='greeting') {
             alert('not imp greeting conents!');
           } else {
             r += '<div class="post_info">';
             r += '<span class="author"><a title="'+c.author+'" href="/user/3890688/">'+c.author+'</a> : </span>';
             r += '<span class="timestamp">'+c.created+'</span>';
             r += '</div>';
             r += '<div class="post_content">'+c.content+'<a href="javascript:heeei.wm_front.reply('+c.pid+');">回复</a></div>';
           }
         }
         return r;
       }
     });
   var WMUserPanel = new ns.Class(
     {
       initialize: function() {
         this.members = {};
         this.member_count = 0;
         this.panel = $('#wm_userpanel');

         $('.wm_helperpanel .close').bind('click',cancel_reply);
       },
       process_for_output: function(member) {
         member.datetime = member.timestamp;
         member.typestr = ChatroomEventTypeStr[member.type];
         return member;
       },
       sync_members: function(/*Json*/ wm_json_response) {
         if (ns.undef('members', wm_json_response)) return;
         var members=wm_json_response.members;
         var members_keys = {};
         var _members = this.members;

         for (uid in members) {
           var member = members[uid];
           if (ns.undef(uid, _members)) {
             this.add_member(member);
           } else {
             if (member.timestamp != _members[uid].timestamp) {
               _members[uid] = this.process_for_output(member);
               $('#usercard_'+uid+' .last_action_time').text(member.datetime);
               $('#usercard_'+uid+' .last_action_type').text(member.typestr);
             }
           }
         }
         for (uid in _members) {
           var member = _members[uid];
           if (ns.undef(uid, members)) {
             this.rm_member(member);
           }
         }
         this.update_membersnum();
       },
       update_membersnum: function() {
         $('.wm_chatroom_members_count').text(this.member_count);
       },
       add_member: function(/*Json*/ member) {
         this.member_count ++;
         member = this.process_for_output(member);
         this.members[member.user_id] = member;
         //var html = TrimPath.processDOMTemplate("wm_usercard_jst", member);
         var html = this.render_usercard(member);
         this.panel.append(html);
       },
       rm_member: function(/*Json*/ member) {
         uid = member.user_id;
         delete this.members[uid];
         this.member_count--;
         usercard = $('#usercard_'+uid);
         usercard.fadeOut();
         usercard.remove();
       },
       process_events: function(/*Json*/ wm_json_response) {
         if (!ns.undef('events', wm_json_response)) {
           for(var i=0, events=wm_json_response.events, l=events.length; i<l; i++) {
             var e = events[i];
             var d = e.timestamp;
             var n = e.username;
             var uid = e.user_id;

             var message;
             switch(e.type) {
             case ChatroomEventType.Join:
               this.add_member(e);
               message = d+" : "+n+' 进入了聊天室。';
               break;
             case ChatroomEventType.Quit:
               this.rm_member(uid);
               message = d+" : "+n+' 离开了聊天室。';
               break;
             }
             $('#debug').append('<div>'+message+'</div>');
           }
         }
       },
       render_usercard: function(data) {
         var m = data;
         var r = '';
         r += '<li class="usercard" id="usercard_'+m.user_id+'">';
         r += '<b class="icon"></b>';
         r += '<a class="arrow" href="#menu">&gt;</a>';
         r += '<a class="name" href="#profile">'+m.username+'</a>';
         r += '<span class="last_action_time">'+m.datetime+'</span>';
         r += '<span class="last_action_type">'+m.typestr+'</span>';
         r += '</li>';
         return r;
       }
     });

   function reply(uid) {
     $('#fm_wm_reply').val(uid);
     //alert($('#fm_wm_reply').val());
     var username = $('#usercard_'+uid+' .name').text();
     $('.wm_helperpanel .contents').text('您正在回复: '+username);
     $('.wm_helperpanel').show();
   }
   function cancel_reply() {
     //alert(uid);
     $('#fm_wm_reply').val('');
     $('.wm_helperpanel').hide();
   }
   // -------------------------------------------------------------------------



   function wm_init() {
     WM_join_url   = ns.get('home' ,'') + ns.get('wm_join_url' ,'/wm/join-livehelp/');
     WM_update_url = ns.get('home' ,'') + ns.get('wm_update_url' ,'/wm/update-livehelp-');
     WM_post_url   = ns.get('home' ,'') + ns.get('wm_post_url' ,'/wm/post-in-livehelp-');
     WM_vote_url   = ns.get('home' ,'') + ns.get('wm_vote_url' ,'/voting/user/');
     WM_ui         = new (UI[WM_UI_LIST[ns.get('wm_ui', 1)]])();
     if (ns.get('wm_auto_connect', false)) connect();
   }
   // -------------------------------------------------------------------------
   function connect() {
     if(WM_Conected) return;
     message('正在连接,请稍候 :) ...', MT.Loading);
     $.ajax({
              type: "GET",
              url: WM_join_url+ns.rndUrl(),
              dataType: "json",
              success: connect_success,
              error: connect_error
            });
   }
   function connect_success(data) {
     WM_Conected = true;
     WM_ui.show();
     message('连接成功', MT.TimeOut);

     var tid = data.tid;
     WM_update_url += tid + '/';
     WM_post_url += tid + '/';

     update_view(data);
     start_viewupdate_demon();

     $('#wm_chatroom_form').bind('submit', submit_wm_form);
     $(document).bind('keydown', 'Ctrl+return', submit_wm_form);
     // for debug now
     $('#btn_start_update').bind('click', start_viewupdate_demon);
     $('#btn_stop_update').bind('click', stop_viewupdate_demon);
   }
   function connect_error(data) {
     message('连接失败 :(', MT.TimeOut);
   }
   // -------------------------------------------------------------------------
   function viewupdate_demon() {
     //$('.update_spinner').css('visibility','visible');
     $.ajax({
              type: "POST",
              url: WM_update_url+ns.rndUrl(),
              data: {
                wm_updated: $('#wm_updated').val()
              },
              dataType: "json",
              success: update_view,
              error: update_error
            });
   }
   function update_view(data) {
     //$('.update_spinner').css('visibility','hidden');
     WM_ui.update(data);
     //message('网络恢复 :)', MT.Resume);
   }
   function update_error() {
     message('网络中断，请确定网络连接后刷新本页 :(', MT.Error);
   }
   function start_viewupdate_demon() {
     if (!WM_update_demon_started) {
       WM_update_demon = setInterval(viewupdate_demon, WM_update_interval);
       WM_update_demon_started = true;
     }
   }
   function stop_viewupdate_demon() {
     if (WM_update_demon_started) {
       clearInterval(WM_update_demon);
       WM_update_demon_started = false;
     }
   }
   function change_interval_time(sec) {
     WM_update_interval = sec;
   }
   function pause() {
     stop_viewupdate_demon();
   }
   // -------------------------------------------------------------------------
   function submit_wm_form() {
     var content = $('#fm_wm_content').val();
     // 浏览器端发言策略过滤
     if (content.length < 1) {
       message('您还没有输入任何文字 :P', MT.Growl);
       return false;
     }
     if (content == WM_user_last_input) {
       message('请不要重复发言 :P', MT.Growl);
       return false;
     }
     stop_viewupdate_demon();
     message('正在发送,请稍候 :) ...', MT.Loading);
     WM_user_last_input = content;

     //if (WM_reply!=null) data.fm_wm_reply = WM_reply;
     var data = $('#wm_chatroom_form').serialize();
     ns.debug(data);
     $.ajax({
              type: "POST",
              url: WM_post_url+ns.rndUrl(),
              data: data,
              dataType: "json",
              success: submit_wm_form_success,
              error: submit_wm_form_error
            });

     return false;
   }
   function submit_wm_form_success(data) {
     message('发送成功', MT.TimeOut);
     $('#fm_wm_content').val('');
     update_view(data);
     start_viewupdate_demon();
   }
   function submit_wm_form_error(msg) {
     message('发送失败，请检查网络连接 :( ', MT.TimeOut);
   }
   // -------------------------------------------------------------------------
 })(Namespace);


(function Slide(ns){
   var $ = jQuery;

   ns.Slide = new ns.Class(
     {
       initialize: function(element) {
         this.element = element;
         this.pages = $.map($('.page', this.element),
                            function(e){
                              return $(e);
                            });
         this.pages_count = this.pages.length;
         this.current_page = 0;
         this.pages[0].show();
         this.interval_time = 5000;

         var self = this;
         this.interval_id = setInterval(
           function() {
             self.next_page();
           }, this.interval_time);
       },
       next_page: function() {
         var self = this;
         this.pages[this.current_page]
           .fadeOut('slow',
                    function() {
                      self.current_page = (self.current_page+1 < self.pages_count) ?
                        self.current_page + 1 : 0;
                      self.pages[self.current_page].fadeIn('slow');

                    });
       }
     });
 })(Namespace);


(function Tricks(ns){
   $(function() {
       // use ajax load idio links for external app like mediawiki
       if (ns.get('call_idio_links', false)) {
         $('#idio-links').load(ns.get('home' ,'') + '/api/idio-links/' + ns.rndUrl());
       }
       // apply slide
       if (ns.get('use_slide', false)) {
         $(".slide").each(
           function(){
             new ns.Slide($(this));
           });
       }
       // use accordion plugins
       var accordions_array = ns.get('apply_accordion_to', []);
       var default_accordion_options = {
         header: 'H2.drawer-handle',
         selectedClass: 'open',
         event: 'mouseover'
       };
       if (accordions_array.length > 0 ) {
         $.each(accordions_array, function(i, n){
                  $(n).accordion(default_accordion_options);
                });
       } else {
         $('.drawers').accordion(default_accordion_options);
       }



       // google ajax
       if (heeei.get('use_google_ajax_search', false)) {
         // Create a search control
         var searchControl = new google.search.SearchControl();
         var options = new GsearcherOptions();
         options.setExpandMode(GSearchControl.EXPAND_MODE_OPEN);

	 // var siteSearch = new google.search.WebSearch();
	 // siteSearch.setUserDefinedLabel("站内");
	 // siteSearch.setUserDefinedClassSuffix("siteSearch");
	 // siteSearch.setSiteRestriction("d1007.com");
	 // searchControl.addSearcher(siteSearch);

	 // site restricted web search using a custom search engine
	 siteSearch = new google.search.WebSearch();
	 siteSearch.setUserDefinedLabel("站内");
	 siteSearch.setSiteRestriction("016022322448111872611:tpssilsypio");
	 searchControl.addSearcher(siteSearch);

         // Create a WebSearcher
         var webSearch = new google.search.WebSearch();
         // Set the language to Chinese
         webSearch.setRestriction(google.search.Search.RESTRICT_EXTENDED_ARGS,
                                  {lr:'lang_zh-CN'});

         //webSearch.setUserDefinedLabel("网页");
         //searcher.setRestriction(google.search.Search.RESTRICT_SAFESEARCH,
         //                        google.search.Search.SAFESEARCH_OFF);

         searchControl.addSearcher(webSearch, options);
         //searchControl.addSearcher(new google.search.BlogSearch());

         var imageSearch = new google.search.ImageSearch();
         //imageSearch.setUserDefinedLabel("图片");
         searchControl.addSearcher(imageSearch);

         var videoSearch = new google.search.VideoSearch();
         //videoSearch.setUserDefinedLabel("视频");
         searchControl.addSearcher(videoSearch);

         // create a drawOptions object
         var drawOptions = new GdrawOptions();
         drawOptions.setDrawMode(GSearchControl.DRAW_MODE_TABBED);
         //drawOptions.setDrawMode(google.search.SearchControl.DRAW_MODE_LINEAR);
         searchControl.draw(document.getElementById("search-input"), drawOptions);
         // Execute an inital search
         //searchControl.execute("黑木耳");
       }



       if (heeei.get('use_livehelp', false)) {
         heeei.wm_front.init();
       }

       $(window).ajaxError(function(event, request, settings){
                             djangoErrorPage = request.responseText;
                             $('#debug').html(djangoErrorPage);
                             heeei.wm_front.pause();
                           });
     });
 })(Namespace);


(function jQuery_star_rating($){
   /*
    ### jQuery Star Rating Plugin v2.5 - 2008-09-10 ###
    * http://www.fyneworks.com/ - diego@fyneworks.com
    * Dual licensed under the MIT and GPL licenses:
    *   http://www.opensource.org/licenses/mit-license.php
    *   http://www.gnu.org/licenses/gpl.html
    ###
    Project: http://plugins.jquery.com/project/MultipleFriendlyStarRating
    Website: http://www.fyneworks.com/jquery/star-rating/

    Based on http://www.phpletter.com/Demo/Jquery-Star-Rating-Plugin/
    Original comments:
    This is hacked version of star rating created by <a href="http://php.scripts.psu.edu/rja171/widgets/rating.php">Ritesh Agrawal</a>
    It thansform a set of radio type input elements to star rating type and remain the radio element name and value,
    so could be integrated with your form. It acts as a normal radio button.
    modified by : Logan Cai (cailongqun[at]yahoo.com.cn)
    */

   // default settings
   $.rating = {
     cancel: 'Cancel Rating',   // advisory title for the 'cancel' link
     cancelValue: '',           // value to submit when user click the 'cancel' link
     split: 0,                  // split the star into how many parts?

     // Width of star image in case the plugin can't work it out. This can happen if
     // the jQuery.dimensions plugin is not available OR the image is hidden at installation
     starWidth: 16,

     //NB.: These don't need to be defined (can be undefined/null) so let's save some code!
     //half:     false,         // just a shortcut to settings.split = 2
     //required: false,         // disables the 'cancel' button so user can only select one of the specified values
     //readOnly: false,         // disable rating plugin interaction/ values cannot be changed
     //focus:    function(){},  // executed when stars are focused
     //blur:     function(){},  // executed when stars are focused
     //callback: function(){},  // executed when a star is clicked

     // required properties:
     groups: {},// allows multiple star ratings on one page
     event: {// plugin event handlers
       fill: function(n, el, settings, state){ // fill to the current mouse position.
         //if(window.console) console.log(['fill', $(el), $(el).prevAll('.star_group_'+n), arguments]);
         this.drain(n, el, settings);
         $(el).prevAll('.star_group_'+n).andSelf().addClass('star_'+(state || 'hover'));
         // focus handler, as requested by focusdigital.co.uk
         var lnk = $(el).children('a'); val = lnk.text();
         if(settings.focus) settings.focus.apply($.rating.groups[n].valueElem[0], [val, lnk[0]]);
       },
       drain: function(n, el, settings) { // drain all the stars.
         //if(window.console) console.log(['drain', $(el), $(el).prevAll('.star_group_'+n), arguments]);
         //$.rating.groups[n].valueElem.siblings('.star_group_'+n).removeClass('star_on').removeClass('star_hover');
         settings.container.children('.star_group_'+n).removeClass('star_on').removeClass('star_hover');
       },
       reset: function(n, el, settings){ // Reset the stars to the default index.
         if(!$($.rating.groups[n].current).is('.cancel'))
           $($.rating.groups[n].current).prevAll('.star_group_'+n).andSelf().addClass('star_on');
         // blur handler, as requested by focusdigital.co.uk
         var lnk = $(el).children('a'); val = lnk.text();
         if(settings.blur) settings.blur.apply($.rating.groups[n].valueElem[0], [val, lnk[0]]);
       },
       click: function(n, el, settings){ // Selected a star or cancelled
         $.rating.groups[n].current = el;
         var lnk = $(el).children('a'); val = lnk.text();
         // Set value
         $.rating.groups[n].valueElem.val(val);
         // Update display
         $.rating.event.drain(n, el, settings);
         $.rating.event.reset(n, el, settings);
         // click callback, as requested here: http://plugins.jquery.com/node/1655
         if(settings.callback) settings.callback.apply($.rating.groups[n].valueElem[0], [val, lnk[0]]);
       }
     }// plugin events
   };

   $.fn.rating = function(instanceSettings){
     if(this.length==0) return this; // quick fail

     var settings = $.extend(
       {}/* new object */,
       $.rating/* global settings */,
       instanceSettings || {} /* just-in-time settings */
     );

     // loop through each matched element
     this.each(function(i){
                 // Generate internal control ID
                 // - ignore square brackets in element names
                 var n = (this.name || 'unnamed-rating').replace(/\[|\]/, "_");
                 heeei.debug([this.name, settings.half, settings.split, i], '#', n);
                 // Grouping
                 if(!$.rating.groups[n]) $.rating.groups[n] = {count: 0};
                 i = $.rating.groups[n].count; $.rating.groups[n].count++;
                 heeei.debug(i);
                 // Accept readOnly setting from 'disabled' property
                 $.rating.groups[n].readOnly = $.rating.groups[n].readOnly || settings.readOnly || $(this).attr('disabled');

                 // Things to do with the first element...
                 if(i == 0){
                   // Create value element (disabled if readOnly)
                   $.rating.groups[n].valueElem = $('<input type="hidden" name="' + n + '" value=""' + (settings.readOnly ? ' disabled="disabled"' : '') + '/>');
                   // Insert value element into form
                   //settings.container.append($.rating.groups[n].valueElem);
                   $(this).before($.rating.groups[n].valueElem);

                   if($.rating.groups[n].readOnly || settings.required){
                     // DO NOT display 'cancel' button
                   }
                   else{
                     // Display 'cancel' button
                     $(this).before(
                       $('<div class="cancel"><a title="' + settings.cancel + '">' + settings.cancelValue + '</a></div>')
                         .mouseover(function(){ $.rating.event.drain(n, this, settings); $(this).addClass('star_on'); })
                         .mouseout(function(){ $.rating.event.reset(n, this, settings); $(this).removeClass('star_on'); })
                         .click(function(){ $.rating.event.click(n, this, settings); })
                     );
                   }
                 }; // if (i == 0) (first element)

                 // insert rating option right after preview element
                 eStar = $('<div class="star"><a title="' + (this.title || this.value) + '">' + this.value + '</a></div>');
                 settings.container.append(eStar);

                 // Half-stars?
                 if(settings.half) settings.split = 2;

                 // Prepare division settings
                 if(typeof settings.split=='number' && settings.split>0){
                   var stw = ($.fn.width ? $(eStar).width() : 0) || settings.starWidth;
                   var spi = (i % settings.split), spw = Math.floor(stw/settings.split);
                   $(eStar)
                   // restrict star's width and hide overflow (already in CSS)
                     .width(spw)
                   // move the star left by using a negative margin
                   // this is work-around to IE's stupid box model (position:relative doesn't work)
                     .find('a').css({ 'margin-left':'-'+ (spi*spw) +'px' });
                 };

                 // Remember group name so controls within the same container don't get mixed up
                 $(eStar).addClass('star_group_'+n);

                 // readOnly?
                 if($.rating.groups[n].readOnly)//{ //save a byte!
                   // Mark star as readOnly so user can customize display
                   $(eStar).addClass('star_readonly');
                 //}  //save a byte!
                 else//{ //save a byte!
                   $(eStar)
                 // Enable hover css effects
                   .addClass('star_live')
                 // Attach mouse events
                   .mouseover(function(){ $.rating.event.drain(n, this, settings); $.rating.event.fill(n, this, settings, 'hover'); })
                   .mouseout(function(){ $.rating.event.drain(n, this, settings); $.rating.event.reset(n, this, settings); })
                   .click(function(){ $.rating.event.click(n, this, settings); });
                 //}; //save a byte!

                 ////if(window.console) console.log(['###', n, this.checked, $.rating.groups[n].initial]);
                 if(this.checked) $.rating.groups[n].current = eStar;

                 //remove this checkbox
                 $(this).remove();

                 // reset display if last element
                 if(i + 1 == this.length) $.rating.event.reset(n, this, settings);

               }); // each element

     // initialize groups...
     for(n in $.rating.groups)//{ not needed, save a byte!
       (function(c, v, n){ if(!c) return;
                           $.rating.event.fill(n, c, instanceSettings || {}, 'on');
                           $(v).val($(c).children('a').text());
                         })
     ($.rating.groups[n].current, $.rating.groups[n].valueElem, n);
     //}; not needed, save a byte!

     return this; // don't break the chain...
   };
   //$(function(){ $('input[@type=radio].star').rating(); });
 })(jQuery);


(function ui_accordion($) {
   /*
    * Accordion 1.5 - jQuery menu widget
    *
    * Copyright (c) 2007 J枚rn Zaefferer, Frank Marcia
    *
    * http://bassistance.de/jquery-plugins/jquery-plugin-accordion/
    *
    * Dual licensed under the MIT and GPL licenses:
    *   http://www.opensource.org/licenses/mit-license.php
    *   http://www.gnu.org/licenses/gpl.html
    *
    * Revision: $Id: jquery.accordion.js 4137 2007-12-13 12:37:58Z joern.zaefferer $
    *
    */

   $.ui = $.ui || {};

   $.ui.accordion = {};
   $.extend($.ui.accordion, {
              defaults: {
                selectedClass: "selected",
                alwaysOpen: true,
                animated: 'slide',
                event: "click",
                header: "a",
                autoheight: true
              },
              animations: {
                slide: function(settings, additions) {
                  settings = $.extend({
                                        easing: "swing",
                                        duration: 300
                                      }, settings, additions);
                  if ( !settings.toHide.size() ) {
                    settings.toShow.animate({height: "show"}, settings);
                    return;
                  }
                  var hideHeight = settings.toHide.height(),
                  showHeight = settings.toShow.height(),
                  difference = showHeight / hideHeight;
                  settings.toShow.css({ height: 0, overflow: 'hidden' }).show();
                  settings.toHide.filter(":hidden").each(settings.complete).end().filter(":visible").animate({height:"hide"},{
                                                                                                               step: function(now){
                                                                                                                 settings.toShow.height((hideHeight - (now)) * difference );
                                                                                                               },
                                                                                                               duration: settings.duration,
                                                                                                               easing: settings.easing,
                                                                                                               complete: settings.complete
                                                                                                             });
                },
                bounceslide: function(settings) {
                  this.slide(settings, {
                               easing: settings.down ? "bounceout" : "swing",
                               duration: settings.down ? 1000 : 200
                             });
                },
                easeslide: function(settings) {
                  this.slide(settings, {
                               easing: "easeinout",
                               duration: 700
                             });
                }
              }
            });

   $.fn.extend({
                 accordion: function(settings) {
                   if ( !this.length )
                     return this;

                   // setup configuration
                   settings = $.extend({}, $.ui.accordion.defaults, settings);

                   if ( settings.navigation ) {
                     var current = this.find("a").filter(function() { return this.href == location.href; });
                     if ( current.length ) {
                       if ( current.filter(settings.header).length ) {
                         settings.active = current;
                       } else {
                         settings.active = current.parent().parent().prev();
                         current.addClass("current");
                       }
                     }
                   }

                   // calculate active if not specified, using the first header
                   var container = this,
                   headers = container.find(settings.header),
                   active = findActive(settings.active),
                   running = 0;

                   if ( settings.fillSpace ) {
                     var maxHeight = this.parent().height();
                     headers.each(function() {
                                    maxHeight -= $(this).outerHeight();
                                  });
                     var maxPadding = 0;
                     headers.next().each(function() {
                                           maxPadding = Math.max(maxPadding, $(this).innerHeight() - $(this).height());
                                         }).height(maxHeight - maxPadding);
                   } else if ( settings.autoheight ) {
                     var maxHeight = 0;
                     headers.next().each(function() {
                                           maxHeight = Math.max(maxHeight, $(this).outerHeight());
                                         }).height(maxHeight);
                   }

                   headers
                     .not(active || "")
                     .next()
                     .hide();
                   active.parent().andSelf().addClass(settings.selectedClass);


                   function findActive(selector) {
                     return selector != undefined
                       ? typeof selector == "number"
                       ? headers.filter(":eq(" + selector + ")")
                       : headers.not(headers.not(selector))
                     : selector === false
                       ? $("<div>")
                       : headers.filter(":eq(0)");
                   }

                   function toggle(toShow, toHide, data, clickedActive, down) {
                     var complete = function(cancel) {
                       running = cancel ? 0 : --running;
                       if ( running )
                         return;
                       if ( settings.clearStyle ) {
                         toShow.add(toHide).css({
                                                  height: "",
                                                  overflow: ""
                                                });
                       }
                       // trigger custom change event
                       container.trigger("change", data);
                     };

                     // count elements to animate
                     running = toHide.size() == 0 ? toShow.size() : toHide.size();

                     if ( settings.animated ) {
                       if ( !settings.alwaysOpen && clickedActive ) {
                         toShow.slideToggle(settings.animated);
                         complete(true);
                       } else {
                         $.ui.accordion.animations[settings.animated]({
                                                                        toShow: toShow,
                                                                        toHide: toHide,
                                                                        complete: complete,
                                                                        down: down
                                                                      });
                       }
                     } else {
                       if ( !settings.alwaysOpen && clickedActive ) {
                         toShow.toggle();
                       } else {
                         toHide.hide();
                         toShow.show();
                       }
                       complete(true);
                     }
                   }

                   function clickHandler(event) {
                     // called only when using activate(false) to close all parts programmatically
                     if ( !event.target && !settings.alwaysOpen ) {
                       active.parent().andSelf().toggleClass(settings.selectedClass);
                       var toHide = active.next();
                       var toShow = active = $([]);
                       toggle( toShow, toHide );
                       return false;
                     }
                     // get the click target
                     var clicked = $(event.target);

                     // due to the event delegation model, we have to check if one
                     // of the parent elements is our actual header, and find that
                     if ( clicked.parents(settings.header).length )
                       while ( !clicked.is(settings.header) )
                         clicked = clicked.parent();

                     var clickedActive = clicked[0] == active[0];

                     // if animations are still active, or the active header is the target, ignore click
                     if(running || (settings.alwaysOpen && clickedActive) || !clicked.is(settings.header))
                       return false;

                     // switch classes
                     active.parent().andSelf().toggleClass(settings.selectedClass);
                     if ( !clickedActive ) {
                       clicked.parent().andSelf().addClass(settings.selectedClass);
                     }

                     // find elements to show and hide
                     var toShow = clicked.next(),
                     toHide = active.next(),
                     data = [clicked, active, toShow, toHide],
                     down = headers.index( active[0] ) > headers.index( clicked[0] );

                     active = clickedActive ? $([]) : clicked;
                     toggle( toShow, toHide, data, clickedActive, down );

                     return false;
                   };
                   function activateHandler(event, index) {
                     // IE manages to call activateHandler on normal clicks
                     if ( arguments.length == 1 )
                       return;
                     // call clickHandler with custom event
                     clickHandler({
                                    target: findActive(index)[0]
                                  });
                   };

                   return container
                     .bind(settings.event || "", clickHandler)
                     .bind("activate", activateHandler);
                 },
                 activate: function(index) {
                   return this.trigger('activate', [index]);
                 },
                 unaccordion: function() {
                   return this.find("*").andSelf().unbind().end().end();
                 }
               });

 })(jQuery);


(function jQuery_hotkeys(jQuery){
   /*
    (c) Copyrights 2007 - 2008

    Original idea by by Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/

    jQuery Plugin by Tzury Bar Yochay
    tzury.by@gmail.com
    http://evalinux.wordpress.com
    http://facebook.com/profile.php?id=513676303

    Project's sites:
    http://code.google.com/p/js-hotkeys/
    http://github.com/tzuryby/hotkeys/tree/master

    License: same as jQuery license.

    USAGE:
    // simple usage
    $(document).bind('keydown', 'Ctrl+c', function(){ alert('copy anyone?');});

    // special options such as disableInIput
    $(document).bind('keydown', {combi:'Ctrl+x', disableInInput: true} , function() {});

    Note:
    This plugin wraps the following jQuery methods: $.fn.find, $.fn.bind and $.fn.unbind
    */

   // keep reference to the original $.fn.bind, $.fn.unbind and $.fn.find
   jQuery.fn.__bind__ = jQuery.fn.bind;
   jQuery.fn.__unbind__ = jQuery.fn.unbind;
   jQuery.fn.__find__ = jQuery.fn.find;

   var hotkeys = {
     version: '0.7.9',
     override: /keypress|keydown|keyup/g,
     triggersMap: {},

     specialKeys: { 27: 'esc', 9: 'tab', 32:'space', 13: 'return', 8:'backspace', 145: 'scroll',
                    20: 'capslock', 144: 'numlock', 19:'pause', 45:'insert', 36:'home', 46:'del',
                    35:'end', 33: 'pageup', 34:'pagedown', 37:'left', 38:'up', 39:'right',40:'down',
                    109: '-',
                    112:'f1',113:'f2', 114:'f3', 115:'f4', 116:'f5', 117:'f6', 118:'f7', 119:'f8',
                    120:'f9', 121:'f10', 122:'f11', 123:'f12', 191: '/'},

     shiftNums: { "`":"~", "1":"!", "2":"@", "3":"#", "4":"$", "5":"%", "6":"^", "7":"&",
                  "8":"*", "9":"(", "0":")", "-":"_", "=":"+", ";":":", "'":"\"", ",":"<",
                  ".":">",  "/":"?",  "\\":"|" },

     newTrigger: function (type, combi, callback) {
       // i.e. {'keyup': {'ctrl': {cb: callback, disableInInput: false}}}
       var result = {};
       result[type] = {};
       result[type][combi] = {cb: callback, disableInInput: false};
       return result;
     }
   };
   // add firefox num pad char codes
   //if (jQuery.browser.mozilla){
   // add num pad char codes
   hotkeys.specialKeys = jQuery.extend(hotkeys.specialKeys, { 96: '0', 97:'1', 98: '2', 99:
                                                              '3', 100: '4', 101: '5', 102: '6', 103: '7', 104: '8', 105: '9', 106: '*',
                                                              107: '+', 109: '-', 110: '.', 111 : '/'
                                                            });
   //}

   // a wrapper around of $.fn.find
   // see more at: http://groups.google.com/group/jquery-en/browse_thread/thread/18f9825e8d22f18d
   jQuery.fn.find = function( selector ) {
     this.query = selector;
     return jQuery.fn.__find__.apply(this, arguments);
   };

   jQuery.fn.unbind = function (type, combi, fn){
     if (jQuery.isFunction(combi)){
       fn = combi;
       combi = null;
     }
     if (combi && typeof combi === 'string'){
       var selectorId = ((this.prevObject && this.prevObject.query) || (this[0].id && this[0].id) || this[0]).toString();
       var hkTypes = type.split(' ');
       for (var x=0; x<hkTypes.length; x++){
         delete hotkeys.triggersMap[selectorId][hkTypes[x]][combi];
       }
     }
     // call jQuery original unbind
     return  this.__unbind__(type, fn);
   };

   jQuery.fn.bind = function(type, data, fn){
     // grab keyup,keydown,keypress
     var handle = type.match(hotkeys.override);

     if (jQuery.isFunction(data) || !handle){
       // call jQuery.bind only
       return this.__bind__(type, data, fn);
     }
     else{
       // split the job
       var result = null,
       // pass the rest to the original $.fn.bind
       pass2jq = jQuery.trim(type.replace(hotkeys.override, ''));

       // see if there are other types, pass them to the original $.fn.bind
       if (pass2jq){
         result = this.__bind__(pass2jq, data, fn);
       }

       if (typeof data === "string"){
         data = {'combi': data};
       }
       if(data.combi){
         for (var x=0; x < handle.length; x++){
           var eventType = handle[x];
           var combi = data.combi.toLowerCase(),
           trigger = hotkeys.newTrigger(eventType, combi, fn),
           selectorId = ((this.prevObject && this.prevObject.query) || (this[0].id && this[0].id) || this[0]).toString();

           //trigger[eventType][combi].propagate = data.propagate;
           trigger[eventType][combi].disableInInput = data.disableInInput;

           // first time selector is bounded
           if (!hotkeys.triggersMap[selectorId]) {
             hotkeys.triggersMap[selectorId] = trigger;
           }
           // first time selector is bounded with this type
           else if (!hotkeys.triggersMap[selectorId][eventType]) {
             hotkeys.triggersMap[selectorId][eventType] = trigger[eventType];
           }
           // make trigger point as array so more than one handler can be bound
           var mapPoint = hotkeys.triggersMap[selectorId][eventType][combi];
           if (!mapPoint){
             hotkeys.triggersMap[selectorId][eventType][combi] = [trigger[eventType][combi]];
           }
           else if (mapPoint.constructor !== Array){
             hotkeys.triggersMap[selectorId][eventType][combi] = [mapPoint];
           }
           else {
             hotkeys.triggersMap[selectorId][eventType][combi][mapPoint.length] = trigger[eventType][combi];
           }

           // add attribute and call $.event.add per matched element
           this.each(function(){
                       // jQuery wrapper for the current element
                       var jqElem = jQuery(this);

                       // element already associated with another collection
                       if (jqElem.attr('hkId') && jqElem.attr('hkId') !== selectorId){
                         selectorId = jqElem.attr('hkId') + ";" + selectorId;
                       }
                       jqElem.attr('hkId', selectorId);
                     });
           result = this.__bind__(handle.join(' '), data, hotkeys.handler);
         }
       }
       return result;
     }
   };
   // work-around for opera and safari where (sometimes) the target is the element which was last
   // clicked with the mouse and not the document event it would make sense to get the document
   hotkeys.findElement = function (elem){
     if (!jQuery(elem).attr('hkId')){
       if (jQuery.browser.opera || jQuery.browser.safari){
         while (!jQuery(elem).attr('hkId') && elem.parentNode){
           elem = elem.parentNode;
         }
       }
     }
     return elem;
   };
   // the event handler
   hotkeys.handler = function(event) {
     var target = hotkeys.findElement(event.currentTarget),
     jTarget = jQuery(target),
     ids = jTarget.attr('hkId');

     if(ids){
       ids = ids.split(';');
       var code = event.which,
       type = event.type,
       special = hotkeys.specialKeys[code],
       // prevent f5 overlapping with 't' (or f4 with 's', etc.)
       character = !special && String.fromCharCode(code).toLowerCase(),
       shift = event.shiftKey,
       ctrl = event.ctrlKey,
       // patch for jquery 1.2.5 && 1.2.6 see more at:
       // http://groups.google.com/group/jquery-en/browse_thread/thread/83e10b3bb1f1c32b
       alt = event.altKey || event.originalEvent.altKey,
       mapPoint = null;

       for (var x=0; x < ids.length; x++){
         if (hotkeys.triggersMap[ids[x]][type]){
           mapPoint = hotkeys.triggersMap[ids[x]][type];
           break;
         }
       }

       //find by: id.type.combi.options
       if (mapPoint){
         var trigger;
         // event type is associated with the hkId
         if(!shift && !ctrl && !alt) { // No Modifiers
           trigger = mapPoint[special] ||  (character && mapPoint[character]);
         }
         else{
           // check combinations (alt|ctrl|shift+anything)
           var modif = '';
           if(alt) modif +='alt+';
           if(ctrl) modif+= 'ctrl+';
           if(shift) modif += 'shift+';
           // modifiers + special keys or modifiers + character or modifiers + shift character or just shift character
           trigger = mapPoint[modif+special];
           if (!trigger){
             if (character){
               trigger = mapPoint[modif+character]
                 || mapPoint[modif+hotkeys.shiftNums[character]]
               // '$' can be triggered as 'Shift+4' or 'Shift+$' or just '$'
                 || (modif === 'shift+' && mapPoint[hotkeys.shiftNums[character]]);
             }
           }
         }
         if (trigger){
           var result = false;
           for (var x=0; x < trigger.length; x++){
             if(trigger[x].disableInInput){
               // double check event.currentTarget and event.target
               var elem = jQuery(event.target);
               if (jTarget.is("input") || jTarget.is("textarea") || jTarget.is("select")
                   || elem.is("input") || elem.is("textarea") || elem.is("select")) {
                 return true;
               }
             }
             // call the registered callback function
             result = result || trigger[x].cb.apply(this, [event]);
           }
           return result;
         }
       }
     }
     return null; // alert('error on hotkeys!');
   };
   // place it under window so it can be extended and overridden by others
   window.hotkeys = hotkeys;
   return jQuery;
 })(jQuery);
