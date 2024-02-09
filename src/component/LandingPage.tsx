import * as React from 'react'
import Header from './Header'
import DyanmicComponent from './DyanmicComponent'
import { useState } from 'react';
import {processCommand} from './CommandProcessor'
import { getSchemaObject } from './Helper';
import { useParams } from 'react-router-dom';
export const LandingPage : React.FC = () => {
    const [command, setCommand] = useState('');
    const {viewname} = useParams();
    React.useEffect(()=>{
      if(viewname){
        getSchemaObject(viewname)
        .then((schema)=>{
          localStorage.setItem('viewSchema',JSON.stringify(schema));
        })
        .catch((error)=>{
          console.log('Error fetching schema:',error);
        })
      }
    },[viewname])
    const handleSubmit = (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      processCommand(command)
      setCommand('')
    };
    
    return (
       <>
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
       <DyanmicComponent  />
       </>
    )
}

export default LandingPage;