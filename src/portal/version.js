import request from 'request';

/**
 * Get the portal's version.
 * @param {string} portal The URL to your portal
 * @param {boolean}x [withCredentials=false] Set to true for IWA and PKI requests
 * @returns An xhr promise object
 */
export default function(portal, withCredentials=false) {

  let params = {
    f: 'json'
  };

  let promise = new Promise(function(resolve) {

    request({
      url: portal + '/sharing/rest',
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
