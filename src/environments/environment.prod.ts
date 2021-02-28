export const environment = {
  production: true,
  stage: 'production',


  base: 'https://api.clicca.com.br/api/v1',
  freight_url: `https://api.clicca.com.br/api/v1/freight`,
  authenticator_url: `https://api.clicca.com.br/api/v1/authenticator`,
  vehicle_url: `https://api.clicca.com.br/api/v1/vehicle_selling`,
  campaign_url: `https://api.clicca.com.br/api/v1/campaigns`,
  card_url: `https://api.clicca.com.br/api/v1/card`,
  contact_url: `https://api.clicca.com.br/api/v1/contact_us`,

  authentication_token: 'Basic OGVjNzY2NDEtZDJlZi00OTJlLThjYzMtNDJhOGJjNjgxY2ZhOjNhMDk5N2ZlNzg2Y2MzYTM1ZmIwYjgyMzJiMDc5OWRj',

  pagseguro_email: 'fabiana.mendes@jsl.com.br',
  pagseguro_token: 'E9DF8F2F7E864D80A57713D77ACA270B',
  pagseguro_url: 'https://ws.sandbox.pagseguro.uol.com.br/v2/sessions/',
  pagseguro_script: 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js',

  firebase_serverkey: 'AIzaSyAvYqX6MgnxzwDbYyeZmhdF9jW5J6NMOFc',
  image_push: 'http://clicca.s3-website-us-west-2.amazonaws.com/',

  new_url: 'http://brasilcaminhoneiro.com.br',

  tem_url: 'https://api.meutem.com.br',
  tem_providers_url: 'https://api-app.temrede.com.br',
  tem_transaction_key: 'nSJNPgabhD392TJJyabeAeVPSuD88vNMtK6z5XSnKKW9mTFLVd',
  tem_authorization: 'Basic anNsOjM0MWVjYjMwNGY4YzQ2N2JjNTBmYjAyOTQyZjg5M2I2YzkyYmMxMWY=',

  isDevelopment: (): boolean => {
    return false;
  }
};