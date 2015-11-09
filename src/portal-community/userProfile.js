import request from 'request';

/**
 * Get info about a user.
 * @param {string} portal The URL to your portal
 * @param {string} username The username to get info about
 * @param {string} token Authentication token
 * @param {boolean} [withCredentials=false] Set to true for IWA and PKI requests
 * @returns An xhr promise object
 */
export default function(portal, username, token, withCredentials=false) {

  let params = {
    token: token,
    f: 'json'
  };

  let promise = new Promise(function(resolve) {

    request({
      url: portal + 'sharing/rest/community/users/' + username,
      method: 'GET',
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
