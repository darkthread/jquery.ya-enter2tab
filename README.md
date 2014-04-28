jquery.ya-enter2tab.js
======================

**[中文說明](說明.md)**

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
to add enter to tab function on every input element (including ***input***, ***select***, ***button***.  Enter key means new line for ***textarea*** , textarea can join focus loop but doesn't support no enter to tab) inside the container, then you can use tab or enter to move focus between them.  The sequence of focus is totally according to the ***tabindex*** attribute, not the order of HTML tag in DOM.  If you want to skip specific field while moving focus by enter key, add special class name "**e2t-ignore**".

``` html
<input type="text" tabindex="2" />  
<input type="text" tabindex="3" class="e2t-ignore" />
<input type="text" tabindex="4" />
```
When you press enter key on input tabindex=2, the focus will move to input tabindex=4.  When you press tab key on input tabindex=2, input tabindex=3 will get the focus.

#### Demo
![Screenshot](https://raw.githubusercontent.com/darkthread/jquery.ya-enter2tab/master/images/Demo3.gif)  
Field 5 is assgined with class="e2t-ignore".  It is skipped when using enter to switch focus and included in focus loop by pressing tab.  
**Note: Browser UI is included in tab key focus loop.  For example,  press tab on Field 4 will move the focus to browser's address bar.  If you want ya-enter2tab to handle tab key, you can use .enableEnter2Tab({ captureTabKey: true }) option.**

## FOCUS MOVING RULE

Everytime when enter key is pressed, ya-enter2tab tries to find all the candidates of getting focus in the container first.  The ***input***, ***select***, ***button***, ***textarea*** with positive integer tabindex attribute which are not readonly, disabled or invsible will be the candidates, then ya-enter2tab sorts their tabindex, compare them with current focused field's tabindex to find the next one to get focus.

#### Demo 
![Screenshot](https://raw.githubusercontent.com/darkthread/jquery.ya-enter2tab/master/images/Demo1.gif)  
In Form 1, every Field N input is marked as tabindex="N".  ya-etner2tab moves focus accoring to tabindex value, not HTML markup order in DOM.


``` html
<input type="text" tabindex="2" />  
<input type="text" tabindex="3" readonly />
<input type="text" tabindex="4" disabled />
<input type="text" tabindex="5" style="display:none" />
<input type="text" tabindex="6" />
```

In above example, press enter or tab on input tabindex=2 will move the focus to input tabindex=6.  If you removeAttr("readonly") on input tabindex=3 by jQuery, press enter on input tabinex=2 again, this time input tabindex=3 will get the focus.

#### Demo
![Screenshot](https://raw.githubusercontent.com/darkthread/jquery.ya-enter2tab/master/images/Demo2.gif)  
At first, focus loop skips hidden Field 5 and disabled Field 7.  After using JavaScript to show Field 5 and enable Field 7 dynamically, they are included in the focus loop.

## FOCUS LOOP GROUPING

You can put fields into two container, for example div A and div B, and execute .enableEnterToTab() separately.  When you press enter or tab on fields of div A, the focus loop will be limited in fields inside div A, none of fields of div B will get focus by enter or tab key.  It is especially useful when you have multiple input areas in single page.

Focus loop grouping works only on enter key, tab key is still handled by browser, so the focus may move to fields of other container, even browser address bar  when you hit tab key.  If you want to limit the focus looping inside the container only by tab key, you can use .enableEnter2Tab({ captureTabKey: true }) to ask ya-enter2tab to handle tab keydown event.

#### Demo
![Screenshot](https://raw.githubusercontent.com/darkthread/jquery.ya-enter2tab/master/images/Demo4.gif)  

## LIVE DEMO

[Online Demo](http://htmlpreview.github.io/?https://github.com/darkthread/jquery.ya-enter2tab/blob/master/example.html)
