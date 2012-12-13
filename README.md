Lollipop
========

A simple JS popup manager, but just *perfect*

> Changelog

- **1.0.3**
  - replace "remove" to "detach" jQuery method when closing the popup

- **1.0.2**
  - added "onOpen" option

- **1.0.1**
  - stylizable block layer (for background color and opacity)

- **1.0.0**
  - initial release, see features below

> Featues

- Auto centralizes
- Size adjustable
- Always visible
- Screen blocker
- Prevents scroll
- 3 areas: header (for title), body (for content) and footer (for buttons).
- Easy to styling

> Intalling

- Download and import the Lollipop.js or the minified file to your project
- You also need to use jQuery 1.8+ on your project
- Download and import the Lollipop.css to your project. Here you can easily customize your popup.

> API 
*(4 methods)*

- Lollipop.open([options<Object>])

  Open a popup. You can define some properties that only will be used for *this popup*, next one will use the defaults configs. To change the default configs see 'Lollipop.condig()' below.
  This lib works with only one instance at time, with no popup stack. If a popup is opened and you open another, the first will be replaced.

- Lollipop.close([noAnimation<boolean>])

  Close the opened popup. If you pass 'true', it closes suddenly, without the default fade out animation.

- Lollipop.seeDefaults()

  Returns a copy of defaults configurations object.

- Lollipop.config([options<Object>]);

  Lollipop has its internal defaults, that can be overwriten using this method. The configurations are:
  
  - minWidth:<Number> - The minimum width (px) for the popup, like the CSS property. Default: 400.
  - maxWidth:<Number> - The maximum width (px) for the popup, like the CSS property. Default: 500.
  - width:<Number> - The preferred width (px) for popup. Default: null.
  - minHeight:<Number> - The minimum height (px) for the popup, like the CSS property. Default: 200.
  - maxHeight:<Number> - The minimum height (px) for the popup, like the CSS property. Default: 400.
  - height:<number> - The preferred width (px) for popup. Default: null.
  - animate:<boolean> - If popup must fade in when opening. Default: true.
  - title:<string> - Default tile for popup. Default: null.
  - showHeader:<boolean> - If the header bar must be visible. Default: true.
  - showFooter:<boolean> - If the footer bar must be visible. Default: true.
  - onOpen:<function> - Some function to be evalued after the popup loads.
  - showCancelButton:<boolean> - If the close button must be visible. Default: true.
  - cancelButtonTitle:<boolean> - The close button label. Default: *Cancel*.
  - onCancel:<function> - The close button behavior before closing the popup. Default: *Cancel*. Note that if the close button is visible, ESC key can be used to close it, this also trigger the *onClose* event.
  - content:<HTMLElement|jQuery|string> - The content for popup. Default: null.
  - buttons:[<object>] - An array of buttons to be used on each popup. A button object has the following properties:
      - title:<string> - The label for button.
      - click:<function> - A function used *onClick* for this button. If you want to close popup, just call *Lollipop.close()* inside this function.

