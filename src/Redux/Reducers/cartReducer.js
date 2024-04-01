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
            let userCarts =thunkAPI.getState().cartReducer.carts;
            let itemExists = userCarts.find((product)=> product.id === item.id);
            console.log(userCarts)

            if(!itemExists){
                const updatedCart = [...userCarts,{...item, qty:1}];
                console.log(updatedCart)
                await setDataToFirestoreRef('carts',userId,{
                    carts:updatedCart,
                    updatedAt: new Date().toDateString(),
                }); 
                toast.success("Item added to cart successfully");
                thunkAPI.dispatch(getAllCarts({userId}));
            }else{
                const updatedCart = userCarts.map((product)=>
                product.id === item.id ? {...product, qty:product.qty+1} : product );
                console.log(updatedCart)
                await setDataToFirestoreRef('carts',userId,{
                    carts:updatedCart,
                    updatedAt: new Date().toDateString(),
                }); 
                toast.success("Item added to cart successfully");
            }
            thunkAPI.dispatch(getAllCarts({userId}));
           
        }else{
            toast.error("Please login to add items in your cart");
        }
        
    } catch (error) {
        console.log(error)
    }
})

export const removeFromCarts = createAsyncThunk('removeFromCarts', async({userId,itemId},thunkAPI)=>{
    try {
        
            if(userId){      
                let userCarts =thunkAPI.getState().cartReducer.carts;
                let itemExists = userCarts.find((product)=> product.id === itemId);
                if(itemExists){
                    const updatedCart = userCarts.filter((item) => item.id !== itemId);
                    await setDataToFirestoreRef('carts',userId,{
                        carts:updatedCart,
                        updatedAt: new Date().toDateString(),
                    }); 
                    toast.error("Item removed from cart successfully");
                    thunkAPI.dispatch(getAllCarts({userId}));
                }      
    }else {
        toast.error('Please log in to remove items from your cart.');
    }
}catch(error){
    console.log(error);
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
