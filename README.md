# My React Redux Notepad

### What is Redux 
A state management library that works with JavaScript Applications that can be used with React, Angular, Vue and possibly other frameworks e.g Vanilla JS. 
\
\
Redux is useful for keeping different parts of the UI in sync, to update data across UI elements. All the application's state is retrieved from the store, the single source of truth. To update data, only update data in the store and all front end element get their data from the store. It basically centralizes the applications and make data flow transparent. 
\

### Why Redux?
* **Centralization of state** - the store is the single source of truth

* **Predictable state changes** - Easily see how application state changes 

* **Time travel debugging** - the ability to jump from one state to a previous state, essentially rendering the UI in a previous state. The entire application can be saved in a specific file and reload it later. 

* **Log Rocket** - A tool that gives an always on Redux dev tool that allows you to load an application using the same state of the user and solve errors.

* **Caching** - Redux helps you easily preserve page state

#### Disadvantages 
* Complexity 
* Verbosity 

### Redux Fundamentals 
**Redux uses functional programming**
Functional programming is a programming paradigm that decomposes a problem into small and reusable pieces(functions) that take inputs and return outputs/results without mutating or changing data. The functions can then be composed to build more complex functions. 
\
\
**Benefits include** 
* More concise functions 
* Easy to debug and test 
* More scalability (parallelism)

Higher order functions are functions that take a function as an argument or returns a function or does both. Examples are <code>map</code>, <code>setTimeOut</code> and <code>filter</code> functions.

#### Lodash
A utility library for JS with a section that helps with functional programming. Example of when to use is below.

<code>
    const transform = wrapInDiv(toLowerCase(trim(input)))
</code>

\
The goal is to get rid of all the parenthesis in the above statement, and to do that, here are the steps:

<code>

    npm install lodash
    
    import { compose, pipe } from 'lodash/fp' 

    const trim = str => str.trim()

    const toLowerCase = str => str.toLowerCase()

    const transform = pipe(trim, toLowerCase, wrapInDiv)

    transform(input)

    /* Order matters, so use the pipe function to list the functions in the order 
    you want to apply them. The compose function is a higher order function that 
    takes 3 arguments and returns a new function with the composition of all the functions. */

</code>

#### Curing
It is a functional programming technique 
\ 

Example 
<code>

    const input = "   Learning Redux    "

    const wrap = (type, str) => {
        return `<${type}>${str}</${type}>`
    }

    const trim = str => str.trim()

    const toLowerCase = str => str.toLowerCase()

    const transform = pipe(trim, toLowerCase, wrap("div"))
    console.log(input.transform()) // This returns an error or undefined

    // In piping, the output of the first function is the input of the //// next element. Every parameter to the function has to be a function. 

</code>

In currying, instead of separating parameters using commas, we use parenthesis, e.g <code>add(1)(2)</code>, but the function has a single parameter that returns another function with another parameter. 

<code>

    const add = a => b => a + b 

</code>

In the <code>wrap</code> function above, the wrap function can be written as a function just like the add function. 

<code>

    const trim = str => str.trim()

    const toLowerCase = str => str.toLowerCase()

    const wrap = type => str => `<${type}>${str}</${type}>`

    const transform = pipe(trim, toLowerCase, wrap("div))

    // This returns a div with the contents of str trimmed and 
    // converted to lower case. 
    // The parameter wrap can be changed to any HTML element to render different elements on the page.

</code>

#### Pure Functions 
A function is pure if it gives the same result for the same arguments/parameters always. The <code>Math.random()</code> function is an example of a pure function. In a pure function: 
* There are no random values 
* No current date/time 
* No global state (DOM, files, databases, etc) -> Changes to state affects results
* No mutation of parameters 

Example of a pure function
<code>
    
    function add(a, b) {
        return a + b 
    }

    // This function always returns the same number if given the same a and b values, hence it is pure.

</code>

**Benefits of a pure function**
* Self documenting 
* Easily testable - no global state required to test
* Concurrency - (parallelism)
* Cacheable - results can be stored in the cache, useful for functions with complex computations 

#### Immutability
Once created, they cannot be changed, to change it, create a copy and change it in the copy. 

*Benefits* 
* Functions are predictable 
* Faster change detection (state to trigger rendering etc)
* Concurrency - safely run the function in parallel and does not mess up the data/memory 

*Non-benefits*
* Performance - copying values from one object to its copy 
* Memory overhead - copying objects - Use structural sharing i.e. if data is the same across objects, it is shared.  

**Immutability in JavaScript Objects**
<code>

    const person = { 
        name: "Lorraine", 
        address: {
            city: "New Jersey"
        }
    }

    // Update person
    const updatedPerson = Object.assign({}, person, {name: "Bob", age: 23})

    // Better way - use spead operator - more concise 
    const updatedPerson2 = { ...person, name: "Bob"}

    // Both methods do a shallow copy of the original object, hence inside objects are the same
    // Changes by reference change the original
    // Do a deep copy instead

    const updatedPerson3 = { 
        ...person, 
        address: {
            ...person.address, 
            city: "New York"
        }
    }

</code>

**Updating Arrays**
<code>

    const numbers = [1, 2, 3]

    // TO ADD 
    // To add 5 to either beginning or end 
    const addedToStart = [5, ...numbers]

    const addedToEnd = [...numbers, 5]

    // To add at a particular index 'index' 
    const added = [...numbers.slice(0, index), 5, ...numbers.slice(index,)]

    // TO REMOVE 
    const removed = numbers.filter(n => n !== 2)

    // TO UPDATE, e.g to update 2
    const updated = numbers.map(n => n === 2 ? 20 : n)

</code>

#### Enforcing immutability in JavaScript 
Use immutable libraries to enforce immutability in JavaScript e.g Immutable 

**Immutable JS** 
To install <code>npm install immutable</code> and create your file this way: 

<code>

    import { Map } from 'immutable'

    let book = Map({ title: "Nancy Drew" })

    function publish(book) {
        book.set("isPublished", true)
    }

    function getName(book) {
        return book.get('title')
    }

    publish(book)
    console.log(book)

</code>

**Immer JS** 
To install <code>npm install immer</code> and create your file this way: 

<code>

    import { produce } from 'immer'

    let book = Map({ title: "Nancy Drew" })

    function publish(book) {
        return produce(book, draftBook => {
            draftBook.isPublished = true
        })
    }

    let updated = publish(book)
    console.log(book)
    console.log(updated)
    
</code>

### Redux 
Data in the store is an immutable object, hence create a function that takes in the store and returns the updated version of the store. This function is called a <code>reducer</code>. It is a function that takes the current instance of the store as an argument and return the updated store. It also takes in an action that describes what happened ie. an event, on which the update of the store will be based. 

**Three building blocks**
* Action - (event )
* Store 
* Reducer - (event handler) - pure functions

The action is dispatched to the store which will call the reducer for the event, and the reducer will update and the essential UI components will be called to re-render. 

**Steps to building a Redux Application**
* Design the store 
* Define the actions 
* Create a reducer 
* Set up the store

**Notes** 
* All UI components should subscribe to the store to get notified of changing states 
* When navigating away from pages, unsubscribe the UI components that are not part of the new rendered pages 

<code>

    const unsubscribe = store.subscribe(() => {
    console.log("Store changed!", store.getState())
    })

    store.dispatch({
        type: "bugAdded", 
        payload: {
            description: "Bug1"
        }
    })

    unsubscribe()

</code>

* The dispatch function gets the new state after the action from the reducer and notifies the subscribers of the changes made to the state.
* Use constants to define variables you need in many files/places and import them, especially for actions eg. <code>actionTypes</code>
* To dispatch actions, create an <code>actionCreator</code> file that creates all the actions

