# Gam'z

> Version 1.4 :memo:  
> An application which group several little games as Tic Tac Toe, Hangman and Memory.

## How to use it ?

You can try the app : https://nicolas-deleforge.fr/my-apps/gamz/  
Or download it : https://github.com/n-deleforge/gamz/archive/main.zip  
Or clone the git : ```git clone https://github.com/n-deleforge/gamz.git```

# Note for self-host

If you download or clone the project to host it yourself, then you'll need [**Little JS**](https://github.com/n-deleforge/littleJS) at the line 5 of `_footer.php`. Also, I do not upload the web manifest and the service worker on Github but they are still present at the line 5 and 129 of `core.js`.

# Changelog

- 1.4 : Nothing really news about the games but the application has been kinda rewritten. I added some PHP to simplify futures updates. I cleaned CSS files a lot too. For now, scores and stats are not displayed but they are saved in localstorage anyway.
- 1.3 : Again a big app rewriting with CSS and JS cleaning. Hangman comeback with a virtual keyboard. TicTacToe modified a bit.
- 1.2 : Big rewriting of the app, some fixes in the JS code and better readability, CSS variables added, hangout removed in waiting to make it better on the mobile version
- 1.1 : Initial release
