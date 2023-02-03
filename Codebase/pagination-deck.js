class PaginationDeck {
    #deck = [];
    #currentPage;
    #matcher = {};
    constructor(pageSize, totalCount) {
        this.#deck = new Array(pageSize).fill(0);
        this.#totalCount = totalCount;
        this.#currentPage = 0;
        this.#matcher = Array.from(
            { length: totalCount },
            (_, i) => ~~(i / pageSize)
        ).reduce((matcher, page) =>
            (matcher[page] = (matcher[page] || 0) + 1, matcher), {});
    }
    push(element) {
        this.#deck.shift();
        this.#deck.push(element);

        const elementsCount = this.#deck.filter((x) => x === element).length;
        const elementsOnPage = this.#matcher[element];
        if (elementsOnPage === elementsCount) this.#currentPage = element;

        console.log(this.#currentPage);
        return this.#currentPage;
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
paginator.push(1);
paginator.push(1);
