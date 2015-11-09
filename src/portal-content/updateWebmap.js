import request from 'request';

/**
 * Update the the content of a web map.
 * @param {string} portal The URL to your portal
 * @param {string} username The user whose account the item is being added under
 * @param {string} folder The id of the user's folder the item should be added under
 * @param {string} id The item to update
 * @param {object} data A javascript object of the web map data
 * @param {string} token Authentication token
 * @param {string} thumbnailUrl The url of the thumbnail image to use
 * @param {boolean} [withCredentials=false] Set to true for IWA and PKI requests
 * @returns An xhr promise object
 */
export default function(portal, username, folder, id, data, token, withCredentials=false) {

  let params = {
    text: JSON.stringify(data), // Stringify the Javascript object so it can be properly sent.
    token: token,
    f: 'json'
  };

  let promise = new Promise(function(resolve) {

    request({
      url: portal + '/sharing/rest/content/users/' + username + '/' + folder + '/items/' + id + '/update',
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
