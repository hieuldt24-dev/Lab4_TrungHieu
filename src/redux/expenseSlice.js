import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { expenses as mockExpenses } from "../data/expenses";

// in-memory copy used for offline mode (doesn't persist across reloads)
let localExpenses = [...mockExpenses];

export const fetchExpenses = createAsyncThunk(
 "expenses/fetch",
 async(userId)=>{
   // try real backend first (baseURL nonempty); if request fails
   // (server not running, network error, etc.) fall back to in-memory data.
   if (api.defaults.baseURL) {
     try {
       const res = await api.get(`/expenses?userId=${userId}`)
       return res.data
     } catch (err) {
       console.warn("fetchExpenses network failed, using local mock data", err)
       return localExpenses.filter(e => e.userId === userId);
     }
   }
   // explicit offline mode
   return localExpenses.filter(e => e.userId === userId);
 }
)

export const addExpense = createAsyncThunk(
 "expenses/add",
 async(expense)=>{
   if (api.defaults.baseURL) {
     try {
       const res = await api.post("/expenses", expense)
       return res.data
     } catch (err) {
       console.warn("addExpense network failed, saving locally", err)
       // fall through to offline handling
     }
   }
   const newId = localExpenses.length ? Math.max(...localExpenses.map(e=>e.id)) + 1 : 1;
   const newExpense = { ...expense, id: newId };
   localExpenses.push(newExpense);
   return newExpense;
 }
)

export const updateExpense = createAsyncThunk(
 "expenses/update",
 async({id, expense})=>{
   if (api.defaults.baseURL) {
     try {
       const res = await api.put(`/expenses/${id}`, expense)
       return res.data
     } catch (err) {
       console.warn("updateExpense network failed, updating locally", err)
       // fall through to offline logic
     }
   }
   const idx = localExpenses.findIndex(e=>e.id===id);
   if (idx !== -1) {
     localExpenses[idx] = { ...localExpenses[idx], ...expense };
     return localExpenses[idx];
   }
   throw new Error("Expense not found");
 }
)

export const deleteExpense = createAsyncThunk(
 "expenses/delete",
 async(id)=>{
   if (api.defaults.baseURL) {
     try {
       await api.delete(`/expenses/${id}`)
       return id
     } catch (err) {
       console.warn("deleteExpense network failed, removing locally", err)
       // fall through to offline logic
     }
   }
   localExpenses = localExpenses.filter(e=>e.id!==id);
   return id;
 }
)

const expenseSlice = createSlice({
 name:"expenses",
 initialState:{
   list:[],
   filteredList:[],
   selectedCategory: "All categories",
   editingExpense: null
 },
 reducers:{
   setSelectedCategory:(state, action)=>{
     state.selectedCategory = action.payload
     if(action.payload === "All categories"){
       state.filteredList = state.list
     }else{
       state.filteredList = state.list.filter(e => e.category === action.payload)
     }
   },
   setEditingExpense:(state, action)=>{
     state.editingExpense = action.payload
   },
   clearEditingExpense:(state)=>{
     state.editingExpense = null
   }
 },
 extraReducers:(builder)=>{
  builder
    .addCase(fetchExpenses.fulfilled,(state,action)=>{
      state.list = action.payload
      if(state.selectedCategory === "All categories"){
        state.filteredList = action.payload
      }else{
        state.filteredList = action.payload.filter(e => e.category === state.selectedCategory)
      }
    })
    .addCase(addExpense.fulfilled,(state,action)=>{
      // append new expense
      state.list.push(action.payload)
      if(state.selectedCategory === "All categories" || action.payload.category === state.selectedCategory){
        state.filteredList.push(action.payload)
      }
    })
    .addCase(updateExpense.fulfilled,(state,action)=>{
      const updated = action.payload
      const idx = state.list.findIndex(e=>e.id===updated.id)
      if(idx !== -1) state.list[idx] = updated

      const fidx = state.filteredList.findIndex(e=>e.id===updated.id)
      if(fidx !== -1) {
        // if the updated item still belongs in the current filter, replace it
        if(state.selectedCategory === "All categories" || updated.category === state.selectedCategory) {
          state.filteredList[fidx] = updated
        } else {
          // category changed out of the filter, remove it
          state.filteredList.splice(fidx,1)
        }
      } else if(state.selectedCategory === "All categories" || updated.category === state.selectedCategory){
        state.filteredList.push(updated)
      }
    })
    .addCase(deleteExpense.fulfilled,(state,action)=>{
      const id = action.payload
      state.list = state.list.filter(e=>e.id!==id)
      state.filteredList = state.filteredList.filter(e=>e.id!==id)
    })
 }
})

export const { setSelectedCategory, setEditingExpense, clearEditingExpense } = expenseSlice.actions
export default expenseSlice.reducer