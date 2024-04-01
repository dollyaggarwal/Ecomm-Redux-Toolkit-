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
    thunkAPI.dispatch(setToCart(getCarts.carts));
    thunkAPI.dispatch(findCartTotal());
    thunkAPI.dispatch(findFinalTotal());
       
   }catch(error){
    console.log(error)
   } 
}) 

export const addToCarts = createAsyncThunk('addToCarts', async({userId,item},thunkAPI)=>{
    try {
        if(userId){      
            let userCarts =thunkAPI.getState().cartReducer.carts;
            let itemExists = userCarts.find((product)=> product.id === item.id);

            if(!itemExists){
                const updatedCart = [...userCarts,{...item, qty:1}];
             
                await setDataToFirestoreRef('carts',userId,{
                    carts:updatedCart,
                    updatedAt: new Date().toDateString(),
                }); 
                toast.success("Item added to cart successfully");
                thunkAPI.dispatch(getAllCarts({userId}));
            }else{
                const updatedCart = userCarts.map((product)=>
                product.id === item.id ? {...product, qty:product.qty+1} : product );
               
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
});

export const increaseQuantity = createAsyncThunk('increaseQuantity', async({userId,itemId},thunkAPI)=>{
    try {
            if(userId){      
                let userCarts =thunkAPI.getState().cartReducer.carts;
              
                    const updatedCart = userCarts.map((product)=>
                    product.id === itemId ? {...product, qty:product.qty+1} : product );
                    await setDataToFirestoreRef('carts',userId,{
                        carts:updatedCart,
                        updatedAt: new Date().toDateString(),
                    }); 
                    toast.success("1X Item qunatity increases");
                
                thunkAPI.dispatch(getAllCarts({userId}));
                }
            
        }catch(error){
            console.log(error);
        }
    });

    export const decreaseQuantity = createAsyncThunk('decreaseQuantity', async({userId,itemId},thunkAPI)=>{
        try {
            
                if(userId){      
                    let userCarts =thunkAPI.getState().cartReducer.carts;
                  
                    const updatedCart = userCarts.map((product) => {
                        if (product.id === itemId) {
                            return product.qty > 1
                                ? { ...product, qty: product.qty - 1 }
                                : thunkAPI.dispatch(removeFromCarts({userId,itemId}));
                        } else {
                            return product
                        }
                    });
                       
                        await setDataToFirestoreRef('carts',userId,{
                            carts:updatedCart,
                            updatedAt: new Date().toDateString(),
                        }); 
                        toast.error("1X Item qunatity decreases");
                    
                    thunkAPI.dispatch(getAllCarts({userId}));
                    }
                
            }catch(error){
                console.log(error);
            }
        });

       
const cartSlice = createSlice ({
    name:'cart',
    initialState,
    reducers:{
       setToCart:(state,action)=>{
        state.carts = action.payload
       },
        findCartTotal:(state,action)=>{
        state.cartTotal=state.carts.reduce((curr, item) => curr + item.price * item.qty, 0).toLocaleString('en-IN');
    },
      findFinalTotal:(state,action)=>{
        state.finalTotal = state.cartTotal !== 0 && state.cartTotal < 500 ? parseInt(state.cartTotal) + 75 : state.cartTotal;
    }
      
    }
});

export const cartReducer = cartSlice.reducer;
export const {setToCart,findCartTotal,findFinalTotal} = cartSlice.actions;
export const cartSelector = (state)=>state.cartReducer;
