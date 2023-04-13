
import { NextPage } from "next"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, Grid } from "@mui/material"

import {EntryList,  NewEntry} from "@/components/ui"


const HomePage: NextPage = () => {
  return (
    <Layout title={'Home open Jira'}>
      <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
              <Card sx={{ height:'calc( 100vh - 100px )'}}>
                  <CardHeader title='Pending'/>
                      {/* Agregar una nueva tarea*/}
                      <NewEntry />
                      {/* Listado en las entrada*/}
                      <EntryList status="pending" />
                 
              </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
              <Card sx={{ height:'calc( 100vh - 100px )'}}>
                  <CardHeader title='In progress'/>
                  <EntryList  status="in-progress"/>
              </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
              <Card sx={{ height:'calc( 100vh - 100px )'}}>
                  <CardHeader title='Complete'/>
                  <EntryList status="finished"/>
              </Card>
          </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage