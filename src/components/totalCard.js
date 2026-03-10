import { useSelector } from "react-redux";

function TotalCard() {

  const expenses = useSelector(state => state.expenses.filteredList);

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div className="card p-4 bg-light">
      <h5 className="mb-0">Total of Expenses</h5>
      <h3 className="text-primary mt-2">
        {total.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND"
        })}
      </h3>
    </div>
  );
}

export default TotalCard;