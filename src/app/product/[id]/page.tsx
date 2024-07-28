type Params = { params: { id: string } };

export default function ProductPage({ params: { id } }: Params) {
  return <p>{id}</p>;
}
