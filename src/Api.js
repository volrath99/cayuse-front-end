const url = process.env.REACT_APP_API_HOST + "/cayuse/location/";

class Api {

  static getZipData(zip, onSuccess, onFailure) {
    fetch(url + zip)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Failed to retrieve zip information.");
        }
      })
      .then(result => onSuccess(result))
      .catch(error => onFailure(error));
  }
  
}

export default Api;
