const FPS = 60;

window.onload = Initialize;

var game;

function Initialize()
{    
    game = new Game(document.getElementById("canvas"));
    game.Initialize();

    setInterval(Tick, 1000 / FPS);
};

function Tick()
{
    Update();
    Render();
};

function Update()
{
    Time.Update();
    
    game.Update();

    Input.Update();
};

function Render()
{  
    game.Render();
};
