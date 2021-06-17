import React, {useEffect, useState} from "react";

const TestAjax = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const convertItems = (result) => {
        let array = [];
        for(let i = 0; i < result["items"].length; i++) {
            array.push(<li key={result["items"][i]["id"]}>{result["items"][i]["name"]} {result["items"][i]["price"]}</li>);
            // array.push(<li>{result["items"][i]["name"]}</li>);
            console.log("Hello World from for");
        }
        console.log("Hello World after for");
        // console.log("array: ");
        // console.log(array);
        // console.log("result: ");
        // console.log(result);
        // console.log("result[\"items\"][0].id: " + result["items"][0]["id"]);
        // console.log("result[\"items\"][0].name: " + result["items"][0]["name"]);
        // console.log("result[\"items\"][0].price: " + result["items"][0]["price"]);
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
            // .then( res => {
            //     setItems(res);
            //     console.log(items);
            // })
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
                {/*{items.map(item => (*/}
                {/*    <li key={item.id}>*/}
                {/*        {item.name} {item.price}*/}
                {/*    </li>*/}
                {/*))}*/}
                {/*{items.map(item => (*/}
                {/*    <li>*/}
                {/*        Hello World.*/}
                {/*    </li>*/}
                {/*))}*/}
                {/*{(() => {*/}
                {/*    items.map(item => (*/}
                {/*        <li key={item.id}>*/}
                {/*            {item.name} {item.price}*/}
                {/*        </li>*/}
                {/*    ))*/}
                {/*})()}*/}
                { items }
                <li>Hello World</li>
            </ul>
        );
    }

    // return (
    //     <ul>
    //         {items.map(item => (
    //             <li key={item.id}>
    //                 {item.name} {item.price}
    //             </li>
    //         ))}
    //         <li>Hello World.</li>
    //         {/*<li>Hello World.</li>*/}
    //     </ul>
    // );
}

export default TestAjax;