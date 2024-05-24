/* eslint-disable no-var */
(
    () => {
        const animals = ["собака", "кошка"];
        const action = ["ест", "спит"];
        const adjective = ["рыжая", "черная"];

        var theArraysList = [
            animals,
            action,
            adjective
        ];

        var doProcessList = (
            (theDeep) => (
                theArraysList[theDeep++].flatMap(
                    (theEl) => (
                        (theArraysList[theDeep] instanceof Array)
                            ? (
                                doProcessList(theDeep)
                                    .map(
                                        (theChildEl) => `${theEl} ${theChildEl}`
                                    )
                            )
                            : theEl
                    )
                )
            )
        );

        console.log(doProcessList(0));
    }
)();
