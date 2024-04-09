const movieService = require("../../services/movie.service");

class Controller {
    async create(req, res) {
        try {
            const { title, year, format, actors } = req.body;
            const result = await movieService.create(
                title,
                year,
                format,
                actors
            );
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const result = await movieService.delete(id);
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const { title, year, format, actors } = req.body;
            const result = await movieService.update(
                id,
                title,
                year,
                format,
                actors
            );
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

    async show(req, res) {
        try {
            const id = req.params.id;
            const result = await movieService.show(id);
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

    async list(req, res) {
        try {
            const params = req.query;
            const actor = params.actor ? params.actor : "";
            const title = params.title ? params.title : "";
            const search = params.search ? params.search : "";
            const sort = params.sort ? params.sort : "id";
            const order = params.order ? params.order : "ASC";
            const limit = params.limit ? +params.limit : 20;
            const offset = params.offset ? +params.offset : 0;

            const where = {};
            if (actor) {
                where.actor = actor;
            }
            if (title) {
                where.title = title;
            }
            if (search) {
                where.actor = search;
                where.title = search;
            }

            const result = await movieService.limit(
                where,
                limit,
                offset,
                sort,
                order
            );
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

    async import(req, res) {
        try {
            const file = req.files.movies;
            const data = file.data.toString();
            const result = await movieService.import(data);

            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Controller();
