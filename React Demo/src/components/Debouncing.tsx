import { useCallback, useEffect, useRef, useState } from 'react'

function debounce<T extends (...args: any[]) => void> (func: T, timeInMs: number) {
  let timeout: NodeJS.Timeout|null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      func.apply(this, args);
      if (timeout) clearTimeout(timeout);
    }, timeInMs);
  }
}

function Debouncing() {
  const isInitialMount = useRef(true);

  const [ searchValue, setSearchValue ] = useState<string>("");
  const [ response, setResponse ] = useState();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
 
  const handleSearch = async(arg: string) => {
    setIsLoading(true);
    console.log("Performing search...");
    try {
      const res = await fetch(`https://demo.dataverse.org/api/search?q=${arg}`)
      const data = await res.json();
      setResponse(data);
      setIsLoading(false)
      console.log(data);
    } catch (error) {
      setIsLoading(false);
      console.error(`Error fetching data ${error}`);
    }
  };

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 1500), []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    debouncedHandleSearch(searchValue);
  }, [ searchValue ]);

  return (
    <main className="">
      <section className="p-6 bg-gray-100 rounded-md max-w-md mx-auto mt-10">
        <h2 className="text-zinc-600 text-2xl font-semibold">Action Debounce</h2>
        <div className="h-px w-full bg-zinc-300 my-4"></div>
        <form>
          <label className="block text-lg font-semibold mb-2" htmlFor="debounce-input">
            Enter text:
          </label>
          <input
            type="text"
            id="debounce-input"
            name="searchValue"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </form>
      </section>
      <h3 className="text-xl"> {isLoading ? "Fetching..." : `Response: ${response !== undefined ? JSON.stringify(response) : ""}`}</h3>
    </main>
  )
}
export default Debouncing