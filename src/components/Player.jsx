import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName)
  const [isEditing, setIsEditing] = useState(false);

  function handelChange(event){
    setPlayerName(event.target.value);
  }

  function handelEditClick(){
    setIsEditing((editing) => !editing);
    
    if(isEditing){
      onChangeName(symbol, playerName);
    }
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if(isEditing){
    editablePlayerName = <input type="text" required onChange={handelChange} value={playerName} />;
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handelEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
