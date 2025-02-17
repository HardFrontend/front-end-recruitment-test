const Method = {
  POST: 'POST',
  GET: 'GET',
}

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw new Error('${response.status}: ${response.statusText}')
  }
}

const toJSON = (response) => {
  return response.json()
}

export class API {
  constructor ({endPoint, authorization}) {
    this._endPoint = endPoint
    this._authorization = authorization
  }

  sendForm ({data}) {
    return this._load({
      url: 'order/',
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(toJSON)
  }

  _load ({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append('Authorization', this._authorization)

    return fetch('${this._endPoint}/${url}', {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err
      })
  }
}
