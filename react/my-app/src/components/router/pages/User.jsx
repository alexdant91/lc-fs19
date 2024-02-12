import { useLocation, useParams , useSearchParams } from "react-router";

const users = [
  {
    id: 1,
    full_name: "Francesco",
    age: 23,
  },
  {
    id: 2,
    full_name: "Alessio",
    age: 23,
  },
  {
    id: 3,
    full_name: "Raffaele",
    age: 23,
  },
];

const User = () => {
  const params = useParams();
  const [query, setQuery] = useSearchParams()
  const location = useLocation();
  console.log(location);
  const user = users.find((item) => item.id == params.user_id);

  const handleClick = () => {
    setQuery({ ...Object.fromEntries(query), page: Math.round(Math.random() * 100), is_active: true })
  }

  return (
    <>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(Object.fromEntries(query), null, 2)}</pre>
      <button onClick={handleClick}>Change</button>
    </>
  );
};

export default User;
