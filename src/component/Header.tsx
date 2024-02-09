import React from 'react'
import { useState } from 'react';
import {processCommand} from './CommandProcessor'


export const Header : React.FC = () => {
    
  const [command, setCommand] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    processCommand(command)
    setCommand('')
  };

  return (
     <div style={ {background:'#586b7f',minHeight:'60%',padding : '5px'} }>
      <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="command"
          name="command"
          value={command}
          placeholder='enter command here !!!'
          onChange={event => setCommand(event.target.value)}
          autoComplete="off"
          style={ {width:'40%',marginLeft:'55%', marginTop : '4%'}}
        />
      </form>
    </div>
    </div>
  );
}

export default Header