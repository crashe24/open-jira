import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { FC, useContext } from "react"
import AllInboxIcon from '@mui/icons-material/AllInbox';
const menuItem: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

import { UIContext } from "@/context/ui";

export const SideBar:FC = () => {

  const {sidemenuOpen,closeSideMenu} = useContext(UIContext);


  return (
    <Drawer anchor="left" open={sidemenuOpen} 
        onClose={ closeSideMenu }>

            <Box sx={{ width:'250px'}}>

                <Box sx={{ padding:'5px 10px'}}>
                    <Typography variant="h4">Menu</Typography>
                </Box>
                <List>
                        {menuItem.map( (text, index)=> (
                            <ListItem key={text}>
                                <ListItemIcon >
                                    {index%2?<AllInboxIcon />: <ForwardToInboxIcon />} 
                                </ListItemIcon>
                                <ListItemText primary={text}/> 
                            </ListItem>
                        ))}
                </List>
                <Divider />
                <List>
                        {menuItem.map( (text, index)=> (
                            <ListItem key={text}>
                                <ListItemIcon >
                                    {index%2?<AllInboxIcon />: <ForwardToInboxIcon />} 
                                </ListItemIcon>
                                <ListItemText primary={text}/> 
                            </ListItem>
                        ))}
                </List>
            </Box>
    </Drawer>
  )
}


