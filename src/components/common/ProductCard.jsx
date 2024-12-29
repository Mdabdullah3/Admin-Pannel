const ProductCard = ({ product, onSelect, onRemove, isSelected }) => {
  return (
    <div
      className={`border p-4 rounded ${
        isSelected ? "bg-gray-200" : "bg-white"
      }`}
    >
      <h4 className="font-semibold capitalize">{product.name}</h4>
      <p>{product.category}</p>
      <button
        className={`mt-2 p-2 rounded ${
          isSelected ? "bg-red-500 text-white" : "bg-blue-500 text-white"
        }`}
        onClick={() => (isSelected ? onRemove(product._id) : onSelect(product))}
        disabled={isSelected}
      >
        {isSelected ? "Remove" : "Select"}
      </button>
    </div>
  );
};

export default ProductCard;
