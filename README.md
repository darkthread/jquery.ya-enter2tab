jquery.ya-enter2tab.js
======================

There are already a bunch of "enter to tab" plugins in the world, but it's still hard to find one which exactly fits my needs.  So, "Yet Another Enter to Tab" jQuery plugin is here. :P

It provides these features:

* Let user use "enter" instead of "tab" to move focus
* Supports input, select and button elements 
* Move focus accoring to tabindex order
* Skip tabindex==-1, readonly, disabled, invisible fields **dynamically**
* Supports grouping, the focus only loop inside the group
* Fields can get focus by tab but skipped by enter 
  
## BASIC USAGE

Using 
``` javascript
$(selector).enableEnterToTab();
```
to add enter to tab function on every input elements(including ***input***, ***select***, ***button*** elements) inside the container, then you can use tab or enter to move focus between them.  The sequence of focus is totally according to the ***tabindex*** attribute, not the order of HTML tag in DOM.  If you want to skip specific field while moving focus by enter key, add special class name "**e2t-ignore**".

``` html
<input type="text" tabindex="2" />  
<input type="text" tabindex="3" class="e2t-ignore" />
<input type="text" tabindex="4" />
```
When you press enter key on input tabindex=2, the focus will be moved to input tabindex=4.  When you press tab key on input tabindex=2, input tabindex=3 will get the focus.

#### Demo
![Screenshot](./images/demo3.gif)  
Field 5 is assgined with class="e2t-ignore".  It is skipped when using enter to switch focus and included when using using tab.  
**Note: Browser UI is included in tab key focus loop.  For example,  press tab on Field 4 will move the focus to browser's address bar.**

## FOCUS MOVING RULE

Everytime when enter key is pressed, ya-enter2tab plugin will find the candidates of getting focus first.  The ***input***, ***select***, ***button***, ***textarea*** with positive integer tabindex attribute and not readonly, disabled or invsible will be the candidates, then ya-enter2tab sorts all tabindex, compare them with current focused field's tabindex to find the next one to get focus.

#### Demo 
![Screenshot](./images/demo1.gif)  
In Form 1, every Field N input is marked as tabindex="N".  ya-etner2tab moves focus accoring to tabindex value, not element order in DOM.


``` html
<input type="text" tabindex="2" />  
<input type="text" tabindex="3" readonly />
<input type="text" tabindex="4" disabled />
<input type="text" tabindex="5" style="display:none" />
<input type="text" tabindex="6" />
```

In above example, press enter or tab on input tabindex=2, the focus will be moved to input tabindex=5.  If you removeAttr("readonly") on input tabindex=3 by jQuery, press enter or tab on input tabinex=2 again, this time input tabindex=3 will get the focus.

#### Demo
![Screenshot](./images/demo2.gif)  
At first, focus looping skips hidden Field 5 and disabled Field 7.  After using JavaScript to show Field 5 and enable Field 7 dynamically, they are included in the focus loop.

## FOCUS LOOP GROUPING

You can put fields into two container, for example div A and div B, and execute .enableEnterToTab() separately.  When you press enter or tab on fields of div A, the focus will loop through fields inside div A, not including fields of div B.  It is especially useful when you have multiple input areas in single page.

A little trick is used to accomplish focus loop grouping.  When any field of div A get focus by mouse click, ya-enter2tab will find all other containers which enabled enter to tab, find all elements with tabindex attribute in the each container, save original tabindex value to data-tab-index attribute an change tabindex to -1 for avoiding getting focus.  In the same time, ya-enter2tab will check div A's elements to restore tabindex values from data-tab-index attributes.   So if you want to avoid any other input getting focus, remember to put them in a container and .enableEnterToTab().

#### Demo
![Screenshot](./images/demo4.gif)  

## LIVE DEMO

[Online Demo](http://htmlpreview.github.io/?https://github.com/darkthread/jquery.validate.inline/blob/master/src/demo.html)
