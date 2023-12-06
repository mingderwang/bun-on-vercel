import { 
  error,              // creates error Responses
  json,               // creates JSON Responses
  Router,             // the Router itself
  withParams,         // middleware to extract params into the Request itself
} from 'itty-router'

// we'll start with some fake data
const todos = [
  { id: '1', message: 'Pet the puppy' },
  { id: '2', message: 'Pet the kitty' },
]

const router = Router()

router
  // GET todos - just return some data!
  .get('/todos', () => todos)

  // GET single todo
  .get('/todos/:id', withParams, 
    ({ id }) => {
      const todo = todos.find(t => t.id === id)

      return todo || error(404, 'That todo was not found!')
    }
  )

  // *any* HTTP method works, even ones you make up
  .puppy('/secret', () => 'Because why not?')

  // return a 404 for anything else
  .all('*', () => error(404))

// Example showing Cloudflare module syntax
export default {
  fetch: (req, env, ctx) => router
                              .handle(req, env, ctx)
                              .then(json)
                              .catch(error)
}
