<?php
/**
 * D1007 skin, derived from monobook template.
 */

if( !defined( 'MEDIAWIKI' ) )
  die( -1 );

class SkinLots extends SkinTemplate {
  function initPage( OutputPage $out ) {
    parent::initPage( $out );
    $this->skinname  = 'Lots';
    $this->stylename = 'Lots';
    $this->template  = 'LotsTemplate';
  }
}

/**
 * @todo document
 * @ingroup Skins
 */
class LotsTemplate extends QuickTemplate {
  var $skin;
  /**
   * Template filter callback for MonoBook skin.
   * Takes an associative array of data set from a SkinTemplate-based
   * class, and a wrapper for MediaWiki's localization database, and
   * outputs a formatted page.
   *
   * @access private
   */
  function execute() {
    global $wgRequest;
    global $lots_wcdigger;
    $this->skin = $skin = $this->data['skin'];
    $action = $wgRequest->getText( 'action' );

    // Suppress warnings to prevent notices about missing indexes in $this->data
    wfSuppressWarnings();

    ?>

    
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"><html><!--
Content-type: Preventing XSRF in IE.

-->
  <head><meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title><?php $this->text('pagetitle') ?> </title>
    <?php $this->html('headlinks') ?>
    <script type="text/javascript" charset="utf-8">
      function css_browser_selector(u){var ua = u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1;},g='gecko',w='webkit',s='safari',h=document.getElementsByTagName('html')[0],b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3')?g+' ff3':is('gecko/')?g:/opera(\s|\/)(\d+)/.test(ua)?'opera opera'+RegExp.$2:is('konqueror')?'konqueror':is('chrome')?w+' chrome':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?'mobile':is('iphone')?'iphone':is('ipod')?'ipod':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win':is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);
    </script>
    <link rel="stylesheet" href="css/main.css" type="text/css" charset="utf-8">
    
<!--[if lt IE 7]><meta http-equiv="imagetoolbar" content="no" /><![endif]-->
<?php print Skin::makeGlobalVariablesScript( $this->data ); ?>
<script type="<?php $this->text('jsmimetype') ?>" src="<?php $this->text('stylepath' ) ?>/common/wikibits.js?<?php echo $GLOBALS['wgStyleVersion'] ?>"><!-- wikibits js --></script>
<!-- Head Scripts -->
<?php $this->html('headscripts') ?>
<?php if($this->data['jsvarurl'  ]) { ?>
<script type="<?php $this->text('jsmimetype') ?>" src="<?php $this->text('jsvarurl'  ) ?>"><!-- site js --></script>
<?php } ?>
<?php if($this->data['pagecss'   ]) { ?>
<style type="text/css"><?php $this->html('pagecss'   ) ?></style>
<?php }
   if($this->data['usercss'   ]) { ?>
<style type="text/css"><?php $this->html('usercss'   ) ?></style>
<?php }
   if($this->data['userjs'    ]) { ?>
<script type="<?php $this->text('jsmimetype') ?>" src="<?php $this->text('userjs' ) ?>"></script>
<?php }
   if($this->data['userjsprev']) { ?>
<script type="<?php $this->text('jsmimetype') ?>"><?php $this->html('userjsprev') ?></script>
<?php }
   if($this->data['trackbackhtml']) print $this->data['trackbackhtml']; ?>

<!-- Wiki Viewer Style -->
<?php if (!iluo_wguser_in_sysop()) { ?>
<style type="text/css">/*<![CDATA[*/
      .editsection {display:none;}
      /*]]>*/</style>
<?php } ?>

  </head>
  <body>
    <div id="start">
      <ul class="context-menu">
	

	
	

	

      </ul>

      <ul class="quickrun">
	 
	<li><a href="/accounts/profile/">Login</a></li>
	<li><a href="/accounts/register/">Register</a></li>
  	
        <!-- <li><a class="icon" title="一站式客户服务中心" href="#">OSC</a></li> -->
      </ul>
    </div>

    
    
    <div id="osc">
      
      <!--           <div class="loading card"></div> -->
      
    </div>
    
    
    <div id="header">
      <div id="nav" class="act-1">
        <ul class="ms-btns">
          <li class="btn-1"><a href="/">Home</a></li>
          <li class="btn-2"><a href="/store/">Store</a></li>
          <li class="btn-3"><a href="/kb/%E7%AB%AF%E5%BA%84/">Decency</a></li>
          <li class="btn-4"><a href="/club/">Club</a></li>
          <li class="btn-5"><a href="/kb/">Wiki</a></li>
          <li class="btn-6"><a href="/support/">Support</a></li>
        </ul>
      </div>
      <div id="search">
        <div id="search-wrapper">
          <div class="left"></div>
          <div id="search-input">
	    <form id="cse-search-box" action="http://www.google.com/cse">
              <div>
                <input type="hidden" value="016022322448111872611:tpssilsypio" name="cx" />
                <input type="hidden" value="UTF-8" name="ie" />
                <input type="text" name="q" class="search" accesskey="s" />
              </div>
	    </form>
          </div>
          <div class="right"></div>
        </div>
      </div>
    </div>

    
<div id="wiki">
  <a name="top" id="top"></a>
  <?php if($this->data['sitenotice']) { ?><div id="siteNotice"><?php $this->html('sitenotice') ?></div><?php } ?>
  <h1 id="firstHeading" class="firstHeading"><?php $this->data['displaytitle']!=""?$this->html('title'):$this->text('title') ?></h1>
  <div id="bodyContent">
    <h3 id="siteSub"><?php $this->msg('tagline') ?></h3>
    <div id="contentSub"><?php $this->html('subtitle') ?></div>
    <?php if($this->data['undelete']) { ?><div id="contentSub2"><?php     $this->html('undelete') ?></div><?php } ?>
    <?php if($this->data['newtalk'] ) { ?><div class="usermessage"><?php $this->html('newtalk')  ?></div><?php } ?>
    <?php if($this->data['showjumplinks']) { ?><div id="jump-to-nav"><?php $this->msg('jumpto') ?> <a href="#column-one"><?php $this->msg('jumptonavigation') ?></a>, <a href="#searchInput"><?php $this->msg('jumptosearch') ?></a></div><?php } ?>
    <!-- start content -->
    <?php $this->html('bodytext') ?>
    <?php if($this->data['catlinks']) { $this->html('catlinks'); } ?>
    <!-- end content -->
    <?php if($this->data['dataAfterContent']) { $this->html ('dataAfterContent'); } ?>
    <div class="visualClear"></div>
  </div>
</div>


    <div id="footer">
      <div class="tips">从<a href="/kb/%E8%B4%AD%E4%B9%B0/">这里</a>进入网上商城，或者在<a href="/kb/%E7%BB%8F%E9%94%80%E5%95%86%E7%9B%AE%E5%BD%95/">这里</a>查找经销商目录。服务热线：(86)027-8739 9167</div>
      <div class="shortcut">
        <a href="/sitemap/">Site Map</a>
        <a href="http://blog.d1007.com">Official Blog</a>
        <a class="last" href="/kb/%E8%81%94%E7%B3%BB%E6%88%91%E4%BB%AC/">Contact Us</a>
      </div>

      <hr />

      <div class="copyright">
        © 2009 尚工智能版权所有
      </div>

      <div class="i18n">
	<form action="/i18n/setlang/" method="post">
	  Display language :
	  <select name="language" title="Choose your language">
	    
	  </select>
	  <input type="submit" value="Go" />
	</form>
      </div>

    </div>


    <div id="fx_heler_box"></div>

    

  </body>
  
  <script type="text/javascript" src="js/jquery-1.3.2.min.js"></script>
  
  <script type="text/javascript" src="js/heeei.js" charset="utf-8"></script>
  
  <script src="http://www.google.com/jsapi?key=ABQIAAAAF95lA65id7haywozxc4PfBQZ-AfskKAAG7PfVXIIXGdcNFbVnhR-BpbANQMw9nRmoIyZTZ8K3ZnYRA" type="text/javascript"></script>
  <script language="Javascript" type="text/javascript">
    //<![CDATA[
    google.load("search", "1", {"language" : "zh-CN"});
    //]]>
  </script>

  <script type="text/javascript">
    // <![CDATA[
  heeei.set('home', '');
  

  // ]]>
  </script>
  <script type="text/javascript">
    var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
    document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
  </script>
  <script type="text/javascript">
    if (typeof(_gat)=='object')
    setTimeout(function(){
    var pageTracker = _gat._getTracker("UA-10080342-2");
    pageTracker._trackPageview();
    }, 1500);
  </script>
</html>


    <?php
    wfRestoreWarnings();
  } // end of execute() method

  /*************************************************************************************************/
  function searchBox() {
    ?>
    <div id="p-search" class="portlet">
      <h5><label for="searchInput"><?php $this->msg('search') ?></label></h5>
                                       <div id="searchBody" class="pBody">
                                       <form action="<?php $this->text('searchaction') ?>" id="searchform"><div>
                                       <input id="searchInput" name="search" type="text"<?php echo $this->skin->tooltipAndAccesskey('search');
    if( isset( $this->data['search'] ) ) {
      ?> value="<?php $this->text('search') ?>"<?php } ?> />
    <input type='submit' name="go" class="searchButton" id="searchGoButton"	value="<?php $this->msg('searcharticle') ?>"<?php echo $this->skin->tooltipAndAccesskey( 'search-go' ); ?> />&nbsp;
    <input type='submit' name="fulltext" class="searchButton" id="mw-searchButton" value="<?php $this->msg('searchbutton') ?>"<?php echo $this->skin->tooltipAndAccesskey( 'search-fulltext' ); ?> />
       </div></form>
           </div>
           </div>
           <?php
           }

  /*************************************************************************************************/
  function toolbox() {
    ?>
    <div class="portlet" id="p-tb">
      <h5><?php $this->msg('toolbox') ?></h5>
      <div class="pBody">
      <ul>
      <?php
      if($this->data['notspecialpage']) { ?>
                                          <li id="t-whatlinkshere"><a href="<?php
				echo htmlspecialchars($this->data['nav_urls']['whatlinkshere']['href'])
				?>"<?php echo $this->skin->tooltipAndAccesskey('t-whatlinkshere') ?>><?php $this->msg('whatlinkshere') ?></a></li>
                                          <?php
                                          if( $this->data['nav_urls']['recentchangeslinked'] ) { ?>
                                                                                                 <li id="t-recentchangeslinked"><a href="<?php
				echo htmlspecialchars($this->data['nav_urls']['recentchangeslinked']['href'])
				?>"<?php echo $this->skin->tooltipAndAccesskey('t-recentchangeslinked') ?>><?php $this->msg('recentchangeslinked') ?></a></li>
                                                                                                 <?php 		}
      }
    if(isset($this->data['nav_urls']['trackbacklink'])) { ?>
      <li id="t-trackbacklink"><a href="<?php
				echo htmlspecialchars($this->data['nav_urls']['trackbacklink']['href'])
				?>"<?php echo $this->skin->tooltipAndAccesskey('t-trackbacklink') ?>><?php $this->msg('trackbacklink') ?></a></li>
        <?php 	}
    if($this->data['feeds']) { ?>
      <li id="feedlinks"><?php foreach($this->data['feeds'] as $key => $feed) {
        ?><span id="<?php echo Sanitizer::escapeId( "feed-$key" ) ?>"><a href="<?php
					echo htmlspecialchars($feed['href']) ?>"<?php echo $this->skin->tooltipAndAccesskey('feed-'.$key) ?>><?php echo htmlspecialchars($feed['text'])?></a>&nbsp;</span>
        <?php } ?></li><?php
    }

    foreach( array('contributions', 'log', 'blockip', 'emailuser', 'upload', 'specialpages') as $special ) {

      if($this->data['nav_urls'][$special]) {
        ?><li id="t-<?php echo $special ?>"><a href="<?php echo htmlspecialchars($this->data['nav_urls'][$special]['href'])
				?>"<?php echo $this->skin->tooltipAndAccesskey('t-'.$special) ?>><?php $this->msg($special) ?></a></li>
        <?php		}
    }

    if(!empty($this->data['nav_urls']['print']['href'])) { ?>
      <li id="t-print"><a href="<?php echo htmlspecialchars($this->data['nav_urls']['print']['href'])
				?>"<?php echo $this->skin->tooltipAndAccesskey('t-print') ?>><?php $this->msg('printableversion') ?></a></li><?php
        }

    if(!empty($this->data['nav_urls']['permalink']['href'])) { ?>
      <li id="t-permalink"><a href="<?php echo htmlspecialchars($this->data['nav_urls']['permalink']['href'])
				?>"<?php echo $this->skin->tooltipAndAccesskey('t-permalink') ?>><?php $this->msg('permalink') ?></a></li><?php
        } elseif ($this->data['nav_urls']['permalink']['href'] === '') { ?>
      <li id="t-ispermalink"<?php echo $this->skin->tooltip('t-ispermalink') ?>><?php $this->msg('permalink') ?></li><?php
              }

    wfRunHooks( 'MonoBookTemplateToolboxEnd', array( &$this ) );
    wfRunHooks( 'SkinTemplateToolboxEnd', array( &$this ) );
    ?>
    </ul>
        </div>
	</div>
        <?php
	}

  /*************************************************************************************************/
  function languageBox() {
    if( $this->data['language_urls'] ) {
      ?>
      <div id="p-lang" class="portlet">
        <h5><?php $this->msg('otherlanguages') ?></h5>
        <div class="pBody">
        <ul>
        <?php		foreach($this->data['language_urls'] as $langlink) { ?>
        <li class="<?php echo htmlspecialchars($langlink['class'])?>"><?php
        ?><a href="<?php echo htmlspecialchars($langlink['href']) ?>"><?php echo $langlink['text'] ?></a></li>
        <?php		} ?>
        </ul>
            </div>
            </div>
            <?php
            }
  }

  /*************************************************************************************************/
  function customBox( $bar, $cont ) {
    ?>
    <div class='generated-sidebar portlet' id='<?php echo Sanitizer::escapeId( "p-$bar" ) ?>'<?php echo $this->skin->tooltip('p-'.$bar) ?>>
      <h5><?php $out = wfMsg( $bar ); if (wfEmptyMsg($bar, $out)) echo $bar; else echo $out; ?></h5>
                                                                                                   <div class='pBody'>
                                                                                                   <?php   if ( is_array( $cont ) ) { ?>
                                                                                                   <ul>
      <?php 			foreach($cont as $key => $val) { ?>
      <li id="<?php echo Sanitizer::escapeId($val['id']) ?>"<?php
      if ( $val['active'] ) { ?> class="active" <?php }
    ?>><a href="<?php echo htmlspecialchars($val['href']) ?>"<?php echo $this->skin->tooltipAndAccesskey($val['id']) ?>><?php echo htmlspecialchars($val['text']) ?></a></li>
    <?php			} ?>
  </ul>
      <?php   } else {
      # allow raw HTML block to be defined by extensions
        print $cont;
  }
    ?>
    </div>
	</div>
        <?php
	}

} // end of class


