import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CircleFadingPlus } from "lucide-react";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button";
import axios from 'axios';
import { BACKEND_URL, templates } from "@/lib/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




export default function Appbar() {
    const [name , setName ] = useState<string>('');
    const [template,setTemplate] = useState<string>('');

    const navigate = useNavigate();


    const create_new_project = async() =>{
        console.log(name,template)
        if(!name || !template){
            return
        }
        const res = await axios.get(`${BACKEND_URL}/api/v1/project/createnewproject`,{
            params:{
                name,
                template
            },
            headers:{
                token:localStorage.getItem('token')
            }
        })

       

        if(res){
            const id = res.data?.id;
            const files = res.data?.files;


        console.log(id,files)
            navigate(`/${id}`,{
                state:{
                    files
                }
            })
        }

    }

    return <>
        <nav className="flex justify-between w-[82vw] h-14 bg-[#FAFAFA] border-y border-neutral-200 pt-3 pr-3">
            <div>asd1</div>
            <div>

                <Dialog>
                    <DialogTrigger><CircleFadingPlus /></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create new Project</DialogTitle>
                            <DialogDescription className="space-y-4">
                                <Input onChange={(e)=>setName(e.target.value)} placeholder="Enter Project name" />
                                <Select onValueChange={(e)=>setTemplate(e)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="template" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="nodejs">Node js</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button onClick={()=>create_new_project()}>create</Button>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </nav>
    </>
}