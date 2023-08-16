const {selectTopics, selectArticle, selectAllArticles, selectCommentsByArticleId} = require('../models/model')
const endpoints = require('../endpoints.json')

exports.getTopics = (request, response, next) => {
    selectTopics().then((topics) => {
        response.status(200).send(topics)
    })
    .catch(next)
}

exports.getArticle = (request, response, next) => {
    const {article_id} = request.params
    selectArticle(article_id)
    .then((article) => {
        response.status(200).send({article})
    })
    .catch(next);
}

exports.getAllArticles = (request, response, next) => {
    selectAllArticles()
    .then((articles) => {
        response.status(200).send(articles)
    })
    .catch(next)
}

exports.getServerDocs = (request, response, next) => {
    response.status(200).send(endpoints)
}

exports.getCommentsByArticleId = (request, response ,next) => {
    const {article_id} = request.params
    selectCommentsByArticleId(article_id)
    .then((comments) => {
        response.status(200).send(comments)
    })
    .catch(next)
}