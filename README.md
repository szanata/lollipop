Lollipop
========

A simple JS popup manager

## Featues

- Auto centralizes
- Size adjustable
- Always visible
- Screen blocker
- Prevents scroll
- Keyborad ESC to close popup
- 3 areas: header (for title), body (for content) and footer (for buttons).
- Easy to styling
- Mobile friendly
- Blocks keyboard or any kind of inputs behind the popup

## Installing

Get the latest version via npm:

```bash
npm install lollipop
```
Just reference the file `lollipop.js` and `lollipop.css` for styling.
Import jQuery too.


## API
*(5 methods)*

- `Lollipop.open( [options<Object>] )`

  Open a popup. You can define some properties that only will be used for *this popup*, next one will use the defaults. To check the options, check config below.
  This lib works with only one instance at time, with no popup stack. If a popup is opened and you open another, the first will be replaced.

- `Lollipop.close( [noAnimation<boolean>] )`

  Close the opened popup. If you pass 'true', it closes suddenly, without the default fade out animation.

- `Lollipop.openLoading()`

  Open a modal, unclosable and invisible popup with a spinning wheel. Can be closed by calling *close()* method.

- `Lollipop.seeDefaults()`

  Returns a copy of defaults configurations object.

- `Lollipop.config( [options<Object>] )`

  Lollipop has its internal defaults, that can be overwriten using this method. The configurations are:

  - **minWidth**: *<Number>* - The minimum width (px) for the popup, like the CSS property. Default: 400.
  - **maxWidth**: *<Number>* - The maximum width (px) for the popup, like the CSS property. Default: 500.
  - **width**: *<Number>* - The preferred width (px) for popup. Default: 'auto'.
  - **minHeight**: *<Number>* - The minimum height (px) for the popup content (excluding header and footer), like the CSS property. Default: 0.
  - **maxHeight**: *<Number>* - The minimum height (px) for the popup content (excluding header and footer), like the CSS property. Default: 400.
  - **height**: *<number>* - The preferred width (px) for popup content (excluding header and footer). Default: 'auto'.
  - **animate**: *<boolean>* - If popup must fade in when opening. Default: true.
  - **animateOnClose**: *<boolean>* - If popup must fade out when closing. Default: true.
  - **title**: *<string>* - Default tile for popup. Default: null.
  - **showHeader**: *<boolean>* - If the header bar must be visible. Default: true.
  - **showFooter**: *<boolean>* - If the footer bar must be visible. Default: true.
  - **onOpen**: *<function>* - Some function to be evalued after the popup loads.
  - **onClose**: *<function>* - Some function to be evalued after the popup closes.
  - **onBeforeClose**: *<function>* - Some function to be evalued before the popup closes.
  - **showCancelButton**: *<boolean>* - If the close button must be visible. Default: true.
  - **cancelButtonTitle**: *<boolean>* - The close button label. Default: *Cancel*.
  - **onCancel**: *<function>* - The close button behavior before closing the popup. Default: *Cancel*. Note that if the close button is visible, ESC key can be used to close it, this also trigger the *onClose* event.
  - **content**: *<HTMLElement|jQuery|string>* - The content for popup. Default: null.
  - **buttons**: *<Array(<object>)>* - An array of buttons to be used on each popup. A button object has the following properties:
      - **title**: *<string>* - The label for button.
      - **click**: *<function>* - A function used *onClick* for this button. If you want to close popup, just call *Lollipop.close()* inside this function.
      - **href**: *<string>* - The url to made this button an anchor. Default: null.
      - **target**: *<string>* - When the *url* is given, this will set the *target* attribute on an anchor element. Default: '_blank'.

## Changelog

- **1.4.4**
  - Updated jquery version to 3
  - Removed bower file

- **1.4.3**
  - Project refactor

- **1.4.2**
  - fixed: Loading wheel was still visible after a rapid change from Lollipop.openLoading to Lollipop.open content


- **1.4.1**
  - added: Now every button have the CSS class 'button'


- **1.4.0**
  - added: New load spinner feature:

      By calling *openLoading()*, a invisible, modal, unclosable popup with a spinning wheel will be opened.

      It can be closed by calling *close()* as any popup. It will prevent keyboard entries or any user action until being closed.

      This wheel is 100% css, and should work on any modern browser, thus avoiding the need for a .gif or another lib to generate spinners.

  - removed: redundant code.


- **1.3.1**
  - added: When the popup closes, waits animation to finish before triggering the callback 'onClose'.
  - added: Style to prevent firefox dashed focus border around buttons.


- **1.3.0**
  - added: When the popup opens, all input event in the page below are prevented (keypress, keyup, keydown, input, paste).
  - added: When the popup opens, the first input or button found in it will receive focus.
  - added: Style for focusing buttons.
  - fixed: import in the example file.


- **1.2.1**
  - fixed: some minor CSS issues, the header section don't had any font-size defined.


- **1.2.0**
  - added: full mobile support. On mobile or small display resolution, the popup width will be fixed to 90% of the screen.
  - added: overflow as scroll for bigger content.
  - added: the *minHeight*, *maxHeight* and *height* options now are specific for the content area, excluding the header and the footer.
  - added: the *minHeight* options default value now is 0.
  - added: the default values for the *width* and *height* options are "auto" now.
  - fixed: when closing the popup with animation and rapidly opening it again, the popup could not appear.
  - added: bower.js support.
  - added: the main files now are lollipop.css and lollipop.js, without the capitalization.

- **1.1.2**
  - fixed: some times after the popup opens, the blocker layer height is a little greater than the window height, even when the popup itself is smaller, thus the window's scrollbar appears.


- **1.1.1**
  - added: "animateOnClose" config to set whether the popup must fadeOut on close or not. Default: true.
  - fixed: some issues on "open" when no parameters was given.
  - added: code improvements.


- **1.1.0**
  - added: buttons now have target and href properties to make anchor links.
  - added: compatibility with require.js, as an AMD module.


- **1.0.5**
  - added: "onClose" callback, called after popup closes.
  - added: "onBeforeClose" calback, called before popup closes.


- **1.0.4**
  - fixed: explicit removing popup's content before closing the popup.
  - fixed: explicit removing popup's content before loading new content on popup.
  - added: now using "append" to new content on popup.


- **1.0.3**
  - fixed: replace "remove" to "detach" jQuery method when closing the popup.


- **1.0.2**
  - added: "onOpen" option.


- **1.0.1**
  - added: stylizable block layer (for background color and opacity)


- **1.0.0**
  - initial release, see features below
