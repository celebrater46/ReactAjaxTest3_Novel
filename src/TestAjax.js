import React, {useEffect, useState} from "react";

const TestAjax = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const convertItems = (result) => {
        let array = [];
        for(let i = 0; i < result["items"].length; i++) {
            array.push(
                <li key={result["items"][i]["id"]}>
                    {result["items"][i]["name"]} {result["items"][i]["price"]}
                </li>
            );
        }
        return array;
    }

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        // fetch("https://api.example.com/items")
        // fetch("https://localhost/myapps/PhpCsTest2/index.php")
        fetch("http://enin-world.sakura.ne.jp/test_php/ajaxtest/index.php")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    // setItems(result);
                    setItems(convertItems(result));
                    console.log("convertItems(result):");
                    console.log(convertItems(result));
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        console.log("items:");
        console.log(items);
        return (
            <ul>
                { items }
            </ul>
        );
    }
}

export default TestAjax;