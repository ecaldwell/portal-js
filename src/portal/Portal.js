import request from "dojo/request";
import array from "dojo/_base/array";

export default class Portal {
  constructor(config) {
    config = typeof config !== "undefined" ? config : {};
    this.portalUrl = config.url;
    this.username = config.username;
    this.token = config.token;
    this.withCredentials = false;

    this._version().then(response => {
      this.version = response.currentVersion;
    });

    this._self().then(response => {
      this.self = response;
    });
  }

  /**
   * Return the version of the portal.
   */
  _version() {
    return request(this.portalUrl + "sharing/rest", {
      method: "GET",
      query: {
        f: "json"
      },
      handleAs: "json",
      headers: {
        "X-Requested-With": null
      },
      withCredentials: this.withCredentials
    });
  }

  /**
   * Return the view of the portal as seen by the current user,
   * anonymous or logged in.
   */
  _self() {
    return request(this.portalUrl + "sharing/rest/portals/self", {
      method: "GET",
      query: {
        token: this.token,
        f: "json"
      },
      handleAs: "json",
      headers: {
        "X-Requested-With": null
      },
      withCredentials: this.withCredentials
    });
  }

  //  /**
  //   * Generates an access token in exchange for user credentials that
  //   * can be used by clients when working with the ArcGIS Portal API.
  //   */
    generateToken(username, password) {
      return request(this.portalUrl + "sharing/rest/generateToken", {
        type: "POST",
        data: {
          username: username,
          password: password,
          referer: document.URL, // URL of the sending app.
          expiration: 60, // Lifetime of the token in minutes.
          f: "json"
        },
        handleAs: "json",
        headers: {
          "X-Requested-With": null
        },
        withCredentials: this.withCredentials
      });
    }

  /**
   * Searches for content items in the portal.
   * The results of a search only contain items that the user
   * (token) has permission to access.
   * Excluding a token will yield only public items.
   */
  search(query, numResults, sortField, sortOrder) {
    return request(this.portalUrl + "sharing/rest/search", {
      type: "GET",
      query: {
        q: query,
        num: numResults,
        sortField: sortField,
        sortOrder: sortOrder,
        token: this.token,
        f: "json"
      },
      handleAs: "json",
      headers: {
        "X-Requested-With": null
      },
      withCredentials: this.withCredentials
    });
  }

    /**
     * Get the service endpoints for hosted feature and tile services.
     */
    hostingUrls() {
      return request(this.portalUrl + "sharing/rest/portals/" + this.id + "/urls?", {
        type: "GET",
        query: {
          token: this.token,
          f: "json"
        },
        handleAs: "json",
        headers: {
          "X-Requested-With": null
        },
        withCredentials: this.withCredentials
      });
    }

  /**
   *
   */
  userProfile(username) {
    return request(this.portalUrl + "sharing/rest/community/users/" + username, {
      type: "GET",
      query: {
        token: this.token,
        f: "json"
      },
      handleAs: "json",
      headers: {
        "X-Requested-With": null
      },
      withCredentials: this.withCredentials
    });
  }

  /**
   *
   */
  userContent(username, folder) {
    return request(this.portalUrl + "sharing/rest/content/users/" + username + "/" + folder, {
      type: "GET",
      query: {
        token: this.token,
        f: "json"
      },
      handleAs: "json",
      headers: {
        "X-Requested-With": null
      },
      withCredentials: this.withCredentials
    });
  }

  /**
   *
   */
  itemDescription(id) {
    return request(this.portalUrl + "sharing/rest/content/items/" + id, {
      type: "GET",
      query: {
        token: this.token,
        f: "json"
      },
      handleAs: "json",
      headers: {
        "X-Requested-With": null
      },
      withCredentials: this.withCredentials
    });
  }

  /**
   *
   */
  itemData(id) {
    return request(this.portalUrl + "sharing/rest/content/items/" + id + "/data", {
      type: "GET",
      query: {
        token: this.token,
        f: "json"
      },
      handleAs: "json",
      headers: {
        "X-Requested-With": null
      },
      withCredentials: this.withCredentials
    });
  }

  /**
   * Create a new item.
   */
  addItem(username, folder, description, data, thumbnailUrl) {
    /**
     * Clean up description items for posting.
     * This is necessary because some of the item descriptions
     * (e.g. tags and extent) are returned as arrays, but the post
     * operation expects comma separated strings.
     */
    array.forEach(description, function (item, value) {
      if (value === null) {
        description[item] = "";
      } else if (value instanceof Array) {
        description[item] = value.toString();
      }
    });

    var params = {
      item: description.title,
      text: JSON.stringify(data), // Stringify the Javascript object so it can be properly sent.
      overwrite: false, // Prevent users from accidentally overwriting items with the same name.
      thumbnailurl: thumbnailUrl,
      f: "json",
      token: this.token
    };
    return request(this.portalUrl + "sharing/rest/content/users/" + username + "/" + folder + "/addItem", {
      type: "POST",
      //      data: lang.mixin(description, params), // Merge the description and params objects.
      data: Object.assign(description, params), // Merge the description and params objects.
      handleAs: "json",
      headers: {
        "X-Requested-With": null
      },
      withCredentials: this.withCredentials
    });
  }

  /**
   * Update the content in a web map.
   */
  updateWebmapData(username, folder, id, data) {
    return request(this.portalUrl + "sharing/rest/content/users/" + username + "/" + folder + "/items/" + id + "/update", {
      type: "POST",
      data: {
        text: JSON.stringify(data), // Stringify the Javascript object so it can be properly sent.
        token: this.token,
        f: "json"
      },
      handleAs: "json",
      headers: {
        "X-Requested-With": null
      },
      withCredentials: this.withCredentials
    });
  }

  /**
   * Update the description for an item.
   */
  updateDescription(username, id, folder, description) {
    var postData = JSON.parse(description);
    /**
     * Clean up description items for posting.
     * This is necessary because some of the item descriptions
     * (e.g. tags and extent) are returned as arrays, but the post
     * operation expects comma separated strings.
     */
    array.forEach(postData, function (item, value) {
      if (value === null) {
        postData[item] = "";
      } else if (value instanceof Array) {
        postData[item] = value.join(",");
      }
    });
    postData.token = this.token;
    postData.f = "json";
    return request(this.portalUrl + "sharing/rest/content/users/" + username + "/" + folder + "/items/" + id + "/update", {
      type: "POST",
      data: postData,
      handleAs: "json",
      headers: {
        "X-Requested-With": null
      },
      withCredentials: this.withCredentials
    });
  }

  /**
   *
   */
  updateData(username, id, folder, data) {
    return request(this.portalUrl + "sharing/rest/content/users/" + username + "/" + folder + "/items/" + id + "/update", {
      type: "POST",
      data: {
        text: data,
        token: this.token,
        f: "json"
      },
      handleAs: "json",
      headers: {
        "X-Requested-With": null
      },
      withCredentials: this.withCredentials
    });
  }

  /**
   * Update the URL of a registered service or web application.
   */
  updateUrl(username, folder, id, url) {
    return request(this.portalUrl + "sharing/rest/content/users/" + username + "/" + folder + "/items/" + id + "/update", {
      type: "POST",
      data: {
        url: url,
        token: this.token,
        f: "json"
      },
      handleAs: "json",
      headers: {
        "X-Requested-With": null
      },
      withCredentials: this.withCredentials
    });
  }
}