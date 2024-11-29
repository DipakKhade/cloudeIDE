import { BACKEND_URL, token } from "@/lib/config";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Projects() {
  const params = useParams();
  console.log(params);

  useEffect(() => {
    (async () => {
      await getUserProjects();
    })();
  });

  const getUserProjects = async () => {
    const respoonse = await axios.get(
      `${BACKEND_URL}/api/v1/project/projectlist`,
      {
        headers: {
          token,
        },
      }
    );
    console.log(respoonse);
  };
  return <>asd</>;
}
