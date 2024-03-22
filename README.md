# Task-Fragmentation
Assignment to test the fragmentation ability of Developers

My Pick - Picked both Fragmentation of Functinality and UI that means created both compenents and hooks 

## My Reasons for Fragmentating it like that

Firstly, need to understand the given code carefully and plan how to fragment the code

There are  two major things to look into the code before fragmentation

  1) Identify the code that is performing any specific task like making an API call and storing that response in some state or performing some special calculation. Can create a hook for the block of code like this
      
      The hooks I have created are 

      i) useCoinData 
      Reason : This block code makes an API call and response is stored in specific state, as it has its custom functionality, I have created a hook for it.
     ii) useExecuteBurn
      Reason : This block of code has its own functionality, where it checks some specific conditions and perform some specific tasks based on those conditions, hence I have created a hook for it
     iii) useRefetchTransactions
      Reason : This block of code fetches Transactions and updates it in burnTransactions, it has its own purpose hence a dedicated hook is created for it
     iv) useSetBurnTransactions
      Reason : This block of code sets the burnTransactions, it has its own requirement, so felt it should be a hook

  2) Identify the code that which is returning some tsx or we can also say, which is rendering something to UI. This code can be turn to be a component because component is nothing but a function which return some part of UI(tsx/jsx).

     The components I have created

     i) BurnButtonBar
     ii) BurnStatsContainer
     iii) DashBoardLayoutStyled

     Each component has its part of tsx which is contributing to the whole UI, BurnButtonBar and BurnStatsContainer is the part of DashBoardLayoutStyled Component

Important thing is while fragmenting we need to take care of the variables that specific hook or component is depending on. 
In case of components we can pass variables and functions as props from one component to other and in case of hooks we need to declare the hook in appropriate way and we can also import varibles and functions from other hooks or files of the project
Need to mention all the imports and exports carefully

After all, why fragmentation ?

We fragment the code because it is hard to break a bunch of sticks all at once, but we can easily break all sticks one at a time. In the same way it hard to understand, debug the code if it is not fragmented in a readable and modular way. 
Here we follow divide and conquer method by breaking the code into different components which is easy to read, understand, debug and maintain.
Writing code is an art, we need to write modular, readable, understanable code rather than all code at same place.
   


