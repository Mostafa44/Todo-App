// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '49ns91xlje'
export const apiEndpoint = `https://${apiId}.execute-api.eu-west-3.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-o3mdmxx4.us.auth0.com',            // Auth0 domain
  clientId: '41sv7OA06sLMo6Pyp30WQbZtwU3ChNc2',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
