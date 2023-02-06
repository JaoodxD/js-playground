class PaginationDeck {
    #deck = [];
    #currentPage;
    #totalSize;
    #pageSize;
    #matcher = {};
    #pushStrategy = {
        true: (element) => {
            this.#deck.shift();
            this.#deck.push(element);
        },
        false: (element) => {
            this.#deck.pop();
            this.#deck.unshift(element);
        }
    };
    #resizeStrategy = {
        true: (newSize) => {
            this.#deck.push(
                ...new Array(newSize - this.#pageSize)
                    .fill(this.#deck.at(-1))
            );
        },
        false: (newSize) => {
            const elementsToRemove = this.#pageSize - newSize;
            this.#deck.splice(-elementsToRemove, elementsToRemove);
        }
    }

    constructor(pageSize, totalCount) {
        this.#deck = new Array(pageSize).fill(0);
        this.#currentPage = 0;
        this.#totalSize = totalCount;
        this.#pageSize = pageSize;
        this.#recalcMatcher();
    }

    push(element) {
        this.#insertElement(element);

        const isNewPage = this.#checkForNewPage(element);
        if (isNewPage) this.#currentPage = element;
        return this.#currentPage;
    }

    incTotalCount() {
        this.#totalSize++;
        this.#recalcMatcher();
    }

    decTotalCount() {
        this.#totalSize--;
        this.#recalcMatcher();
    }

    changePageSize(newSize) {
        const isDeckGrowing = newSize > this.#pageSize;
        const resizeMethod = this.#resizeStrategy[isDeckGrowing];
        resizeMethod(newSize);
        this.#pageSize = newSize;
        this.#recalcMatcher();
    }

    #recalcMatcher() {
        this.#matcher = Array.from(
            { length: this.#totalSize },
            (_, i) => ~~(i / this.#pageSize)
        ).reduce(
            (matcher, page) =>
                (matcher[page] = (matcher[page] || 0) + 1, matcher), {});
    }

    #insertElement(element) {
        const directionOfPush = this.#findPushDirection(element);
        const strategy = this.#pushStrategy[directionOfPush];
        strategy(element);
    }

    #findPushDirection(newElement) {
        const firstDeckElement = this.#deck[0];
        return (firstDeckElement < newElement);
    }

    #checkForNewPage(element) {
        const elementsCount = this.#deck.filter((x) => x === element).length;
        const elementsOnPage = this.#matcher[element];
        return (elementsOnPage === elementsCount);
    }
};

const paginator = new PaginationDeck(4, 10);

paginator.changePageSize(5);
paginator.changePageSize(3);
