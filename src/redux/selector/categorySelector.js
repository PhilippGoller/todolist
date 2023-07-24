import { createSelector } from "@reduxjs/toolkit";

export const getCategories = state => state.categories.items;

export const getCategoryById = createSelector(
    [
        state => state.categories.items,
        (state, id) => id,
    ],
    (categories, id) => categories.find(category => category.id === id)
);