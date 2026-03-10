import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCategory } from "../redux/expenseSlice";

function FilterCard() {

  const [categories, setCategories] = useState([]);
  const expenses = useSelector(state => state.expenses.list);
  const selectedCategory = useSelector(state => state.expenses.selectedCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    const uniqueCategories = [...new Set(expenses.map(e => e.category))];
    setCategories(uniqueCategories);
  }, [expenses]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    dispatch(setSelectedCategory(category));
  };

  return (
    <div className="card p-3">
      <h5>Filter</h5>
      <select
        className="form-control"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="All categories">All categories</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterCard;