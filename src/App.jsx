import { useState, useEffect } from "react";
function Header() {
  return (
    <div className="flex justify-between p-4 border-b">
      <h1 className="text-2xl font-bold">
        Deal Admin Panel
      </h1>

        </div>
  );
}

function App() {
  const [title, setTitle] = useState("");
  const [store, setStore] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [deals, setDeals] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

useEffect(() => {
  fetch("http://127.0.0.1:5000/deals")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setDeals(data);
    })
    .catch((error) => {
      console.log("FETCH ERROR:", error);
    });
}, []);

const addDeal = async () => {
  const newDeal = {
    title,
    store,
    discount,
    description,
  };

  const response = await fetch("http://localhost:5000/deals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDeal),
  });

  const savedDeal = await response.json();

  setDeals([...deals, savedDeal]);

  setTitle("");
  setStore("");
  setDiscount("");
  setDescription("");
};
const deleteDeal = (indexToDelete) => 
  {
const updatedDeals = deals.filter((deal, index) => {
  return index !== indexToDelete;
});
setDeals(updatedDeals);

};
const editDeal = (index) => {
  setSelectedIndex(index);

  setTitle(deals[index].title);
  setStore(deals[index].store);
  setDiscount(deals[index].discount);
  setDescription(deals[index].description);
};

  return (
    <div>
      <Header />

     <div className="p-6">
  <h2 className="text-xl font-semibold">
    Welcome Admin
  </h2>

  <p className="mt-2">
    Manage your deals here.
  </p>

  <h2 className="text-xl font-semibold mt-6">
    Add New Deal
  </h2>

  <input
  type="text"
  placeholder="Enter deal title"
  value={title}
  onChange={(event) => setTitle(event.target.value)}
  className="border p-2 rounded w-full mt-4"
/>

<p className="mt-2">
  Title State: {title}
</p>

<input
  type="text"
  placeholder="Enter store name"
  value={store}
  onChange={(event) => setStore(event.target.value)}
  className="border p-2 rounded w-full mt-4"
/>

<p className="mt-2">
  Store State: {store}
</p>

<input
  type="text"
  placeholder="Enter discount"
  value={discount}
  onChange={(event) => setDiscount(event.target.value)}
  className="border p-2 rounded w-full mt-4"
/>

<p className="mt-2">
  Discount State: {discount}
</p>

<input
  type="text"
  placeholder="Enter description"
  value={description}
  onChange={(event) => setDescription(event.target.value)}
  className="border p-2 rounded w-full mt-4"
/>

<p className="mt-2">
  Description State: {description}
</p>

<button
  onClick={addDeal}
  className="bg-pink-600 text-white px-4 py-2 rounded"
>
  Add Deal
</button>
{deals.map((deal, index) => (
  <div key={index} className="border p-3 mt-3 rounded">
    <h3>{deal.title}</h3>
    <p>{deal.store}</p>
    <p>{deal.discount}</p>
    <p>{deal.description}</p>
<button className="bg-green-500 text-white px-3 py-1 rounded mr-2"
 onClick={() => editDeal(index)}>
  Edit
</button>
<button
  className="bg-red-500 text-white px-3 py-1 rounded"
  onClick={() => deleteDeal(index)}
>
  Delete
</button>
</div>
))}
</div>
    </div>
  );
}

export default App;