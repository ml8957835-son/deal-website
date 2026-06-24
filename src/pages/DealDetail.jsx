import axios from "axios";
import { useParams } from "react-router-dom";

function DealDetail({ deals }) {
  const { id } = useParams();

  const deal = deals.find(
    (d) => d.id === Number(id)
  );
 const claimDeal = async () => {
  try {
    await axios.post("http://localhost:5000/claims", {
      dealId: deal.id,
    });

    alert("Deal claimed successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to claim deal");
  }
};
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
  
   <button
   onClick={claimDeal}
   style={{
    padding: "10px 10px",
    backgroundColor: "#e91e63",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    marginTop: "5px",
  }}
>
  Claim Deal
</button>
  </div>
);  
}

export default DealDetail;