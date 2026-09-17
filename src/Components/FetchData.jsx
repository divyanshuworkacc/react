


function FetchData() {
    const [data, setData] = useState(null);
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${value}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <button onClick={handleClick} disabled={loading}>
                {loading ? "Loading..." : "Fetch Data"}
            </button>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}