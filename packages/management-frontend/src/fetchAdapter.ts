import { MakeRequestAdapter } from 'papupata'
import qs from 'qs'

const fetchAdapter: MakeRequestAdapter = async (method: string, url: string, query: any, body: any) => {
  const queryString = qs.stringify(query)
  let urlWithQuery = url + (queryString ? '?' + queryString : '')
  const response = await fetch(urlWithQuery, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(['get', 'head'].includes(method)
      ? {}
      : {
          body: JSON.stringify(body),
        }),
  })
  let contentType = response.headers.get('Content-Type')
  let responseBody: any
  if (contentType && contentType.includes('application/json')) {
    responseBody = await response.json()
  } else {
    responseBody = await response.text()
  }

  if (response.status >= 400) {
    throw new HttpError(response.status, url, responseBody)
  }
  return responseBody
}

export default fetchAdapter

export class HttpError extends Error {
  public status: number
  constructor(status: number, public url: string, public responseBody: any) {
    super('HTTP error ' + status)
    this.status = status
  }
}
