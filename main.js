//GameBoard object, only one is needed so iife it
    //board array, stores cells of playing board
        //Cells should be instances of an object that has a value and maybe methods to change and access that value

//PlayGame will be an object, but inside an iife because we only want one game to be playing
    //an instance of the GameBoard is created, or imported if GameBoard is inside an iife
    //players object holds the players and their name and marker

//DisplayGame will be inside an iife as there will only be one game to display
    //At first this will just output to the console
    //Later we can render html elements using this