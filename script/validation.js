export function validateSignup (values) {
    const errors = {}

    // Name
    let checkName = values.name.replace(/\s/g, "");
    if (!checkName) {
        errors.name = "Bắt buộc"
    } else if (/[^\p{L}\s]/u.test(checkName)) {
        errors.name = "Tên không hợp lệ"
    } else if (checkName.length < 2) {
        errors.name = "Tên phải có ít nhất 2 ký tự"
    } else if (checkName.length > 32) {
        errors.name = "Tên không thế vượt quá 32 ký tự"
    }

    // Phone Number
    if (!values.phoneNumber) {
        errors.phoneNumber = "Bắt buộc"
    } else if (values.phoneNumber.length < 10  || values.phoneNumber.length > 11) {
        errors.phoneNumber = "Số điện thoại không hợp lệ"
    } else if (values.phoneNumber.length === 10 && values.phoneNumber.charAt(0) !== '0') {
        errors.phoneNumber = "Số điện thoại không hợp lệ"
    } else if (values.phoneNumber.length === 11 && values.phoneNumber.charAt(1) !== '2') {
        errors.phoneNumber = "Số điện thoại không hợp lệ"
    }

    // Password
    let trimmedPassword = values.password.trim();
    if (!trimmedPassword) {
        errors.password = "Bắt buộc";
    } else if (trimmedPassword.length < 8) {
        errors.password = "Mật khẩu phải chứa ít nhất 8 ký tự";
    } else if (trimmedPassword.length > 25) {
        errors.password = "Mật khẩu không được vượt quá 25 ký tự"
    }

    // Address
    if (!values.address) {
        errors.address = "Bắt buộc"
    }

    // Zipcode 
    if (!values.zipcode) {
        errors.zipcode = "Bắt buộc"
    } else if (values.zipcode.length !== 5) {
        errors.zipcode = "Mã bưu chính không hợp lệ"
    }

    return errors
}

export function validateLogin (values) {
    const errors = {}

    // Phone Number
    if (!values.phoneNumber) {
        errors.phoneNumber = "Bắt buộc"
    } else if (values.phoneNumber.length < 10  || values.phoneNumber.length > 11) {
        errors.phoneNumber = "Số điện thoại không hợp lệ"
    } else if (values.phoneNumber.length === 10 && values.phoneNumber.charAt(0) !== '0') {
        errors.phoneNumber = "Số điện thoại không hợp lệ"
    } else if (values.phoneNumber.length === 11 && values.phoneNumber.charAt(1) !== '2') {
        errors.phoneNumber = "Số điện thoại không hợp lệ"
    }

    // Password
    let trimmedPassword = values.password.trim();
    if (!trimmedPassword) {
        errors.password = "Bắt buộc";
    } else if (trimmedPassword.length < 8) {
        errors.password = "Mật khẩu phải chứa ít nhất 8 ký tự";
    } else if (trimmedPassword.length > 25) {
        errors.password = "Mật khẩu không được vượt quá 25 ký tự"
    }

    return errors
}