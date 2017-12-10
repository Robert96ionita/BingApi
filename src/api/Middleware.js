const imgConfig = require('../../config/config').api.images;
const TYPE = 'tv-show';

const shows = (json, ids = null) => {
    let content =  {
        resultsFound: json.total_results,
        current_page: json.page,
        pages: json.total_pages,
        results: []
    };

    let results = ids ? json.results.filter(result => ids.includes(result.id)) : json.results;

    for (let result of results) {
        content.results.push({
            id: result.id,
            name: result.name,
            type: TYPE,
            summary: result.overview,
            rating: result.vote_average,
            posterPath: createPosterPath(result.poster_path)
        });
    }

    return content;
};

const show = (json) => {
    let content = {
        id: json.id,
        name: json.original_name,
        type: TYPE,
        noSeasons: json.number_of_seasons,
        noEpisodes: json.number_of_episodes,
        posterPath: createPosterPath(json.poster_path),
        seasons: []
    };

    for (let season of json.seasons) {
        content.seasons.push({
            id: season.id,
            seasonNumber: season.season_number,
            airDate: season.air_date,
            episodesCount: season.episode_count,
            posterPath: createPosterPath(season.poster_path),

        });
    }

    return content;
};

const season = (json) => {
    let content = {
        id: json.id,
        seasonNumber: json.season_number,
        type: TYPE,
        posterPath: createPosterPath(json.poster_path),
        episodes: []
    };

    for (let episode of json.episodes) {
        content.episodes.push({
            id: episode.id,
            airDate: episode.air_date,
            episodeNumber: episode.episode_number,
            name: episode.name,
            voteAverage: episode.vote_average
        });
    }

    return content;
};

const createPosterPath = (path, size = 'xs') => {
    let computedSize = '';
    switch (size) {
        case 'xs':
            computedSize = imgConfig.poster_sizes.ultraSmall;
            break;
        case 's':
            computedSize = imgConfig.poster_sizes.small;
            break;
        case 'm':
            computedSize = imgConfig.poster_sizes.medium;
            break;
        case 'l':
            computedSize = imgConfig.poster_sizes.high;
            break;
        case 'xl':
            computedSize = imgConfig.poster_sizes.ultraHigh;
            break;
        case 'o':
        default:
            computedSize = imgConfig.poster_sizes.original;
    }

    return imgConfig.secure_base_url + computedSize + path;
};

module.exports = {shows: shows, show: show, season: season};