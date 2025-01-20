
// Inside an iife ... 

// createPlayer factory function  creates an object that represents each player playing the game , these will have properties like 'wins', 'losses', 'ties', and  'marker' which will be the icon that represents each player ('X' or 'O'), later I'd like to be able to allow users to upload an image they can use as their marker.

// gameboard will be an object 
//     will contain an array of players, 2 for tictactoe
//     will also contain an array which represents the placements/moves on the board, starts as an empty array, users will click on specific gui places to place their marker and this array will fill in as users place their markers



// playTicTacToe is going to be the object that plays the game
//     There will be a method that checks the spots of the board for a winner 


// So first we'll just create 2 players and their markers by default will be X and O, and then the playTicTacToe function is invoked

// I think I'll use an iife for each player, and an iife for the game, which will pull in each player, and initiate playing of the game


