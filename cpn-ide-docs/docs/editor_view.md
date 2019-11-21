## Editor View
---

Editor View is the workspace for creating a net. You can either load an existing net or create a new one.

![Screenshot](img/editor-view.png)

To create a new net, click on **New Project**.

To load a net, click on **Open project** and select the desired net.

![Screenshot](img/head.png)


## Tools

### Creating objects
One of the instruments for creating net objects is the mouse right-click button menu. You can bring it up by clicking the right mouse button in the editor area.

![Screenshot](img/mouse-menu.png)

To create a new **place** or **transition**, select the corresponding option of the menu.

Having created an object, you can create the next one by putting the cursor on the first object and bringing up the menu with the right mouse button click. A place can be related only to a transition and a transition can be related only to a place. It's impossible to make an arc between two transitions or two places.


To create an **arc**: 
<br>
- click on a place or transition to bring up the menu 

![Screenshot](img/menu2.png)

- select the arrow icon
- draw the arc to the object you wish to connect to.

### Creating new subpage
When a CP-net uses a substitution transition the logic that the transition represents must be kept somewhere. It is kept on a page called a **subpage**.
A page that contains a substitution transition is called a **superpage**. 

To create a **new subpage**, select the corresponding option in the right-click menu. A new page is created. It is set as a subpage in the Project Tree panel.

![Screenshot](img/mouse-menu.png)

The subpage has a mark, it looks like this:

![Screenshot](img/subpage3.png)

To connect a subpage to other objects of the net, use arcs.


#### Creating diagram on subpage

Having made a subpage, create new objects on it. You can also move already existing objects from the superpage to the subpage. To move a group of existing objects, use the menu:

![Screenshot](img/lasso.png)

- Press the lasso icon (the top icon)
- Select objects to be replaced to the subpage by drawing the lasso with the pointer
- Press the icon in the middle ("Move selected objects to subpage")

#### Selecting port type

When creating a diagram on the subpage, places at the ends of the diagram must be set as **ports**. Ports can be of 3 types: **In** | **Out** | **In/Out**. To set a port:

- click on the place at the left end of the diagram
- select a port type in the corresponding line of the Properties panel

![Screenshot](img/porttype.png)

Repeat the same with the right end place.

In the picture below the places at the ends of the diagram are **ports**. They can be labeled as **In** / **Out** / **In/Out** according to the selected port type.

![Screenshot](img/ports.png)

A substitution transition having been created, places surrounding the substitution transition become **sockets**. On the picture below sockets are places **CVert** and **P3**.

![Screenshot](img/sockets.png) 

#### Selecting port bind

When creating a subpage, arcs surrounding the substitution transition must get a port bind.
To get a port bind for an arc:
- click on the arc
- select a port bind in the corresponding line of the Properties panel

![Screenshot](img/portbind.png)

**If you don't set port types and port binds for places and arcs surrounding a substitution transition, mistakes occur**. (see an example in the picture below)

![Screenshot](img/binderror.png)

### Deleting objects

To delete a place, an arc or a transition put the cursor on the object to be removed, bring up the right-click menu and select the bin icon.

You can also remove several objects at once using the menu in the upper left corner of the Editor View. 

![Screenshot](img/lasso.png)

To delete a group of objects:
<br>
- Press the lasso icon (the top icon)
<br>
- Select objects to be removed by drawing the lasso with the pointer
<br>
- Press the bin icon




## Inscriptions

### Adding inscriptions
To add an inscription, click on the place, transition, or arc where you want to add the inscription. This activates the text edit mode for the object you have clicked on.

Immediately after creating a place, transition, or arc you are also in the text edit mode, and can add the first inscription right away.

To switch between inscriptions of an object, put the cursor on the object and use the **Tab** key.

### Place inscriptions
Place inscriptions are created when you add/edit inscriptions for places. There are three inscriptions that may be associated with a place.

- Place name inscription – optional. The place name inscription is an optional label that identifies the place, and it may contain any sequence of characters.

![Screenshot](img/place-name.png)

- Color set inscription – required. The color set inscription determines the color set, i.e. the type of all the tokens that can be put in the place. 

*Default color set inscription*

![Screenshot](img/place-unit.png) 


- Initial marking inscription – optional. The initial marking inscription is a multiset expression that specifies the initial tokens for a place. 

*Default initial marking inscription*

![Screenshot](img/place-initial-marking.png)



### Transition inscriptions
Transition inscriptions are created when you add/edit inscriptions for transitions.
There are five inscriptions that may be associated with a transition. All are optional:

- Transition name inscription

![Screenshot](img/transition-name.png)

- Condition inscription

*Default condition inscription*

![Screenshot](img/transition-condition.png)

- Time inscription

*Default time inscription*

![Screenshot](img/transition-time.png)

- Code segment inscription

*Default code inscription*

![Screenshot](img/transition-code.png)

- Priority inscription

*Default priority inscription*

![Screenshot](img/transition-priority.png)



### Arc inscriptions

Arcs have only one inscription — the arc inscription. An arc inscription is a CPN ML expression that evaluates to a multiset or a single object.

*Default arc inscription*

![Screenshot](img/arc.png)


## ML editor
ML editor is a tab for creating declarations using ML code. It's easier to write a declaration in the **ML editor** if the declaration is very complex.

![Screenshot](img/ml_editor.png)


## Tabs
The number of tabs related to the Editor View depends on how many pages have been created. Clicking on a page in the Project tree (block "Pages") opens the corresponding tab in the Editor View. You can switch between the pages either by clicking on the names of pages in the Project tree 

![Screenshot](img/pages1.png)

or by clicking on the tabs in the Editor View

![Screenshot](img/tabpages3.png)


### Diagram zooming 
To zoom in or out, hold the **Ctrl** key and scroll the mouse wheel.

### Resizing objects
To resize an object: 
<br>
- put the pointer on any corner of the object
<br>
- when you see the pointer as two-way arrow, drag the corner of the object to get desired size and form.

### Diagram moving
To move a diagram across the Editor View, set the pointer in the free space of the Editor View, hold down the left mouse key and move the pointer. The diagram will repeat the movements of the pointer.

To move a particular object, put the cursor in the object, hold down the left mouse key and move the pointer.

While moving the object, you can see **magnetic guidelines** (orange lines in the picture below). 

Magnetic guidelines are horizontal and vertical lines which can be used for aligning your objects during the graphical editing of the net.

![Screenshot](img/guidelines.png)
