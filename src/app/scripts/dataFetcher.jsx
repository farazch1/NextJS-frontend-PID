// import { useState, useEffect } from 'react';

// function useDataFetcher(query) {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:3000/rivers-data', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ query }),
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setError('Failed to fetch data');
//         console.error('Error fetching data:', error);
//       }
//     };

//     if (query) {
//       fetchData();
//     }
//   }, [query]);

//   return { data, error };
// }

// export default useDataFetcher;
import { useState, useEffect } from 'react';

function useDataFetcher(reach, startDate, endDate, riv_selection) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Construct the query parameters
        const queryParams = new URLSearchParams({
          reach,
          startdate: startDate,
          enddate: endDate,
          riv_selection,
        }).toString();

        const response = await fetch(`http://127.0.0.1:3000/rivers-data?${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', error);
      }
    };

    if (reach && startDate && endDate) {
      fetchData();
    }
  }, [reach, startDate, endDate, riv_selection]);

  return { data, error };
}

export default useDataFetcher;