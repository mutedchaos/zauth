import { base } from './base'

export const authorizeAPI = {
  url: base
    .declareGetAPI('/authenticate/url/v1')
    .query(['client_id', 'nonce', 'scope', 'redirect_uri'] as const)
    .optionalQuery([
      'state',
      'prompt',
      'display',
      'max_age',
      'ui_locales',
      'claims_locales',
      'id_token_hint',
      'login_hint',
    ] as const)
    .response<{ url: string }>(),
}
