export class VanillaPaginator {
    constructor(items, pageContainer, paginationContainer, numberOfItemsOnPage = 16, firstPageScrollTarget, pageScrollTarget) {
        this.state = {
            currentPage: 1,
            totalPages: Math.ceil(items.length / numberOfItemsOnPage),
            items,
            numberOfItemsOnPage,
            pageContainer,
            paginationContainer,
            firstPageScrollTarget,
            pageScrollTarget
        };

        // default pagination buttons that are going to be created
        this.previousPageBtn = null;
        this.startEllipsis = null;
        this.endEllipsis = null;
        this.nextPageBtn = null;
    }

    init() {
        this.createPaginationButtons();
        this.renderPage(this.state.currentPage);
    }

    renderPage(pageNumber) {
        const { items, pageContainer, numberOfItemsOnPage } = this.state;
        const startIndex = (pageNumber - 1) * numberOfItemsOnPage;
        const endIndex = startIndex + numberOfItemsOnPage;
        const page = this.createPage(pageNumber);

        pageContainer.innerHTML = "";

        items.slice(startIndex, endIndex).forEach(data => {
            const component = createComponent(data);
            page.appendChild(component);
        });

        pageContainer.appendChild(page);

        this.indicatePageButton(pageNumber);
        this.modifyPageButtons(pageNumber);
        this.currentPage = pageNumber;
    }

    modifyPageButtons(pageNumber) {
        switch (true) {
            case (pageNumber <= 4):
                this.handleFirstPages(pageNumber);
                break;

            case (pageNumber > 4 && pageNumber + 3 < this.state.totalPages):
                this.handleMiddlePages(pageNumber);
                break;

            case (pageNumber + 3 >= this.state.totalPages):
                this.handleLastPages(pageNumber);
                break;
        }

        this.currentPage = pageNumber;
        if (pageNumber !== 1) {
            try {
                this.state.pageScrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
            } catch(err) {
                console.log("page scroll target error: "+err);
            }
        } else {
            try {
                this.state.firstPageScrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
            } catch(err) {
                console.log("page scroll target error: "+err);
            }
        }
    }

    createPaginationButtons() {
        const { paginationContainer, totalPages } = this.state;

        // creating default elements
        this.previousPageBtn = this.createPaginationElement(["back-btn", "page-btn"], "", "<");
        this.startEllipsis = this.createPaginationElement(["page-btn", "unclickable"], "start-ellipsis", "...");
        this.endEllipsis = this.createPaginationElement(["page-btn", "unclickable"], "end-ellipsis", "...");
        this.nextPageBtn = this.createPaginationElement(["forward-btn", "page-btn"], "", ">");

        // appending default elements to the pagination container
        paginationContainer.appendChild(this.previousPageBtn);
        if (this.state.totalPages > 7) {
            paginationContainer.appendChild(this.startEllipsis);
            paginationContainer.appendChild(this.endEllipsis);
        }
        paginationContainer.appendChild(this.nextPageBtn);

        // adding event listeners to next & previous page buttons
        this.nextPageBtn.addEventListener("click", () => {
            if (this.state.currentPage + 1 <= this.state.totalPages) {
                const nextPageNumber = this.state.currentPage + 1;
                this.state.currentPage = nextPageNumber;
                this.renderPage(nextPageNumber);
            }
        });

        this.previousPageBtn.addEventListener("click", () => {
            if (this.state.currentPage - 1 >= 1) {
                const previousPageNumber = this.state.currentPage - 1;
                this.state.currentPage = previousPageNumber;
                this.renderPage(previousPageNumber);
            }
        });

        // creating and inserting page buttons
        for (let i = 1; i <= totalPages; i++) {
            const button = this.createPageButton(i);

            if (i === 1) {
                if (this.state.totalPages > 7) {
                    paginationContainer.insertBefore(button, this.startEllipsis);
                } else {
                    paginationContainer.insertBefore(button, this.nextPageBtn);
                }
            } else if (i === totalPages) {
                paginationContainer.insertBefore(button, this.nextPageBtn);
            } else {
                if (this.state.totalPages > 7) {
                    paginationContainer.insertBefore(button, this.endEllipsis);
                } else {
                    paginationContainer.insertBefore(button, this.nextPageBtn);
                }
            }
        }
    }

    createPaginationElement(classNames, id = "", innerText = "") {
        const element = document.createElement("div");
        classNames.forEach(className => {
            element.classList.add(className);
        });

        if (id) element.id = id;
        if (innerText) element.textContent = innerText;

        return element;
    }

    createPageButton(pageNumber) {
        const button = document.createElement("div");
        button.classList.add("page-btn", "number-btn");
        button.textContent = pageNumber;
        button.id = `page-btn-number${pageNumber}`;

        button.addEventListener("click", () => {
            this.state.currentPage = pageNumber;
            this.renderPage(pageNumber);
        });

        return button;
    }

    createPage(pageNumber) {
        const page = document.createElement("div");
        page.classList.add("page");
        page.id = `page-number-${pageNumber}`;
        return page;
    }

    handleFirstPages() {
        this.toggleEllipsis("start", false);
        if (this.state.totalPages > 7) {
            this.toggleEllipsis("end", true);
        } else {
            this.toggleEllipsis("end", false);
        }
       
        for (let i = 6; i <= this.state.totalPages - 1; i++) {
            this.makePageButtonInactive(i);
        }

        for (let i = 2; i <= 5; i++) {
            this.makePageButtonActive(i);
        }
    }

    handleMiddlePages(pageNumber) {
        this.makeAllPageButtonsInactive();
        this.indicatePageButton(pageNumber);
        this.makePageButtonActive(pageNumber - 1);
        this.makePageButtonActive(pageNumber + 1);
        this.makePageButtonActive(this.state.totalPages);
        this.toggleEllipsis("start", true);
        this.toggleEllipsis("end", true);
    }

    handleLastPages(pageNumber) {
        this.toggleEllipsis("end", false);  
        if (this.state.totalPages > 7) {
            this.toggleEllipsis("start", true);
        } else {
            this.toggleEllipsis("start", false);
        }
        
        for (let i = 2; i < pageNumber - 1; i++) {
            this.makePageButtonInactive(i);
        }

        for (let i = this.state.totalPages; i >= this.state.totalPages - 4; i--) {
            this.makePageButtonActive(i);
        }
    }

    makeAllPageButtonsInactive() {
        const pageButtons = document.querySelectorAll(".number-btn");
        pageButtons.forEach((pageButton) => {
            if (parseInt(pageButton.innerText) !== 1 && parseInt(pageButton.innerText) !== this.state.totalPages) {
                pageButton.classList.add("invisible");
            }
        });
    }

    makePageButtonActive(pageNumber) {
        const numberButtons = document.getElementsByClassName("number-btn");
        numberButtons[pageNumber - 1]?.classList.remove("invisible");
    }

    makePageButtonInactive(pageNumber) {
        const numberButtons = document.getElementsByClassName("number-btn");
        if (!numberButtons[pageNumber - 1]?.classList.contains("invisible")) {
            numberButtons[pageNumber - 1]?.classList.add("invisible");
        }
    }

    toggleEllipsis(startOrEnd, shouldShow) {
        const ellipsisElement = document.getElementById(`${startOrEnd}-ellipsis`);
        if (ellipsisElement) {
            ellipsisElement.classList.toggle("invisible", !shouldShow);
        }
    }

    indicatePageButton(pageNumber) {
        const numberButtons = document.querySelectorAll(".number-btn");
        numberButtons.forEach((pageNumberBtn) => {
            pageNumberBtn.classList.remove("active");
        });

        const targetButton = document.querySelector(`#page-btn-number${pageNumber}`);
        targetButton?.classList.add("active");
        targetButton?.classList.remove("invisible");
    }
}

// function that creates the component to be added to the page
function createComponent(data) {
    const component = document.createElement("div");
    component.classList.add("item");

    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    h2.textContent = `${data.title}`;
    p.textContent = `${data.body}`;

    component.appendChild(h2);
    component.appendChild(p);

    return component;
}