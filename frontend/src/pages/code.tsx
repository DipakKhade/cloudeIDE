import { useState, useEffect } from "react";
import { Folder, File, ChevronRight, ChevronDown} from "lucide-react";
import CodeEditor from "@/components/Editor";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { useLocation } from "react-router-dom";
import PseudoTerminal from '../components/Terminal'

const Code = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const location = useLocation();
  console.log('location.state--',location.state);

  useEffect(() => {
    (async () => {
      setFiles(location.state?.files);
    })();
  }, []);

  const toggleFolder = (id: any) => {
    setFiles((prevFiles) => {
      const updateFiles = (items: any) => {
        return items.map((item: any) => {
          if (item.id === id) {
            return { ...item, isOpen: !item.isOpen };
          }
          if (item.children) {
            return { ...item, children: updateFiles(item.children) };
          }
          return item;
        });
      };
      return updateFiles(prevFiles);
    });
  };

  // async function getFiles() {
  //   const res = await axios.get(
  //     `${BACKEND_URL}/api/v1/project/getstartercode`,
  //     {
  //       data: {
  //         template: "nodejs",
  //       },
  //       headers:{
  //         token : localStorage.getItem('token')
  //       }
  //     }
  //   );
  //   console.log(res);
  //   const files = res.data.files;
  //   return files;
  // }

  const renderFileTree = (items: any[]) => {
    console.log("item is this", items);
    return items?.map((item) => (
      <div key={item.id} className="ml-4">
        <div
          className={`flex items-center p-1 hover:bg-gray-100 rounded cursor-pointer ${
            selectedFile === item.id ? "bg-blue-100" : ""
          }`}
          onClick={() =>
            item.type === "folder"
              ? toggleFolder(item.id)
              : setSelectedFile(item.id)
          }
        >
          {item.type === "folder" &&
            (item.isOpen ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            ))}
          {item.type === "folder" ? (
            <Folder size={16} className="mr-2 text-blue-500" />
          ) : (
            <File size={16} className="mr-2 text-gray-500" />
          )}
          <span className="text-sm">{item.name}</span>
        </div>
        {item.type === "folder" && item.isOpen && item.children && (
          <div className="ml-2">{renderFileTree(item.children)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="h-screen flex">
      {/* File Explorer */}
      <div className="w-64 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-4">
          <h2 className="text-sm font-semibold mb-4">Files</h2>
          {renderFileTree(files ? files : [])}
        </div>
      </div>

<div className="w-[45vw]">
      {/* <CodeEditor /> */}
</div>

    <div className="w-[25vw]">
      <PseudoTerminal/>
    </div>
    </div>
  );
};

export default Code;
