
const TOC = ({ headings }) => {
    console.log(headings);
  return (
  <div className="fixed right-4 top-20 w-64 bg-gray-100 p-2 rounded">
    <h3 className="font-bold mb-2">Nội dung</h3>
    <ul>
      {headings?.map((h) => (
        <li key={h.id}>
          <a href={`#${h.id}`} className="text-blue-600 hover:underline">
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  </div>
    )
  };

export default TOC;