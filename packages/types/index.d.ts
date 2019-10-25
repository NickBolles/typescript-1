import './process'

export { Context, Middleware, NuxtAppOptions, NuxtError, Plugin, Transition } from './app'
export { Configuration, Module, ServerMiddleware } from './config'

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
