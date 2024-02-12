const Card = ({data}) => {
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src="https://v1.tailwindcss.com/img/card-top.jpg"
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{data.title}</div>
          <p className="text-gray-700 text-base">
            {data.body}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {data.tags.map((tag) =>(
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{tag}
          </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Card;
