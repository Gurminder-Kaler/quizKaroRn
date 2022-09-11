import axios from 'axios';
import {
  ErrorMessage,
  baseURL,
  labelNoRecordFound,
  labelSWW,
} from '../constants/string';

import showSnack from '../utils/showSnack';
import AsyncStorage from '@react-native-community/async-storage';

export const apiRequest = async (url, method = 'GET', body = undefined) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('network api url ////////////////', baseURL + url);
    let params = {
      method: method,
      url: baseURL + url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    };
    if (body) {
      params.data = body;
    }
    const response = await axios(params)
      .then(res => {
        return res;
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
        });
    // console.log('response', response);
    if (response && response.data) {
      if (response.data.status === 200) {
        showSnack(response.data.message);
        // showToast(response.data.message, toastSuccess, toastBottom);
        return response.data;
      } else if (response.data.status === 201) {
        showSnack(response.data.message);
        // showToast(response.data.message, toastSuccess, toastBottom);
        return response.data;
      } else if (response.data.status === 401) {
        showSnack(response.data.message);
        // showToast(response.data.message, toastWarning, toastBottom);
        return response.data;
      } else if (response.data.status === 402) {
        showSnack(response.data.message);
        // showToast(response.data.message, toastWarning, toastBottom);
        return response.data;
      } else if (response.data.status === 404) {
        showSnack(response.data.message);
        // showToast(response.data.message, toastWarning, toastBottom);
        return response.data;
      } else if (response.data.status === 409) {
        console.log('LINE 48 network api');
        showSnack(response.data.message);
        // showToast(response.data.message, toastWarning, toastBottom);
        return response.data;
      } else if (response.data.status === 422) {
        showSnack(response.data.message);
        // showToast(response.data.message, toastWarning, toastBottom);
        return response.data;
      } else {
        showSnack(labelSWW);
        // showToast(labelSWW, toastWarning, toastBottom);
        return response;
      }
    } else {
      showSnack(labelNoRecordFound);
      // showToast(labelNoRecordFound, toastWarning, toastBottom);
    }
  } catch (err) {
    console.log('ERRRRR network api', JSON.stringify(err));
    if (err && err.response && err.response.data) {
      showSnack(err.message);
      // showToast(err.message);
      return err.response.data;
    } else {
      showSnack(ErrorMessage);
      // showToast(ErrorMessage, toastWarning, toastBottom);
      return {status: false};
    }
  }
};

export default apiRequest;
