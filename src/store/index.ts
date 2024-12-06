import { configureStore } from "@reduxjs/toolkit";

// Exemple avec un reducer initial vide (ajoute tes slices ici)
const store = configureStore({
  reducer: {
    // Les slices seront ajoutés ici (ex. : user, campaigns)
  },
});

// Exporte le type du store pour TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
