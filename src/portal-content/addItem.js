import request from 'request';

/**
 * Generates an access token in exchange for user credentials.
 * @param {string} portal The URL to your portal
 * @param {string} username The user whose account the item is being added under
 * @param {string} folder The id of the user's folder the item should be added under
 * @param {object} description A javascript object of the item's description
 * @param {object} data A javascript object of the item's data
 * @param {string} token Authentication token
 * @param {string} thumbnailUrl The url of the thumbnail image to use
 * @param {boolean} [withCredentials=false] Set to true for IWA and PKI requests
 * @returns An xhr promise object
 */
export default function(portal, username, folder, description, data, token, thumbnailUrl, withCredentials=false) {

  /**
   * Clean up description items for posting.
   * This is necessary because some of the item descriptions
   * (e.g. tags and extent) are returned as arrays, but the post
   * operation expects comma separated strings.
   */
  array.forEach(description, function(item, value) {
    if (value === null) {
      description[item] = '';
    } else if (value instanceof Array) {
      description[item] = value.toString();
    }
  });

  let params = {
    item: description.title,
    text: JSON.stringify(data), // Stringify the Javascript object so it can be properly sent.
    overwrite: false, // Prevent users from accidentally overwriting items with the same name.
    thumbnailurl: thumbnailUrl,
    token: token,
    f: 'json'
  };

  let promise = new Promise(function(resolve) {

    request({
      url: portal + '/sharing/rest/content/users/' + username + '/' + folder + '/addItem',
      method: 'POST',
      json: true,
      qs: params,
      body: description,
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
