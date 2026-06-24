import { useParams } from "react-router-dom";

function DealDetail({ deals }) {
  const { id } = useParams();

  const deal = deals.find(
    (d) => d.id === Number(id)
  );

  if (!deal) {
    return <h2>Deal not found</h2>;
  }

 return (
  <div>
    <h1>{deal.title}</h1>

    <p>ID: {deal.id}</p>
    <p>Store: {deal.store}</p>
    <p>Discount: {deal.discount}</p>
    <p>Description: {deal.description}</p>
  
  <button>Claim Deal</button>

  </div>
);  
}

export default DealDetail;