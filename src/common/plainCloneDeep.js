export default function plainCloneDeep(obj) {
    if (obj === null || obj === undefined || typeof obj !== 'object')  {
        return obj
    }

    if (obj instanceof Date) {
        return new Date(obj);
    }

    if (obj instanceof Array) {
        return plainCloneDeepArray(obj);
    }

    return plainCloneDeepObject(obj);
}

function plainCloneDeepArray(obj) {
    const clone = [];
    for (let idx = 0; idx < obj.length; ++idx) {
        clone[idx] = plainCloneDeep(obj[idx]);
    }
    return clone;
}

function plainCloneDeepObject(obj) {
    const clone = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = plainCloneDeep(obj[key]);
        }
    }
    return clone;
}
