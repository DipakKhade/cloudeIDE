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
    const [name, setName] = useState<string>('');
    const [template, setTemplate] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate();


    const create_new_project = async () => {
        console.log(name, template)
        setLoading(true)
        if (!name || !template) {
            return
        }
        const res = await axios.get(`${BACKEND_URL}/api/v1/project/createnewproject`, {
            params: {
                name,
                template
            },
            headers: {
                token: getState().firebase.auth.stsTokenManager.accessToken
            }
        })



        if (res) {
            const id = res.data?.id;
            const files = res.data?.files;
            setLoading(false)
            console.log(id, files)
            navigate(`/${id}`, {
                state: {
                    files
                }
            })
        }
        setLoading(false)

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
                                <Input onChange={(e) => setName(e.target.value)} placeholder="Enter Project name" />
                                <Select onValueChange={(e) => setTemplate(e)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="template" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="nodejs">Node js</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button onClick={() => create_new_project()}>
                                    {loading ? <div className='inline-block' role='status' aria-label='loading'>
                                        <svg className='w-6 h-6 stroke-slate-100 animate-spin ' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                            <g clipPath='url(#clip0_9023_61563)'>
                                                <path d='M14.6437 2.05426C11.9803 1.2966 9.01686 1.64245 6.50315 3.25548C1.85499 6.23817 0.504864 12.4242 3.48756 17.0724C6.47025 21.7205 12.6563 23.0706 17.3044 20.088C20.4971 18.0393 22.1338 14.4793 21.8792 10.9444' stroke='stroke-current' strokeWidth='1.4' strokeLinecap='round' className='my-path'></path>
                                            </g>
                                            <defs>
                                                <clipPath id='clip0_9023_61563'>
                                                    <rect width='24' height='24' fill='white'></rect>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <span className='sr-only'>Loading...</span>
                                    </div> : 'create'}
                                </Button>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </nav>
    </>
}
