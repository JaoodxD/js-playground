class PaginationDeck {
    #deck = [];
    #currentPage;
    #matcher = {};
    constructor(pageSize, totalCount) {
        this.#deck = new Array(pageSize).fill(0);
        this.#currentPage = 0;
        this.#matcher = Array.from(
            { length: totalCount },
            (_, i) => ~~(i / pageSize)
        ).reduce((matcher, page) =>
            (matcher[page] = (matcher[page] || 0) + 1, matcher), {});
    }

    push(element) {
        this.#insertElement(element);

        const isNewPage = this.#checkForNewPage(element);
        if (isNewPage) this.#currentPage = element;
        return this.#currentPage;
    }

    #insertElement(element) {
        const firstDeckElement = this.#deck[0];
        if (firstDeckElement < element) {
            this.#deck.shift();
            this.#deck.push(element);
        }
        else {
            this.#deck.pop();
            this.#deck.unshift(element);
        }
    }

    #checkForNewPage(element) {
        const elementsCount = this.#deck.filter((x) => x === element).length;
        const elementsOnPage = this.#matcher[element];
        return (elementsOnPage === elementsCount);
    }
};

const paginator = new PaginationDeck(4, 10);

paginator.push(1);
paginator.push(1);
paginator.push(1);
paginator.push(1);

paginator.push(2);
paginator.push(2);

paginator.push(1);
paginator.push(1);
