import faunadb from 'faunadb'

/* 
https://www.netlify.com/blog/2018/07/09/building-serverless-crud-apps-with-netlify-functions-faunadb/
https://community.netlify.com/t/scheduling-builds-and-deploys-with-netlify/2563/10
https://css-tricks.com/lets-build-a-jamstack-e-commerce-store-with-netlify-functions/
*/

const q = faunadb.query
const client = new faunadb.Client({
	secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {

}
