export const pageContent = document.querySelector(".pageContent");
export async function fetchRandomBeer(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data
  } catch {
    (error) => console.error("Error:", error);
  }
}

