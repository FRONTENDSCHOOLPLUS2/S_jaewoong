import useFetch from '@hooks/useFetch';
import { useNavigate } from 'react-router-dom'

export default function ListItem() {
  const navigate = useNavigate();
  const fetchItems = useFetch("/posts");

  const postItems = fetchItems.data?.item;
  
  const onClickDetail = (id) => {
    navigate(`/info/${id}`)
  }
  return (
    <>
      {postItems?.map((v, i) => {
        return (
          <tr
            className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
            key={v._id}
          >
            <td className="p-2 text-center">{i + 1}</td>
            <td
              className="p-2 truncate indent-4 cursor-pointer"
              onClick={() => onClickDetail(v._id)}
            >
              {v.title}
            </td>
            <td className="p-2 text-center truncate">{v.user.name}</td>
            <td className="p-2 text-center hidden sm:table-cell">{v.views}</td>
            <td className="p-2 text-center hidden sm:table-cell">
              {v.repliesCount}
            </td>
            <td className="p-2 truncate text-center hidden sm:table-cell">
              {v.createdAt}
            </td>
          </tr>
        );})}
    </>
  );
}