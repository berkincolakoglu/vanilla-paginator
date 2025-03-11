# 📄 Vanilla Paginator 

A lightweight, simple front-end pagination component built with vanilla JavaScript. 

## ✨ Features
- Dynamic page rendering based on the number of items.
- Active page indication and button visibility toggling.
- Ellipsis handling for large numbers of pages.
- Smooth scrolling to the desired part of the page on page navigation.

## ⚙️ Technologies Used
- JavaScript (ES6+)
- HTML5
- CSS3

## 🚀 Installation
### 1. Clone the repository:
   ```bash
   git clone https://github.com/berkincolakoglu/pagination-component.git
   ```

### 2. Set **"module"** value to the type attribute of the corresponding JavaScript script element of the HTML file that you want to implement Vanilla Paginator.
   ```bash
   <script type="module" src="/js/index.js"></script>
   ```

### 3. Add **"vanillaPaginator.js"** to your project structure.
   <img width="219" alt="Screen Shot 2025-03-10 at 18 36 00" src="https://github.com/user-attachments/assets/e55ab314-b2d4-431f-ab38-06faf2ade8f2" />


### 4. Import/define your createComponent function that creates component in **"vanillaPaginator.js"** file. 
You can either import your component creator function or define it inside the **"vanillaPaginator.js"** file like done in this repository. This function is used in the "renderPage" function each time the user navigates through pages. Or you can modify the renderPage function, to make it work in the way you want.  
<img width="588" alt="Screen Shot 2025-03-10 at 19 57 55" src="https://github.com/user-attachments/assets/48963a9d-0d67-497d-bb67-05516ab6df20" />
<img width="552" alt="Screen Shot 2025-03-10 at 19 47 56" src="https://github.com/user-attachments/assets/e7ba1bdb-c23a-4a8b-9395-8f411902f8fd" />

### 5. Stylize the pagination elements.
You can simply copy CSS values for pagination elements under the snippet ".pagination-container" in **main.scss** file. Or style all the elements as you wish.

### 6. Import **"VanillaPaginator"** and define necessary variables in the corresponding JavaScript file of the HTML file that you want to implement pagination.
   ```bash
   import { VanillaPaginator } from "./vanillaPaginator.js";

   const pageContainer = document.querySelector(".your-page-container");
   const paginationContainer = document.querySelector(".your-pagination-container");
   const scrollTarget = document.querySelector(".your-scroll-target");
   const firstPageScrollTarget = document.querySelector(".your-first-page-scroll-target");
   ```
   - **pageContainer**: Define the div that's going to contain the rendered page.
     
   - **paginationContainer**: Define the div that's going to contain the pagination.
     
   - **scrollTarget**: Define the element that the page is going to scrolled to, at the page navigation.
     
   - **firstPageScrollTarget**: Define the element that the page is going to scrolled to, at the navigation of the first page. You may  want it to scroll to the top of the page, so defining top-most element is recommended.
    
      
### 7. Create a VanillaPaginator class and initialize pagination.
Create a new VanillaPaginator class and initialize it in the corresponding JavaScript file of the HTML file that you want to implement pagination.
```bash
const vanillaPaginator = new VanillaPaginator(items, pageContainer, paginationContainer, numberOfItemsOnPage, firstPageScrollTarget, scrollTarget);

vanillaPaginator.init();
```
- **items**: Items that are going to pass into your creating component function you defined in the fourth step and then split into pages.

- **pageContainer**: Use the pageContainer variable that you defined in the sixth step.

- **paginationContainer**: Use the paginationContainer variable that you defined in the sixth step.

- **numberOfItemsOnPage**: Number of items on a single page is going to contain. Default set value is 16.

- **scrollTarget**: Use the scrollTarget variable that you defined in the sixth step.
     
- **firstPageScrollTarget**: Use the firstPageScrollTarget variable that you defined in the sixth step.

- **vanillaPaginator.init();** : **_Pagination succesfully initialized! 🚀_**