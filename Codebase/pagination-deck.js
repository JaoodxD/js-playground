class PaginationDeck {
    #deck = [];
    #currentPage;
    #totalCount;
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

    constructor(pageSize, totalCount) {
        this.#deck = new Array(pageSize).fill(0);
        this.#currentPage = 0;
        this.#totalCount = totalCount;
        this.#pageSize = pageSize;
        this.#recalcMatcher();

    }

    push(element) {
        this.#insertElement(element);

        const isNewPage = this.#checkForNewPage(element);
        if (isNewPage) this.#currentPage = element;
        return this.#currentPage;
    }

    add() {
        this.#totalCount++;
        this.#recalcMatcher();
    }

    remove() {
        this.#totalCount--;
        this.#recalcMatcher();
    }

    #recalcMatcher() {
        this.#matcher = Array.from(
            { length: this.#totalCount },
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

paginator.push(1);
paginator.push(1);
paginator.push(1);
paginator.push(1);

paginator.push(2);
paginator.push(2);

paginator.push(1);
paginator.push(1);

paginator.add();
paginator.add();
paginator.add();
