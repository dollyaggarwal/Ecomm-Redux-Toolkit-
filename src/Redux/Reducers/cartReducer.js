import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getADocsFromFirestore, setDataToFirestoreRef } from '../../firebase/firebase';
import toast from 'react-hot-toast';

const initialState = {
	carts:[],
    cartTotal:0,
    finalTotal:0,

};

export const getAllCarts = createAsyncThunk('getAllCarts',async({userId},thunkAPI)=>{
    
   try{
   
    const getCarts = await getADocsFromFirestore("carts", userId);
    thunkAPI.dispatch(setToCart(getCarts.carts))
       
   }catch(error){
    console.log(error)
   } 
}) 

export const addToCarts = createAsyncThunk('addToCarts', async({userId,item},thunkAPI)=>{
    try {
        if(userId){
            thunkAPI.dispatch(getAllCarts({userId}));
            let userCarts =thunkAPI.getState().cartReducer.carts;
            let itemExists = userCarts.find((product)=> product.id === item.id);
            console.log(userCarts)
            if(itemExists){
                const updatedCart = [...userCarts,{...item, qty:item.qty+1}];
                await setDataToFirestoreRef('carts',userId,{
                    carts:updatedCart,
                    updatedAt: new Date().toDateString(),
                }); 
                toast.success("Item added to cart successfully");
            }else{
                const updatedCart = [...userCarts,{...item, qty:1}];
                await setDataToFirestoreRef('carts',userId,{
                    carts:updatedCart,
                    updatedAt: new Date().toDateString(),
                }); 
                toast.success("Item added to cart successfully");
            }
            thunkAPI.dispatch(getAllCarts({userId}));
           
        }else{
            toast.error("Login to add items in cart");
        }
        
    } catch (error) {
        console.log(error)
    }
})
const cartSlice = createSlice ({
    name:'cart',
    initialState,
    reducers:{
       setToCart:(state,action)=>{
        state.carts = action.payload
       },
      
    }
});

export const cartReducer = cartSlice.reducer;
export const {setToCart} = cartSlice.actions;
export const cartSelector = (state)=>state.cartReducer;
