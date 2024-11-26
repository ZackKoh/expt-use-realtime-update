// The type we will be using for this demonstration
export type IOTReading = {
  temperature: number;
  timestamp: number; // Unix milliseconds
}

export const fakeAPICall = (startingTime: number, numEntries: number) => {
  const results: IOTReading[] = [];

  for (let i = 0; i < numEntries; i++) {
    results.push({
      temperature: 15 + Math.floor(25 * Math.random()),
      timestamp: startingTime - ((numEntries - i) * 1000)
    })
  }

  return results
}

export const isNewReading = (lastReading: IOTReading, updateReading: IOTReading) => {
  return updateReading.timestamp > lastReading.timestamp
}
