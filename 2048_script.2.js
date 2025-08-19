document.addEventListener('DOMContentLoaded',()=>{
    const gridDisplay=document.getElementById('grid');
    const width=4;
    const tileSize=60;
    let grid=[];
    let tileId=0;
    
    function initGrid(){
        for(let i=0; i<width; i++){
                grid[i]=[];
                for(let j=0; j<width; j++){

                    grid[i][j]=null;
                }
            }
            addNewTile();
            addNewTile();


    }
    function addNewTile(){
        let emptyCells=[];
        for(let i=0; i<width;i++){
            for(let j=0; j<width;j++){
                if (grid[i][j]===null){
                    emptyCells.push({x:i,y:j});

                }
                
            }
        }
        if (emptyCells.length===0){
            return
        }
        let randomCell=emptyCells[Math.floor(Math.random()*emptyCells.length)];
        let value=Math.random()<0.9?2:4;
        let tile= createTile(value);
        grid[randomCell.x][randomCell.y]=tile;
        setTilePosition(tile,randomCell.x,randomCell.y);

    }
    function createTile(value){
        let tile=document.createElement('div');
        tile.classlist.add('tile');
        tile.setAttribute('data-value',value);
        tile.innerHTML=value;
        tile.id='tile-'+tileId++;
        gridDisplay.appendChild(tile);
        return tile;

    }
    function setTilePosition(tile,x,y){
        tile.style.transform=`translate(${y*tileSize}px,${x*tileSize}px)`;

    }
    initGrid();
});