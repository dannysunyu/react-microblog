export default function RenderArray() {
  const data = [];

  return (
    <>
      <ul>{data.map(element => <li>{element}</li>)}</ul>
      {data.length === 0 &&
        <p>There is nothing to show here.</p>
      }
    </>
  );
}