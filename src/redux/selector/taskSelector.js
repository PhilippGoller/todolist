import { createSelector } from "@reduxjs/toolkit";

export const getTasks = state => state.tasks.items;

export const getTaskById = createSelector(
    [
        state => state.tasks.items,
        (state, id) => id,
    ],
    (tasks, id) => tasks.find(task => task.id === id)
);

export const getTasksByTitle = createSelector(
    [
        state => state.tasks.items,
        (state, title) => title,
    ],
    (tasks, title) => tasks.filter(task => task.title.toLowerCase().startsWith(title))
);

export const getTasksByDate = createSelector(
    [
        state => state.tasks.items,
        (state, start) => start,
        (state, start, end) => end,
    ],
    (tasks, start, end) => {
    const startIndex = tasks.findIndex(task => (task.date >= start) && (task.date <= (end ?? start)));
    const endIndex = tasks.findIndex(task => task.date > (end ?? start));

    if(startIndex === -1) {
        return [];
    }

    if(endIndex === -1) {
        return tasks.slice(startIndex);
    }

    return tasks.slice(startIndex, endIndex);
});

export const getTasksByCategory = createSelector(
    [
        state => state.tasks.items,
        (state, category) => category,
    ],
    (tasks, category) => tasks.filter(task => task.category === category)
);