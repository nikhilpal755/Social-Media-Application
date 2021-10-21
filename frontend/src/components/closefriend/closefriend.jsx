import React from 'react'
import { Avatar } from '@mui/material'
import { ListItem, ListItemButton } from '@mui/material';
// dummy data
import { Users } from '../../data'

function Closefriend() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="closefriend">
            {
                Users.map(user =>{
                  return (
                      <ListItem key={user.id}>
                          <ListItemButton>
                            <Avatar alt="" src={`${PF}person/1.png`}/>
                            <span style={{marginLeft:10}}> Nikhil</span>
                          </ListItemButton>
                      </ListItem>
                  )
                })
            }
        </div>
    )
}

export default Closefriend
