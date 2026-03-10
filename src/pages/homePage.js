import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../redux/expenseSlice";

import Header from "../components/header";
import Footer from "../components/footer";
import AddExpenseForm from "../components/addExpenseForm";
import ExpenseTable from "../components/expenseTable";
import TotalCard from "../components/totalCard";
import FilterCard from "../components/filter";

function HomePage() {

 const dispatch = useDispatch();
 const user = useSelector(state => state.auth.user);
 
 useEffect(() => {

  if (user) {
   dispatch(fetchExpenses(user.id));
  }

 }, [dispatch, user]);

 return (

  <div>

   <Header />


   <div className="container mt-3">

    {/* first row: total and filter side by side */}
    <div className="row mb-3">
      <div className="col-md-6">
        <TotalCard />
      </div>
      <div className="col-md-6">
        <FilterCard />
      </div>
    </div>

    {/* second row: form on left, table on right */}
    <div className="row">
      <div className="col-md-4">
        <AddExpenseForm />
      </div>
      <div className="col-md-8">
        <ExpenseTable />
      </div>
    </div>

   </div>

   <Footer />


  </div>
 );
}

export default HomePage;