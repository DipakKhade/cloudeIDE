import FolderTree, { testData } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';

const initState = {
  // reserved keys, can customize initial value
  name: 'root node',
  checked: 1,
  isOpen: true,
  children: [],

  // internal keys (auto generated), plz don't include them in the initial data
  path: [],    // path is an array of indexes to this node from root node
  _id: 0,

  // not reserved, can carry any extra info about this node
  nickname: 'pikachu',
  url: 'url of this node',
}

export const FileTree = () => {
  const onTreeStateChange = (state, event) => console.log(state, event);

  return (
    // <FolderTree
    //   data={initState}
    //   onChange={onTreeStateChange}
    // />
    <>
      asd
    </>
  );
};
