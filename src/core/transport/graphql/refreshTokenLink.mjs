import partial from "lodash/partial"

import {print} from "graphql/language/printer"
import {ApolloLink, Observable} from "apollo-link"

import {api} from "core/config"
import {mutation} from "core/auth/graphql/mutation/refreshAccessToken"

import isAuthenticated from "core/auth/helper/isAuthenticated"
import waterfall from "core/helper/array/runWaterfall"
import saveTokens from "core/auth/helper/saveTokens"
import getData from "core/helper/graphql/getData"
import db from "core/db/tokens"

const read = getData("authRefreshAccessToken")

const refreshTokenLink = new ApolloLink(
  (operation, forward) => new Observable(observer => {
    let handle = null

    async function request() {
      const token = await db.getItem("refreshToken")

      const params = {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          operationName: mutation.operationName,
          query: print(mutation),
          variables: {
            refreshToken: token.payload
          }
        })
      }

      return fetch(api.uri, params)
    }

    async function parse(response) {
      if (response.status >= 300) {
        throw new Error(`Network error: ${response.status}`)
      }

      return response.json()
    }

    const save = accessToken => saveTokens({accessToken})

    function finish() {
      handle = forward(operation).subscribe({
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer)
      })
    }

    function onRejected(reason) {
      if (reason.name !== "AbortError") {
        observer.error(reason)
      }
    }

    const run = partial(waterfall, [request, parse, read, save, finish])

    isAuthenticated().then(value => value === true ? finish() : run())
      .catch(onRejected)

    return () => handle && handle.unsubscribe()
  })
)

export default refreshTokenLink