const Movie = require("../db/index").models.movie;
const Actor = require("../db/index").models.actor;
const ActorMovie = require("../db/index").models.MovieActor;
const parseMovie = require("./utility/parseMovie");
const { Op } = require("sequelize");

class MovieService {
    async create(title, year, format, actors) {
        const candidate = await Movie.findOne({ where: { title } });
        if (candidate) {
            return {
                status: 0,
                error: {
                    fields: { title: "NOT_UNIQUE" },
                    code: "MOVIE_EXISTS",
                },
            };
        }
        const movie = await Movie.create({
            title,
            year,
            format,
        });
        for (const actor of actors) {
            const result = await Actor.findOrCreate({
                where: { name: actor },
            });
            await movie.addActors(result[0]);
        }
        const result = await Movie.findOne({
            where: { title },
            include: {
                model: Actor,
                through: { attributes: [] },
            },
        });
        return result;
    }

    async delete(id) {
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return {
                status: 0,
                error: {
                    fields: { id: id },
                    code: "MOVIE_NOT_FOUND",
                },
            };
        }
        await movie.destroy();
        return { status: 1 };
    }

    async update(id, title, year, format, actors) {
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return {
                status: 0,
                error: { fields: { id: id }, code: "MOVIE_NOT_FOUND" },
            };
        }

        await movie.update({ title, year, format });
        await movie.setActors([]);
        for (const actor of actors) {
            const result = await Actor.findOrCreate({
                where: { name: actor },
            });
            await movie.addActors(result[0]);
        }
        const result = await Movie.findOne({
            where: { title },
            include: {
                model: Actor,
                through: { attributes: [] },
            },
        });
        return result;
    }

    async show(id) {
        const movie = await Movie.findByPk(id, {
            include: {
                model: Actor,
                through: { attributes: [] },
            },
        });
        if (!movie) {
            return {
                status: 0,
                error: { fields: { id: id }, code: "MOVIE_NOT_FOUND" },
            };
        }
        return movie;
    }

    async limit(where, limit, offset, sort, order) {
        try {
            let movies;

            if (where.title) {
                movies = await Movie.findAll({
                    where: { title: { [Op.like]: `%${where.title}%` } },
                    include: [
                        {
                            model: Actor,
                            through: { attributes: [] },
                        },
                    ],
                    order: [[sort, order]],
                    limit,
                    offset,
                });
            } else if (where.actor) {
                movies = await Movie.findAll({
                    include: [
                        {
                            model: Actor,
                            where: { name: { [Op.like]: `%${where.actor}%` } },
                            through: { attributes: [] },
                        },
                    ],
                    order: [[sort, order]],
                    limit,
                    offset,
                });
            } else {
                movies = await Movie.findAll({
                    order: [[sort, order]],
                    limit,
                    offset,
                });
            }

            return {
                data: movies,
                meta: {
                    total: movies.length,
                },
                status: 1,
            };
        } catch (error) {
            return {
                status: 0,
                error: error,
            };
        }
    }

    async import(text) {
        const moviesText = text.split("\n\n");
        const movies = moviesText.map((movieText) => parseMovie(movieText));
        const result = [];
        for (const movie of movies) {
            const actors = movie.Stars.split(", ");
            const res = await this.create(
                movie.Title,
                movie["Release Year"],
                movie.Format,
                actors
            );
            result.push(res);
        }

        return result;
    }
}

module.exports = new MovieService();
