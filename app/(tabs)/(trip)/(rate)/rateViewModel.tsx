export const handleRating = ({
    isSelectedCondition,
    isSelectedComfort,
    isSelectedAdequacy,
    isSelectedStop,
    isSelectedInfo,
    isSelectedAvailable,
    isSelectedRoute,
    isSelectedOverall
} : any) => {

    let rateString : string[] = [];

    if (isSelectedCondition) {
        rateString.push(isSelectedCondition);
    } else {
        rateString.push('0');
    }

    if (isSelectedComfort) {
        rateString.push(isSelectedComfort);
    } else {
        rateString.push('0');
    }

    if (isSelectedAdequacy) {
        rateString.push(isSelectedAdequacy);
    } else {
        rateString.push('0');
    }

    if (isSelectedStop) {
        rateString.push(isSelectedStop);
    } else {
        rateString.push('0');
    }

    if (isSelectedInfo) {
        rateString.push(isSelectedInfo);
    } else {
        rateString.push('0');
    }

    if (isSelectedAvailable) {
        rateString.push(isSelectedAvailable);
    } else {
        rateString.push('0');
    }

    if (isSelectedRoute) {
        rateString.push(isSelectedRoute);
    } else {
        rateString.push('0');
    }

    if (isSelectedOverall) {
        rateString.push(isSelectedOverall);
    } else {
        rateString.push('0');
    }

    return rateString.join(',');
}