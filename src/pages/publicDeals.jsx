import { useEffect, useState } from "react";

function PublicDeals() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/deals")
      .then((response) => response.json())
      .then((data) => {
        setDeals(data);
      })
      .catch((error) => {
        console.log("FETCH ERROR:", error);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Public Deals Page
      </h1>

      {deals.map((deal) => (
        <div
          key={deal.id}
          className="border p-3 rounded mb-3"
        >
          <h3>{deal.title}</h3>
          <p>Store: {deal.store}</p>
          <p>Discount: {deal.discount}</p>
          <p>{deal.description}</p>
        </div>
      ))}
    </div>
  );
}

export default PublicDeals;