
const {selectTopics, selectArticle, selectAllArticles, selectCommentsByArticleId, insertComment, patchArticle, selectCommentToDelete,selectUsers, selectArticlesByTopic} = require('../models/model')

const endpoints = require('../endpoints.json')
const { checkArticleExists } = require('../db/seeds/utils')

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
    if(!request.query.topic) {
        selectAllArticles(request.query)
        .then((articles) => {
            response.status(200).send(articles)
        })
        .catch(next)
    } else {
        selectArticlesByTopic(request.query)
        .then((articles) => {
            response.status(200).send(articles)
        })
        .catch(next)
    }
    
}

exports.getServerDocs = (request, response, next) => {
    response.status(200).send(endpoints)
}

exports.getCommentsByArticleId = (request, response ,next) => {
    const {article_id} = request.params
    checkArticleExists(article_id)
    .then(() => {
        return selectCommentsByArticleId(article_id, next)
    })
    .then((comments) => {
        response.status(200).send(comments)
    })
    .catch(next)

}


exports.addComment = (request, response, next) => {
    insertComment(request.body, request.params)
    .then((comment) => {
        response.status(201).send({comment})
    })
    .catch(next)

}

exports.getArticleToPatch = (request, response, next) => {
    const {article_id} = request.params
    checkArticleExists(article_id)
    .then(() => {
        return patchArticle(request.body, request.params)
    })
    .then((article) => {
        response.status(200).send({article})
    })
    .catch(next)
}

exports.getCommentToDelete = (request, response, next) => {
    const {comment_id} = request.params
    selectCommentToDelete(comment_id)
    .then(() => {
        response.status(204).send()
    })
    .catch(next)
}

exports.getUsers = (request, response, next) => {
    selectUsers()
    .then((users) => {
        response.status(200).send(users)
    })
}