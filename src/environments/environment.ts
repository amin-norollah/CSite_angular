export const environment = {
  production: false,

  //Related to APIs
  apiRoot: 'https://localhost:8088',
  carEndpoint: '/api/1.0/Car',
  productEndpoint: '/api/1.0/Product',
  receiptsEndpoint: '/api/1.0/Receipts',
  usersEndpoint: '/api/1.0/Users',

  //Authentication
  clientRoot: 'http://localhost:4200',
  idpAuthority: 'https://localhost:8800',
  clientId: 'CSite_client',
  clientScope: 'openid roles profile offline_access CSite_API',
};
