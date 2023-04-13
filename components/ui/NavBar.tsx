import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import { FC, useContext } from 'react';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from "@/context/ui";
import NextLink from "next/link";
export const NavBar: FC = () => {

const {openSideMenu} = useContext(UIContext);

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton size="large" edge="start" onClick={openSideMenu}>
                    <MenuOutlinedIcon />
                </IconButton>
                <NextLink href='/' passHref>
                <Typography variant="h6" sx={{color: 'white'}}>Open Jira</Typography>
                    {/* <Link underline="none" color='white'>
                       
                    </Link> */}
                </NextLink>
            </Toolbar>
        </AppBar>
    )
}