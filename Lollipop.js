﻿﻿/** 
* Lollipop
*
* @license MIT <http://szanata.com/mit.txt>
* @license GPL <http://szanata.com/gpl.txt>
* @author Stéfano Stypulkowski <http://szanata.me>
* @hosted Github <http://github.com/madeinstefano/Lollipop>
* @version 1.1.2
* @require jquery 1.8+
* @compatible FF 3.5+
* @compatible Google Chrome 3+
* @compatible IE 6+
* @compatible Opera 10+
* @compatible Safari 5+
*/
(function (){
  'use strict';
  
  /**
  * first level clonning function
  * not included to Object.prototype due jQuery incompatibility
  *
  * @param obj <Object>
  * @return cloned object
  */
  function cloneObj(obj){
    var cloned  = {};
    for (var p in obj){
      if (obj.hasOwnProperty(p)){
        cloned[p] = obj[p];
      }
    }
    return cloned;
  }

  /**
  * Freeze given object
  * Used to prevent old browser to crash
  */
  function _freeze(obj){
    if (Object.freeze){
      Object.freeze(obj);
    }
  }


  /**
  * Return whether given object is function or not
  */
  function isF(o){
    return typeof o === 'function';
  }
  
  var   
    methods = {},
    defaults = {
      minWidth:400,
      maxWidth:500,
      width:null,
      minHeight:200,
      maxHeight:400,
      height:null,
      animate:true,
      animateOnClose:true,
      title:null,
      showHeader:true,
      showFooter:true,
      showCancelButton:true,
      cancelButtonTitle:'Cancel',
      onCancel:null,
      content:null,
      onBeforeOpen:null,
      onOpen:null,
      onClose:null,
      buttons:[]
    },
    workingOptions = cloneObj(defaults),
    /* popup object
    * there is only one $popup object that is reused forever;
    */
    $popup = $('<div></div>').css({ // wrapper it all
      position:'absolute',
      top:'0px',
      left:'0px',
      right:'0px',
      bottom:'0px',
      zIndex:9999
    }).append(
      $('<div id="lollipop-block-layer"></div>').css({ //blocker
        position:'absolute',
        top:'0px',
        bottom:'0px',
        left:'0px',
        right:'0px'
      }),
      $('<div id="lollipop-popup"></div>').css({ //popup box itself
        maxWidth:defaults.maxWidth,
        maxHeight:defaults.maxHeight,
        minWidth:defaults.minWidth,
        minHeight:defaults.minHeight,
        position:'absolute'
      }).append(
        $('<div id="lollipop-popup-header"></div>').css({ //header
          textOverflow:'ellipsis',
          overflow:'hidden'
        }),
        $('<div id="lollipop-popup-body"></div>'), //content body
        $('<div id="lollipop-popup-footer"></div>').css({ //footer
          position:'absolute',
          bottom:'0px',
          left:'0px',
          right:'0px'
        })
      )
    );
  _freeze(defaults);
  
  /**
  * prevents window scrolling in most cases, 
  * but allow scroll to fetch popup bigger than screen
  */
  function preventScroll(){
    $(window).add('html, body').scrollTop(0).scrollLeft(0).on('scroll.lollipop', function (){
      var
        popW = $popup.find('#lollipop-popup').outerWidth(true),
        popH = $popup.find('#lollipop-popup').outerHeight(true);
      
      if (popW < $(window).width()){
        $(window).scrollLeft(0);
      }else if (popW < $(window).width() + $(window).scrollLeft()){
        $(window).scrollLeft(popW - $(window).width());
      }
      if (popH < $(window).height()){
        $(window).scrollTop(0);
      }else if (popH < $(window).height() + $(window).scrollTop()){
        $(window).scrollTop(popH - $(window).height());
      }
    });
  }
  
  /**
  * centralizes the popup relative to window
  * if popup is bigger than x or y, it goes to position zero on that axis
  */
  function centralize(){
    var
      left = ($(window).width() - $('#lollipop-popup').outerWidth()) / 2,
      top = ($(window).height() - $('#lollipop-popup').outerHeight()) / 2;
    $('#lollipop-popup').css({
      left:(left < 0) ? 0 : left,
      top:(top < 0) ? 0 : top
    });
  }
  
  /**
  * enable window scroll
  */
  function enableScroll(){
    $(window).add('html, body').off('scroll.lollipop');
  }
  
  /**
  * recentralizes popup and resizes blocker size
  */
  function setWindowResizeBehavior(){
    $(window).on('resize.lollipop', function (){
      setBlockerSize();
      centralize();
    });
  }
  
  /**
  * disable the behavior above
  */
  function disableWindowResizeBehavior(){
    $(window).off('resize.lollipop');
  }
  
  /**
  * Sets the height fot the blocker equals the height of the document 
  * whether it is bigger than window, otherwise uses window height.
  * Do the same for width.
  */
  function setBlockerSize(){
    $popup
      .height(0).width(0) //reset
      .height(($(document).height() < $(window).height()) ? $(window).height() : $(document).height())
      .width(($(document).width() < $(window).width()) ? $(window).width() : $(document).width());
  }
  
  /**
  * creates and appends some button to footer*
  */
  function setButton(options){
    $popup.find('#lollipop-popup-footer').append(
      options.href 
        ? $('<a class="button"></a>').text(options.title)
          .attr({
            'href': options.href,
            'target': options.target ? options.target : '_blank'
          })
          .on('click', options.click)
        : $('<button></button>').text(options.title).on('click', options.click)
    );
  }
  
  /**
  * binds the close on ESC beahvior
  */
  function setCloseOnESC(_options){
    $(window).on('keydown.lollipop', function (e){
      if (e.keyCode === 27){
        if (isF(_options.onCancel)){
          _options.onCancel();
        }
        Lollipop.close();
      }
    });
  }
  
  /**
  * removes close on ESC behavior
  */
  function disableCloseOnESC(){
    $(window).off('keydown.lollipop');
  }
  
  /**
  * Hides or shows footer
  * Also append all his buttons
  */
  function setFooter(_options){
    if (!_options.showFooter || ((!_options.buttons || _options.buttons.length === 0) && !_options.showCancelButton)){
      $popup.find('#lollipop-popup-footer').empty().hide();
    }else{
      $popup.find('#lollipop-popup-footer').empty().show();
      if (_options.buttons){
        for (var i = 0, li = _options.buttons.length; i < li; i++){
          setButton(_options.buttons[i]);
        }
      }
      if (_options.showCancelButton){
        setButton({
          title: _options.cancelButtonTitle, 
          click:  function (){
            if (isF(_options.onCancel)){
              _options.onCancel();
            }
            Lollipop.close();
          }
        });
        setCloseOnESC(_options);
      }
    }
  }

  /**
  * set all sizes for the popup
  * to work wiht minHeight and minWidth, it must omit height and width
  */
  function setSizes(_options){
    $popup.find('#lollipop-popup').css({
      maxWidth:_options.maxWidth || 'auto',
      maxHeight:_options.maxHeight || 'auto',
      minWidth:_options.minWidth || 'auto',
      minHeight:_options.minHeight || 'auto',
      width:_options.width || 'auto',
      height:_options.height || 'auto'
    });
  }
  
  /**
  * Hides or shows header and its content
  */
  function setHeader(_options){
    if (_options.showHeader && _options.title){
      $popup.find('#lollipop-popup-header').show().html(_options.title);
    }else{
      $popup.find('#lollipop-popup-header').hide();
    }
  }
  
  /**
  * adds the cleaner div to prevent floating element to be out of bounds
  */
  function setCleaner(){
    var cleaner = $('<div></div>').css({
      clear:'both',
      width:0,
      height:0
    });
    $popup.find('#lollipop-popup-body').append(cleaner);
  }
  
  /**
  * Add a pad equivalent to footers height to the popup box,
  * This is important since the foooter has absolute position
  */
  function setBodyFooterDistance(){
    $popup.find('#lollipop-popup').css('padding-bottom',$popup.find('#lollipop-popup-footer:visible').size() ? $popup.find('#lollipop-popup-footer').outerHeight(true) : 0);
  }
  
  function afterOpenAction(){
    setBodyFooterDistance();
    setBlockerSize();
    centralize();
    preventScroll();
    setWindowResizeBehavior();
    $(window).trigger('resize.lollipop');
  }
  
  /**
  * @public
  * retuns a non extensible and non changeable, frozen clone of defaults
  */
  function seeDefaults(){
    return cloneObj(defaults);
  }
  methods.seeDefaults = seeDefaults;
  
  /**
  * @public
  * overwrite the owrking options with presetted options by user
  */
  function config(_options){
    $.extend(workingOptions,defaults,_options);
  }
  methods.config = config;
  
  /**
  * @public
  * opens the popup, with given options, that overwrite global options
  */
  function open(_options){
    var openOptions = {};
    $.extend(openOptions, workingOptions,_options);
    setHeader(openOptions);
    $popup.find('#lollipop-popup-body').html('');
    $popup.find('#lollipop-popup-body').append(openOptions.content);
    $popup.data('__closeCallback',openOptions.onClose);
    setSizes(openOptions);
    setCleaner();
    setFooter(openOptions);
    $popup.hide().appendTo($('body'));
    if (isF(openOptions.onBeforeOpen)){
      openOptions.onBeforeOpen.call($popup[0]);
    }
    if (openOptions.animate){
      $popup.css('visibility','hidden').show(0,function (){
        afterOpenAction();
        $popup.hide().css('visibility','visible').fadeIn(function (){
          if (isF(openOptions.onOpen)){
            openOptions.onOpen.call(this);
          }
        });
      });
      
    } else {
      $popup.show(0,function (){
        afterOpenAction();
        if (isF(openOptions.onOpen)){
          openOptions.onOpen.call(this);
        }
      });
    }
  }
  methods.open = open;
  
  /**
  * @public
  * closes the popup
  */
  function close(noAnimate){
    if (noAnimate || !workingOptions.animateOnClose){
      $popup.find('#lollipop-popup-body').html('');
      $popup.detach();
    } else {
      $popup.fadeOut(function (){
        $popup.find('#lollipop-popup-body').html('');
        $popup.detach();
      });
    }
    var closeCallback = $popup.data('__closeCallback');
    if (isF(closeCallback)){
      closeCallback.call($popup[0]);
    }
    disableCloseOnESC();
    disableWindowResizeBehavior();
    enableScroll();
  }
  methods.close = close;
  
  _freeze(methods);

  // require.js compatibility
  if (typeof define === 'function' && define.amd ) {
    define(function (){return methods;});
  } else {
    window.Lollipop = methods;
  }
})();