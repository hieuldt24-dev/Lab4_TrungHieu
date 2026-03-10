import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  clearEditingExpense,
  addExpense,
  updateExpense
} from "../redux/expenseSlice"

function AddExpenseForm(){

 const [formData, setFormData] = useState({
  name: "",
  amount: "",
  category: "",
  date: ""
 })
 const [errors, setErrors] = useState({})

 const dispatch = useDispatch()
 const user = useSelector(state => state.auth.user)
 const editingExpense = useSelector(state => state.expenses.editingExpense)

 useEffect(() => {
  if (editingExpense) {
   setFormData({
    name: editingExpense.name,
    amount: editingExpense.amount,
    category: editingExpense.category,
    date: editingExpense.date
   })
  }
 }, [editingExpense])

 const validateForm = () => {
  const newErrors = {}

  if (!formData.name.trim()) {
   newErrors.name = "Name is required"
  }

  if (!formData.category.trim()) {
   newErrors.category = "Category is required"
  }

  const amount = Number(formData.amount)
  if (!formData.amount || amount <= 0) {
   newErrors.amount = "Amount must be greater than 0"
  }

  if (!formData.date) {
   newErrors.date = "Date is required"
  }

  return newErrors
 }

 const handleInputChange = (e) => {
  const { name, value } = e.target
  setFormData(prev => ({
   ...prev,
   [name]: value
  }))
  if (errors[name]) {
   setErrors(prev => ({
    ...prev,
    [name]: ""
   }))
  }
 }

 const handleSubmit = async (e) => {
  e.preventDefault()

  const newErrors = validateForm()
  if (Object.keys(newErrors).length > 0) {
   setErrors(newErrors)
   return
  }

  // prepare expense payload (convert amount to number and attach user)
  const payload = {
    ...formData,
    amount: Number(formData.amount),
    userId: user?.id
  }

  try {
     if (editingExpense) {
       // update existing expense through thunk (handles offline/online)
       await dispatch(updateExpense({ id: editingExpense.id, expense: payload })).unwrap()
     } else {
       // add new expense through thunk
       await dispatch(addExpense(payload)).unwrap()
     }

     // reload list to make sure state is in sync

     setFormData({
       name: "",
       amount: "",
       category: "",
       date: ""
     })
     setErrors({})
     dispatch(clearEditingExpense())
  } catch (error) {
     console.error("Error saving expense:", error)
  }
 }

 const handleCancel = () => {
   setFormData({
     name: "",
     amount: "",
     category: "",
     date: ""
   })
   setErrors({})
   dispatch(clearEditingExpense())
 }

 return (
  <form onSubmit={handleSubmit}>
   <div className="mb-3">
    <label className="form-label">Name</label>
    <input
     type="text"
     className={`form-control ${errors.name ? 'is-invalid' : ''}`}
     name="name"
     value={formData.name}
     onChange={handleInputChange}
     placeholder="Enter expense name"
    />
    {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
   </div>

   <div className="mb-3">
    <label className="form-label">Amount</label>
    <input
     type="number"
     className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
     name="amount"
     value={formData.amount}
     onChange={handleInputChange}
     placeholder="Enter amount"
    />
    {errors.amount && <div className="invalid-feedback d-block">{errors.amount}</div>}
   </div>

   <div className="mb-3">
    <label className="form-label">Category</label>
    <select
     className={`form-control ${errors.category ? 'is-invalid' : ''}`}
     name="category"
     value={formData.category}
     onChange={handleInputChange}
    >
     <option value="">Select category</option>
     <option value="Food">Food</option>
     <option value="Utilities">Utilities</option>
     <option value="Entertainment">Entertainment</option>
     <option value="Health">Health</option>
     <option value="Transport">Transport</option>
     <option value="Other">Other</option>
    </select>
    {errors.category && <div className="invalid-feedback d-block">{errors.category}</div>}
   </div>

   <div className="mb-3">
    <label className="form-label">Date</label>
    <input
     type="date"
     className={`form-control ${errors.date ? 'is-invalid' : ''}`}
     name="date"
     value={formData.date}
     onChange={handleInputChange}
    />
    {errors.date && <div className="invalid-feedback d-block">{errors.date}</div>}
   </div>

   <div className="d-grid gap-2">
    <button
     type="submit"
     className="btn btn-primary"
    >
     {editingExpense ? "Update Expense" : "Add Expense"}
    </button>
    {editingExpense && (
     <button
      type="button"
      className="btn btn-secondary"
      onClick={handleCancel}
     >
      Cancel
     </button>
    )}
   </div>
  </form>
 )
}

export default AddExpenseForm