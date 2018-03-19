import Config from '../Config/DebugConfig'
import Immutable from 'seamless-immutable'
import Reactotron, { networking } from 'reactotron-react-native'

if (Config.useReactotron) {
  // https://github.com/infinitered/reactotron for more options!
  Reactotron
    .configure({name: 'Ignite App'})
    .useReactNative()
    .use(networking())
    .connect()

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear()

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron
}
