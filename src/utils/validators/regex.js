export const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/;

export const passwordRegex = /^(?=.*[A-Za-z\d])(?=.*[ !"#£$%&'()*+,-./:;<=>?@[\]\\^_`{|}~])[A-Za-z\d !"#£$%&'()*+,-./:;<=>?@[\]\\^_`{|}~]{8,}$/;

export const phoneRegex = /^((\s*\(?0\d{4}\)?(\s?|-)\d{3}(\s?|-)\d{3}\s?)|(\s*\(?0\d{3}\)?(\s?|-)\d{3}(\s?|-)\d{4}\s*)|(\s?(7|8)(\d{7}|\d{3}(\\-|\s{1})\d{4})))$/;

export const numberRegex = /^\d+$/;

export const decimalRegex = /^[-]?\d+(\.\d+)?$/;

export const alphaOnlyRegex = /^[a-zA-z]{1,}$/;
