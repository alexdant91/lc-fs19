export const utilities = (state) => ({
    generateTableRowHTML: (item) => {
        return `
            <tr>
                <td>${item.id}</td>
                <td>${item.userId}</td>
                <td>${item.title}</td>
                <td>${item.body}</td>
                <td>
                    <button class="remove-btn" data-id="${item.id}">remove</button>
                </td>
            </tr>
        `
    },
    sort: {
        ASC: () => {
            state.data.sort((a, b) => {
                if (["id", "userId"].indexOf(state.sortInfo.sortBy) !== -1) {
                    return a[state.sortInfo.sortBy] - b[state.sortInfo.sortBy]//in base all ordine numerico
                } else {
                    return a[state.sortInfo.sortBy].localeCompare(b[state.sortInfo.sortBy])//im base all ordine alfabetico
                }
            })
        },
        DESC: () => {
            state.data.sort((a, b) => {
                if (["id", "userId"].indexOf(state.sortInfo.sortBy) !== -1) {
                    return b[state.sortInfo.sortBy] - a[state.sortInfo.sortBy]//in base all ordine numerico
                } else {
                    return b[state.sortInfo.sortBy].localeCompare(a[state.sortInfo.sortBy])//im base all ordine alfabetico
                }
            })
        }
    }
});

//export default utilities;