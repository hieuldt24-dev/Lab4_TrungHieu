import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";
import { fetchExpenses, setEditingExpense } from "../redux/expenseSlice";

function ExpenseTable() {

 const expenses = useSelector(state => state.expenses.filteredList);
 const user = useSelector(state => state.auth.user);
 const dispatch = useDispatch();

 const formatDate = (date) => {

  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
 };

 const handleDelete = async (id) => {

  if (window.confirm("Are you sure you want to delete this expense?")) {
   try {
    await api.delete(`/expenses/${id}`);
    dispatch(fetchExpenses(user.id));
   } catch (error) {
    console.error("Error deleting expense:", error);
   }
  }
 };

 const handleEdit = (expense) => {
  dispatch(setEditingExpense(expense));
  window.scrollTo({ top: 0, behavior: 'smooth' });
 };

 return (

  <div>

   <div className="card p-3">
    <h5 className="card-title">Expense Management</h5>
    
    {expenses.length === 0 ? (
     <p className="text-muted">No expenses found.</p>
    ) : (
     <div className="table-responsive">
      <table className="table table-hover">

       <thead className="table-light">

        <tr>

         <th>Name</th>
         <th>Amount</th>
         <th>Category</th>
         <th>Date</th>
         <th>Actions</th>

        </tr>

       </thead>

       <tbody>

        {expenses.map(e => (

         <tr key={e.id}>

          <td>{e.name}</td>

          <td>
           {Number(e.amount).toLocaleString("vi-VN")} ₫
          </td>

          <td>
           <span className="badge bg-info">{e.category}</span>
          </td>

          <td>{formatDate(e.date)}</td>

          <td>

           <button
            className="btn btn-sm btn-warning me-2"
            onClick={() => handleEdit(e)}
            title="Edit"
           >
            ✏️
           </button>

           <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(e.id)}
            title="Delete"
           >
            🗑️
           </button>

          </td>

         </tr>

        ))}

       </tbody>

      </table>
     </div>
    )}

   </div>

  </div>
 );
}

export default ExpenseTable;