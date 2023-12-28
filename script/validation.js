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

export function createOrderValidate (values) {
    const errors = {}

    // Sender
    // Name
    let checkName_1 = values.sender_name.replace(/\s/g, "");
    if (!checkName_1) {
        errors.sender_name = "Bắt buộc"
    } else if (/[^\p{L}\s]/u.test(checkName_1)) {
        errors.sender_name = "Tên không hợp lệ"
    } else if (checkName_1.length < 2) {
        errors.sender_name = "Tên phải có ít nhất 2 ký tự"
    } else if (checkName_1.length > 32) {
        errors.sender_name = "Tên không thế vượt quá 32 ký tự"
    }

    // Phone Number
    if (!values.sender_phone_number) {
        errors.sender_phone_number = "Bắt buộc"
    } else if (values.sender_phone_number.length < 10  || values.sender_phone_number.length > 11) {
        errors.sender_phone_number = "Số điện thoại không hợp lệ"
    } else if (values.sender_phone_number.length === 10 && values.sender_phone_number.charAt(0) !== '0') {
        errors.sender_phone_number = "Số điện thoại không hợp lệ"
    } else if (values.sender_phone_number.length === 11 && values.sender_phone_number.charAt(1) !== '2') {
        errors.sender_phone_number = "Số điện thoại không hợp lệ"
    }

    // Address
    if (!values.sender_address) {
        errors.sender_address = "Bắt buộc"
    }

    // Zipcode 
    if (!values.sender_zipcode) {
        errors.sender_zipcode = "Bắt buộc"
    } else if (values.sender_zipcode.length !== 5) {
        errors.sender_zipcode = "Mã bưu chính không hợp lệ"
    }

    // City 
    if (!values.sender_city) {
        errors.sender_city = "Bắt buộc"
    }

    // District
    if (!values.sender_district) {
        errors.sender_district = "Bắt buộc"
    }

    // Ward
    if (!values.sender_ward) {
        errors.sender_ward = "Bắt buộc"
    }

    // Receiver
    // Name
    let checkName_2 = values.receiver_name.replace(/\s/g, "");
    if (!checkName_2) {
        errors.receiver_name = "Bắt buộc"
    } else if (/[^\p{L}\s]/u.test(checkName_2)) {
        errors.receiver_name = "Tên không hợp lệ"
    } else if (checkName_2.length < 2) {
        errors.receiver_name = "Tên phải có ít nhất 2 ký tự"
    } else if (checkName_2.length > 32) {
        errors.receiver_name = "Tên không thế vượt quá 32 ký tự"
    }

    // Phone Number
    if (!values.receiver_phone_number) {
        errors.receiver_phone_number = "Bắt buộc"
    } else if (values.receiver_phone_number.length < 10  || values.receiver_phone_number.length > 11) {
        errors.receiver_phone_number = "Số điện thoại không hợp lệ"
    } else if (values.receiver_phone_number.length === 10 && values.receiver_phone_number.charAt(0) !== '0') {
        errors.receiver_phone_number = "Số điện thoại không hợp lệ"
    } else if (values.receiver_phone_number.length === 11 && values.receiver_phone_number.charAt(1) !== '2') {
        errors.receiver_phone_number = "Số điện thoại không hợp lệ"
    }

    // Address
    if (!values.receiver_address) {
        errors.receiver_address = "Bắt buộc"
    }

    // Zipcode 
    if (!values.receiver_zipcode) {
        errors.receiver_zipcode = "Bắt buộc"
    } else if (values.receiver_zipcode.length !== 5) {
        errors.receiver_zipcode = "Mã bưu chính không hợp lệ"
    }

    // City 
    if (!values.receiver_city) {
        errors.receiver_city = "Bắt buộc"
    }

    // District
    if (!values.receiver_district) {
        errors.receiver_district = "Bắt buộc"
    }

    // Ward
    if (!values.receiver_ward) {
        errors.receiver_ward = "Bắt buộc"
    }

    // Goods 
    // Weight
    if (!values.goods_weight) {
        errors.goods_weight = "Bắt buộc"
    }

    // Width
    if (!values.goods_width) {
        errors.goods_width = "Bắt buộc"
    }

    // Height
    if (!values.goods_height) {
        errors.goods_height = "Bắt buộc"
    }

    // Length
    if (!values.goods_length) {
        errors.goods_length = "Bắt buộc"
    }

    // Amount
    if (!values.goods_amount) {
        errors.goods_amount = "Bắt buộc"
    }

    return errors
}

export function createStaffAccValid (values) {
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

    // City 
    if (!values.city) {
        errors.city = "Bắt buộc"
    }

    // District
    if (!values.district) {
        errors.district = "Bắt buộc"
    }

    return errors
}