const RANDOM_CHARACTERS = "abcdefghijklmnopqrstuvwxyz";

export function getRandomID(
  existingIDs: string[],
  length: number = 8,
  characterSet: string = RANDOM_CHARACTERS
): string {
  const numPossibilities = Math.pow(characterSet.length, length);

  if (existingIDs.length === numPossibilities) {
    throw new Error(
      "Possible combinations exhausted! Need larget character set."
    );
  }

  let randomID = "";

  for (let i = 0; i < length; i++) {
    randomID += characterSet[Math.floor(Math.random() * characterSet.length)];
  }

  if (existingIDs.indexOf(randomID) !== -1) {
    return getRandomID(existingIDs, length);
  }

  return randomID;
}
