import NotFound from "lib/component/Error/NotFoundError"

const matchErrors = ({error}) => {
  if (error.status === 404) {
    return NotFound
  }

  if (!error.graphQLErrors) {
    return null
  }

  const [err] = error.graphQLErrors

  if (err.code === "HTTP_NOT_FOUND_EXCEPTION" || err.status === 404) {
    return NotFound
  }

  return null
}

export default matchErrors