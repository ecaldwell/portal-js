import request from 'request';

/**
 * Search items in the portal.
 * @param {string} portal The URL to your portal
 * @param {string} query Search string
 * @param {string} token Authentication token
 * @param {number} [num=100] The number of search results (max 100)
 * @param {string} [sortField='numViews'] The field to sort results by (title, uploaded, type, owner, modified, avgRating, numRatings, numComments, numViews)
 * @param {string} [sortOrder='desc'] Sort ascending (asc) or descending (desc)
 * @param {boolean} [withCredentials=false] Set to true for IWA and PKI requests
 * @returns An xhr promise object
 */
export default function(portal, query, token, num=100, sortField='numViews', sortOrder='desc', withCredentials=false) {

  let params = {
    q: query,
    num: num,
    sortField: sortField,
    sortOrder: sortOrder,
    token: token,
    f: 'json'
  };

  let promise = new Promise(function(resolve) {

    request({
      url: portal + '/sharing/rest/search',
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
