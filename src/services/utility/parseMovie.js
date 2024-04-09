function parseMovie(movieText) {
    const lines = movieText.split("\n");
    const movie = {};
    lines.forEach((line) => {
        const [key, ...value] = line.split(": ");
        movie[key.trim()] = value.join(": ").trim();
    });
    return movie;
}

module.exports = parseMovie;
