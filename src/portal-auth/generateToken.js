import request from 'request';

/**
 * Generates an access token in exchange for user credentials.
 * @param {string} portal The URL to your portal
 * @param {string} username username
 * @param {string} password password
 * @param {number} expiration The lifetime in minutes of the token
 * @param {string} [referer='http://esri.com'] The url of the requesting server or application
 * @param {boolean} [withCredentials=false] Set to true for IWA and PKI requests
 * @returns An xhr promise object
 */
export default function(portal, username, password, expiration=60, referer='http://esri.com', withCredentials=false) {

  let params = {
    username: username,
    password: password,
    client: 'referer',
    referer: referer,
    expiration: expiration,
    f: 'json'
  };

  let promise = new Promise(function(resolve) {

    request({
      url: portal + '/sharing/rest/generateToken',
      method: 'POST',
      json: true,
      qs: params,
      body: '',
      withCredentials: withCredentials
    }, function(error, response, body) {
      if (error) {
        console.log(error);
      } else if (!error && response.statusCode == 200) {
        resolve(body);
      }
    });
  });

  return promise;
}
