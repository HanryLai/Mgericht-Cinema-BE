import * as _ from 'lodash'; // Import all lodash functions

export const getInfoData = <T>(object: T, fields: string[] = []): Partial<T> => {
    // Type safety for fields array and object
    if (!Array.isArray(fields)) {
        throw new Error('fields parameter must be an array of strings');
    }

    // Type safety for object
    if (typeof object !== 'object' || object === null) {
        throw new Error('object parameter must be an object');
    }

    return _.pick(object, fields);
};
