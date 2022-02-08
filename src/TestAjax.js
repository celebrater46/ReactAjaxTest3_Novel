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
        fetch("https://enin-world.sakura.ne.jp/test_php/ajaxtest/index.php")
        // fetch("http://localhost/myapps/ajax_test2/index.php")
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

                // If "Failed to Fetch
                // Maybe the cause is CORS that your browser blocks AJAX with different server
                // Open your Chrome as developing mode
                // Refer: https://webbibouroku.com/Blog/Article/cors-browser-setting
                // The shortcut's target: "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:\Users\Enin\Local\Google\Chrome\User Data"
                // The shortcut's start in: "C:\Program Files\Google\Chrome\Application"
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