import type { IOTReading } from "./utils";

import { useEffect, useState } from "react";
import { fakeAPICall, isNewReading } from "./utils";
import { useRealtimeUpdate, useSimulatedUpdate } from "./hooks";

function App() {
  const [hasCalledAPI, setHasCalledAPI] = useState(false);
  const [data, setData] = useState<IOTReading[]>([]);

  useEffect(() => {
    if (!hasCalledAPI) {
      setData(fakeAPICall(Date.now(), 30));
      setHasCalledAPI(true);
    }
  }, [hasCalledAPI]);

  const update = useSimulatedUpdate(1000);

  const readings = useRealtimeUpdate(data, update, isNewReading, { max: 30 });

  return (
    <>
      <div>
        <button onClick={() => setData(fakeAPICall(Date.now(), 30))}>
          Call API again
        </button>
        <p>
          Current Temperature is {update?.temperature} at {update?.timestamp}
        </p>
        <ul>
          {readings.map((reading) => (
            <li key={reading.timestamp}>
              Temperature is {reading.temperature} C at {reading.timestamp}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
