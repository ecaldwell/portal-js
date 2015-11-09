import request from 'request';

/**
 * Get the service endpoints for hosted feature and tile services.
 * @param {string} portal The URL to your portal
 * @param {string} orgId The organization ID returned in the portal self object
 * @param {string} token Authentication token
 * @param {boolean}x [withCredentials=false] Set to true for IWA and PKI requests
 * @returns An xhr promise object
 */
export default function(portal, orgId, token, withCredentials=false) {

  let params = {
    token: token,
    f: 'json'
  };

  let promise = new Promise(function(resolve) {

    request({
      url: portal + '/sharing/rest/portals/' + orgId + '/urls',
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
