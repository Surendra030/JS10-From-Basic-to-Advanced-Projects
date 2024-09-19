const getPuzzle = async (wordCount) => {
    try {
        const response = await fetch(`https://puzzle.mead.io/puzzle?wordCount=${wordCount}`);
        if (response.status === 200) {
            const data = await response.json();
            return data.puzzle;
        } else {
            throw new Error('Unable to fetch puzzle');
        }
    } catch (error) {
        console.error(error);
        alert('Failed to load puzzle. Please try again later.');
    }
}
