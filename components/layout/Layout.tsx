import { NextPage } from "next"

import Head from "next/head"
import { Box } from "@mui/material"
import { NavBar, SideBar } from "../ui"



interface Props {
    title?:string
}
export const Layout: NextPage<Props> = ({title ='OpenJira', children}) => {
  return (
    <Box sx={{
            flexFlow:1
    }} >
        <Head>
            <title>{title}</title>
        </Head>
        {/* NavBar*/}
            <NavBar />
        {/* SideBar*/}
            <SideBar  />
        <Box sx={{
            padding: '10px 20px'
        }}>
            {children}
        </Box>
    </Box>
  )
}

