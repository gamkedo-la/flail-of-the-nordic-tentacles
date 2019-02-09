//All Characters position/collisions related
function moveCharIfAble(tileType)
{
  switch(tileType)
  {
    case TILE_OCEAN:
    case TILE_TREE:
    case TILE_MOUNTAIN:
    case TILE_MT_ENTRY_DOOR:
    case TILE_FOREST_ENTRY_DOOR:
    case TILE_BEACH_ENTRY_DOOR:
    case TILE_FOREST_EXIT_DOOR:
    case TILE_MT_EXIT_DOOR:
    case TILE_BEACH_EXIT_DOOR:
    case TILE_FOREST_TREES_1:
    case TILE_FOREST_TREES_2:
    case TILE_FOREST_TREES_3:
    case TILE_FOREST_TREES_4:
    case TILE_FOREST_TREES_5:
    case TILE_FOREST_TREES_6:
    case TILE_FOREST_TREES_7:
    case TILE_FOREST_TREES_8:
    case TILE_FOREST_TREES_9:
    case TILE_FOREST_TREES_10:
    case TILE_FOREST_TREES_11:
    case TILE_FOREST_TREES_12:
    case TILE_FOREST_TREES_13:
    case TILE_FOREST_TREES_14:
    case TILE_FOREST_BIGTREE_1:
    case TILE_RITUAL_TREE:
    case TILE_SNOWY_BUSH:
    case TILE_SNOWY_PIT:
    case TILE_TENT:
    case TILE_SML_BUSH:
    case TILE_ICE_14:
    case TILE_SNOW_DUNE_1:
    case TILE_SNOW_DUNE_2:
    case TILE_SNOW_DUNE_3:
    case TILE_SNOW_DUNE_4:
    case TILE_SNOW_DUNE_5:
    case TILE_SNOW_DUNE_6:
    case TILE_SNOW_DUNE_7:
    case TILE_SNOW_DUNE_8:
    case TILE_SNOW_DUNE_9:
    case TILE_SNOW_DUNE_10:
    case TILE_SNOW_DUNE_11:
    case TILE_SNOW_DUNE_12:
      return false;
      break;
    default:
      return true;
      break;
  }
}

function moveCharacters()
{
  player.move();
  for(var i = 0; i < enemiesList.length; i++)
  {
    enemiesList[i].move();
  }
  if(respawnTimerFrames > 0)
  {
    respawnTimerFrames--;
    if(respawnTimerFrames <= 0)
    {
      randomSpawn();
      if(enemiesList.length < enemiesInAreaCount)
      {
        respawnTimerFrames = FRAME_DELAY_RESPAWN;
      }
    }
  }
}

function handleCharacterPositions(whichLevel)
{
  if(gameIsRunning)
  {
    player.hasEnterAnotherLevel = true;
    clearSpawnList();
    enemiesStartSpots = [];
    enemiesList = [];

    for(var i = 0; i < allLvls[whichLevel].enemies.length; i++)
    {
      addEnemyToSpawnList(allLvls[whichLevel].enemies[i].x,allLvls[whichLevel].enemies[i].y, allLvls[whichLevel].enemies[i].charType);
    }

    if(allLvls[whichLevel].levelName == 'forestTest')
    {
       seer.reset();
       outcast.reset();
    }

    player.reset();
    findSpawnSpots();
    popEnemyList();
    player.hasEnterAnotherLevel = false;
  }
	else //editor mode
  {
    //delete previously loaded map spawn points
    clearSpawnList();

    for(var i = 0; i < allLvls[whichLevel].enemies.length; i++)
    {
      addEnemyToSpawnList(allLvls[whichLevel].enemies[i].x,allLvls[whichLevel].enemies[i].y, allLvls[whichLevel].enemies[i].charType);
    }
  }
}

function setupCharacters()
{
  for(var i = 0; i < allLvls[0].enemies.length; i++)
  {
    addEnemyToSpawnList(allLvls[0].enemies[i].x,allLvls[0].enemies[i].y, allLvls[0].enemies[i].charType);
  }

  player.init(vikingPic, "Ragnar", footStepsPic);
  seer.init(seerPic,"The Seer",TILE_SEER);
  outcast.init(outcastPic,"The Outcast",TILE_OUTCAST);

  findSpawnSpots();
  popEnemyList();
  for(var i = 0; i < enemiesList.length; i++)
  {
    enemiesList[i].init("Enemy " + i);
  }
}