export interface ProductionData {
  loginId: string;
  buildNumber: number;
  numberOfParts: number;
  timePerPart: number; // in minutes
}

// Dummy database
export const productionDatabase: ProductionData[] = [
  {
    loginId: "John Doe",
    buildNumber: 1,
    numberOfParts: 1,
    timePerPart: .1,
  },
  {
    loginId: "Jane Smith",
    buildNumber: 20250129001,
    numberOfParts: 150,
    timePerPart: 3,
  },
  {
    loginId: "Peter Jones",
    buildNumber: 20250129002,
    numberOfParts: 89,
    timePerPart: 8,
  },
  {
    loginId: "Emily Davis",
    buildNumber: 20250129003,
    numberOfParts: 200,
    timePerPart: 15,
  },
  {
    loginId: "Alex Brown",
    buildNumber: 12345, // Assuming this is the user's build number
    numberOfParts: 50,
    timePerPart: 5,
  }
];

export const fetchProductionData = async (buildNumber: number): Promise<ProductionData | null> => {

  // Find matching record
  const result = productionDatabase.find(
    record => record.buildNumber === buildNumber
  );

  return result || null;
};
