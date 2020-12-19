import React from 'react'
import { UserInfoProvider } from './contexts/UserInfoContext'
import ErrorPage from './pages/errorPage/ErrorPage'

type State = { error?: Error }

export default class App extends React.Component<{}, State> {
  state: State = {}
  render() {
    if (this.state.error) {
      return <ErrorPage error={this.state.error} onConfirm={() => this.setState({ error: undefined })} />
    }
    return <UserInfoProvider>Logged in.</UserInfoProvider>
  }

  static getDerivedStateFromError(error: Error) {
    return {error}
  }
  /*componentDidCatch(error: Error) {
    this.setState({ error })
  }*/
}
