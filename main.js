//GameBoard object, only one is needed so iife it
    //board array, stores cells of playing board
        //Cells should be instances of an object that has a value and maybe methods to change and access that value (value, getValue, setValue)

//PlayGame will be an object, but inside an iife because we only want one game to be playing
    //an instance of the GameBoard is imported and used
    //players object holds the players and their name and marker
    //game play logic:
        //prompt ask /tell the player to choose where they want to place their marker, if already taken tell them its taken and ask them again
        //use a variable to keep track of who's turn it is next
        //use a variable to keep track of how many moves there have been, as there can be ties and we want to end the game in case of that later
        //check for a winner each turn, by parsing over cells and looking for specific combinations of cell values
        //If there is a winner stop the playing and declare a winner, in html you can add a class to highlight the cells of the winning placements. Otherwise keep playing the game

//DisplayGame will be inside an iife as there will only be one game to display
    //At first this will just output to the console
    //Later we can render html elements using this

    //We want to console.log a text representation of our games board