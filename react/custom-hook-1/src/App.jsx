import Card from "./components/Card";
import { useAxios } from "./hook/useAxios";
import { Constants } from "./constants";

const App = () => {
  const {
    data: posts,
    error: postsError,
    refetch: refetchPosts,
  } = useAxios(Constants.API_URL);

  if (postsError) {
    return (
      <>
        <p>{postsError}</p>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-8 p-12">
        {
          posts &&
          posts.length > 0 &&
          posts.map((posts) => <Card key={posts.id} data={posts} />)
        }
      </div>
    </>
  );
}

export default App;
