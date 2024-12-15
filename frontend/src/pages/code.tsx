import { useState, useEffect } from "react";
import CodeEditor from "@/components/Editor";
import { useLocation } from "react-router-dom";
import PseudoTerminal from "@/components/Terminal";
import axios from "axios";
import { K8S_HTTP_URL } from "@/lib/config";
import queryString from "query-string";




const Code = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [projectId , SetProjectId ] = useState<string>('')
  const [pod , SetPod] = useState<boolean>(false);

  const location = useLocation();
  
  useEffect(() => {
    const queries = queryString.parse(window.location.search);
    console.log(queries);
    SetProjectId(queries?.projectid as string);
    (async () => {
      if(projectId){
        await createPod(projectId)
        SetPod(true)
      }
      setFiles(location.state?.files);
    })();
  }, [projectId]);

  if(!pod){
    return <> Setting up your Project ....</>
  }

  return (
    <>   <div className="h-screen flex">
      {/* File Explorer */}
      <div className="w-64 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-4">
          <h2 className="text-sm font-semibold mb-4">Files</h2>
          {/* {renderFileTree(files ? files : [])} */}
          {/* <FileTree /> */}
        </div>
      </div>
    </div>
      <CodeEditor />
      <div className="mt-12">
        {/* <PseudoTerminal /> */}
      </div>
    </>


  );
};

export default Code;


const createPod = async(projectId:string) =>{
  const res  =await axios.post(`${K8S_HTTP_URL}/k8spod`,{
    projectId
  });
  console.log(res.data)
}