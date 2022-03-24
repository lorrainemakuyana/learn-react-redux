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

The goal is to get rid of all the parenthesis in the above statement, and to do that, here are the steps:

<code>

    npm install lodash
    
    import { compose, pipe } from 'lodash/fp' 

    const transform = pipe(trim, toLowerCase, wrapInDiv)

    transform(input)

    // Order matters, so use the pipe function to list the functions in the order 
    you want to apply them. The compose function is a higher order function that 
    takes 3 arguments and returns a new function with the composition of all the functions. 

</code>

#### Curing

