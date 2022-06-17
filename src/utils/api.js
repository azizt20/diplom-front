import axios from "axios";
// import regeneratorRuntime from "regenerator-runtime";

import {
    STATUS_ERROR,
    STATUS_SUCCESS,
    STATUS_FAIL,
    STATUS_UPDATE,
    STATUS_CREATE,
} from "./status";

var token = localStorage.getItem("token");

if (token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
}


function hasFile(data) {
    if (data instanceof File) {
        return true;
    }

    if (data && (Array.isArray(data) || data instanceof Object)) {
        for (let k in data) {
            if (Object.prototype.hasOwnProperty.call(data, k)) {
                if (hasFile(data[k])) {
                    return true;
                }
            }
        }
    }

    return false;
}

function recursiveAdd(formData, data, prefix = "") {
    if (data instanceof File) {
        formData.append(prefix, data);
        return;
    }

    if (data && (Array.isArray(data) || data instanceof Object)) {
        for (let k in data) {
            if (Object.prototype.hasOwnProperty.call(data, k)) {
                recursiveAdd(
                    formData,
                    data[k],
                    prefix + (prefix ? "[" : "") + k + (prefix ? "]" : "")
                );
            }
        }
    } else {
        formData.append(prefix, data);
    }
}

const api = async (url, data, params, method) => {
    try {
        if (typeof method == "undefined") {
            method = "POST";
        }

        let headers = {};

        if (hasFile(data)) {
            let formData = new FormData();
            recursiveAdd(formData, data);

            headers["Content-Type"] = "multipart/form-data";
            data = formData;
        }

        let resp = await axios({
            url,
            data,
            params,
            method,
            headers,
        });

        let result = resp.data;

        switch (result.status) {
            case STATUS_SUCCESS:
                result.success = true;
                break;
            case STATUS_UPDATE:
                result.success = true;
                break;
            case STATUS_CREATE:
                result.success = true;
                break;
            case STATUS_FAIL:
                result.fail = true;
                break;
        }

        result.code = 200;
        return result;
    } catch (e) {
        let r = e.response.data;
        if (!r || typeof r !== "object") {
            r = {
                status: STATUS_ERROR,
                message: e.toString(),
            };
        }

        r.code = e.response.status;
        r.error = true;
        return r;
    }
};

export default api;

export function get(url, params) {
    return api(url, {}, params, "GET");
}

export function put(url, data, params) {
    return api(url, data, params, "PUT");
}

export function patch(url, data, params) {
    return api(url, data, params, "PATCH");
}

export function post(url, data, params) {
    return api(url, data, params, "POST");
}

export function del(url, params) {
    return api(url, {}, params, "DELETE");
}