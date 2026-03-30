import  {createSlice} from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addtoCart:(state,action)=>{
            state.items.push(action.payload);
        },

        removeFromCart:(state,action)=>{
            state.items = state.items.filter(
                (item,index) => index !== action.payload
            );
        },

        clearCart:(state)=>{
            state.items = [];
        },
    },
});

export const {addtoCart,removeFromCart,clearCart} = cartSlice.actions;
export default cartSlice.reducer;