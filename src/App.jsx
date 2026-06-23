import { useState } from "react";
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
  
const addDeal = () => {
  const newDeal = {
    title,
    discount,
    store,
    description
  };

  setDeals([...deals, newDeal]);
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
    <p>{deal.discount}</p>
    <p>{deal.store}</p>
    <p>{deal.description}</p>
  </div>
))}
</div>
    </div>
  );
}

export default App;