a scratch pad of snippets and expriments relating to schema, validation and project structure

the site mutation is fully(ish) implemented to the extent of running some server validations and updating / inserting new records
the user mutation is more of a test of the performance of enums - the postion field is generated from an enum based on 5000 mocked up position 
records with a view to testing what happens when an associated enum list is quite long
the position records are more or less redundant for the purposes of the excercise.
one of the challenges here is structuring the project.

the project is also interested in what is required to debug this project in Visual Studio code.  Most examples are based on ecmascript 5 examples with babel. Seems that babel needs to "compile"
the code (i.e. turn the ecmascript 6 into ecmascript5) so it took some fiddling with the config to make it work however the upshot is that there is a .vs specific directory in the project now - 
not sure if this is a viable thing or not yet. There is also a typings directory that is used to help vs with intellisense. 

re running this from VS - in theory, if you open vs code from the root of the project directory, you should be able to hit f5 and run the project - tho there may be 
a requirement to install locally some npm packages


  