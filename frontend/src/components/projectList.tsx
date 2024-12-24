import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { BACKEND_URL } from "@/lib/config"
import axios from "axios"
import { useEffect, useState } from "react"
import { AppSidebar } from "./app-sidebar"

export const ProjectList =() =>{

    return <>
   {/* <div>
    <div className="p-2 space-x-2 space-y-2 flex mt-24">
      <div className="mb-12">
        <TableComponent/>
      </div>
    </div>
  </div> */}
   <main className="flex">
          <AppSidebar/>
          <TableComponent/>
      </main>

    </>
}


const TableComponent = () =>{
    const [project , SetProjects ] =useState([]);

    useEffect(()=>{
        (async()=>{
            const response = await axios.get(`${BACKEND_URL}/api/v1/project/projectlist`)
            const {data} = response
            SetProjects(data?.data)
            console.log(data)
        })();
    },[])
    return <>
     <Table>
  <TableCaption>A list of your Projects.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[400px]">Id</TableHead>
      <TableHead>Project Name</TableHead>
      <TableHead>Project type</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    
        {project && project?.map((i:any)=>(
            <>
            <TableRow>
            <TableCell>{i?.id}</TableCell>
            <TableCell>{i?.name}</TableCell>
            <TableCell>{i?.language}</TableCell>
            </TableRow>
            </>
        ))}
      
  </TableBody>
</Table>
    </>
}