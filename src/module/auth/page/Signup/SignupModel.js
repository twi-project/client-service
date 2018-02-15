import {types, flow} from "mobx-state-tree"

import {mutate} from "core/transport/graphql"

import db from "core/db"
import filter from "core/helper/iterator/objectFilter"
import map from "core/helper/iterator/objectMapToArrayTasks"
import updateTextField from "common/model/action/updateTextField"

import createUser from "./createUser.graphql"

const {model, optional, string} = types

const schema = {
  login: optional(string, ""),
  email: optional(string, ""),
  password: optional(string, "")
}

const actions = self => ({
  updateLogin: updateTextField(self),
  updateEmail: updateTextField(self),
  updatePassword: updateTextField(self),

  signup: flow(function* () {
    const {login, email, password} = self

    const res = yield mutate({
      mutation: createUser,
      variables: {
        user: {
          login,
          email,
          password
        }
      }
    })

    const tokens = filter(
      res.data.createUser, (_, key) => key === "__typename"
    )

    yield Promise.all(map(tokens, (token, name) => db.setItem(name, token)))
  })
})

const Signup = model("Signup", schema).actions(actions)

export default Signup
export {schema}