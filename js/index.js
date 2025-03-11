import { VanillaPaginator } from "./vanillaPaginator.js";

const pageContainer = document.querySelector(".page-container");
const paginationContainer = document.querySelector(".pagination-container");
const scrollTarget = document.querySelector(".outer-container");

const data = getData();
data.then(dataJson => {
    const vanillaPaginator = new VanillaPaginator(dataJson, pageContainer, paginationContainer, 10, scrollTarget, scrollTarget);
    vanillaPaginator.init();
})

async function getData() {
    const url = "https://jsonplaceholder.typicode.com/posts";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}