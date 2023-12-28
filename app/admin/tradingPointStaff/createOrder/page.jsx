'use client'

import { FaPhone } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";
import { FaSignsPost } from "react-icons/fa6";
import { FaTreeCity } from "react-icons/fa6";
import { MdOutlineLocationCity } from "react-icons/md";
import { RiUserReceived2Fill } from "react-icons/ri";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaMountainCity } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { createOrderValidate } from "@/script/validation";
import { MdError } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function CreateOrder() {
    const [provinces, setProvinces] = useState([])
    const [province_1, setProvince_1] = useState("")
    const [province_2, setProvince_2] = useState("")
    const [districts_1, setDistricts_1] = useState([])
    const [districts_2, setDistricts_2] = useState([])
    const [district_1, setDistrict_1] = useState("")
    const [district_2, setDistrict_2] = useState("")
    const [wards_1, setWards_1] = useState("")
    const [wards_2, setWards_2] = useState("")
    const [ward_1, setWard_1] = useState("")
    const [ward_2, setWard_2] = useState("")
    const router = useRouter()
    
    const formik = useFormik({
        initialValues: {
            sender_name: "",
            sender_phone_number: "",
            sender_zipcode: "",
            sender_city: "",
            sender_district: "",
            sender_ward: "",
            sender_address: "",
            receiver_name: "",
            receiver_phone_number: "",
            receiver_zipcode: "",
            receiver_city: "",
            receiver_district: "",
            receiver_ward: "",
            receiver_address: "",
            goods_type: "paper",
            goods_width: 0,
            goods_amount: 0,
            goods_note: "Ghi chú ...",
            goods_width: 0,
            goods_height: 0,
            goods_length: 0,
        },
        validate: createOrderValidate,
        onSubmit: async values => {
            const res_1 = await fetch("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services?" + new URLSearchParams({
                shop_id: process.env.NEXT_PUBLIC_SHOP_ID,
                from_district: district_1,
                to_district: district_2,
            }), {
                method: "GET",
                headers: {
                    Token: process.env.NEXT_PUBLIC_TOKEN,
                }
            })

            const data_1 = await res_1.json()
            const service_id = data_1.data[0].service_id

            const res_2 = await fetch("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?" + new URLSearchParams({
                service_id: service_id,
                insurance_value: 50000,
                coupon: "",
                from_district_id: district_1,
                from_ward_code: ward_1.toString(),
                to_district_id: district_2,
                to_ward_code: ward_2.toString(),
                height: values.goods_height,
                length: values.goods_length,
                weight: values.goods_weight,
                width: values.goods_width,
            }), {
                method: "GET",
                headers: {
                    Token: process.env.NEXT_PUBLIC_TOKEN,
                    ShopId: process.env.NEXT_PUBLIC_SHOP_ID,
                }
            })

            const data_2 = await res_2.json()
            const price = data_2.data

            try {
                const res = await fetch('/api/order/create', {
                    method: 'POST',
                    body: JSON.stringify({
                        state: "Chờ phê duyệt",
                        sender: {
                            name: values.sender_name,
                            phoneNumber: values.sender_phone_number,
                            zipcode: values.sender_zipcode,
                            address: values.sender_address,
                            city: values.sender_city,
                            district: values.sender_district,
                        },
                        receiver: {
                            name: values.receiver_name,
                            phoneNumber: values.receiver_phone_number,
                            zipcode: values.receiver_zipcode,
                            address: values.receiver_address,
                            city: values.receiver_city,
                            district: values.receiver_district,
                        },
                        type: values.goods_type,
                        weight: values.goods_weight,
                        width: values.goods_width,
                        height: values.goods_height,
                        length: values.goods_length,
                        amount: values.goods_amount,
                        note: values.goods_note,
                        price: {
                            total: price.total,
                            service_fee: price.service_fee,
                            insurance_fee: price.insurance_fee,
                            pick_station_fee: price.pick_station_fee
                        }
                    })
                })

                if (res.status === 201) {
                    router.push('/admin/tradingPointStaff/sendOrder')
                }
            } catch (error) {
                console.log(error)
            }
            
        }
    })

    useEffect(() => {
        const fetchProvinces = async () => {
            const res = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province", {
                method: "GET",
                headers: {
                    token: process.env.NEXT_PUBLIC_TOKEN,
                }
            })
            const data = await res.json()
            setProvinces(data.data)
        }
        fetchProvinces()
    }, [])

    useEffect(() => {
        const fetchDistricts = async () => {
            const res = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/district?" +  new URLSearchParams({
                province_id: province_1,
            }), {
                method: "GET",
                headers: {
                    token: process.env.NEXT_PUBLIC_TOKEN,
                }
            })
            const data = await res.json()
            setDistricts_1(data.data)
        }
        province_1 && fetchDistricts()
    }, [province_1])

    useEffect(() => {
        const fetchDistricts = async () => {
            const res = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/district?" +  new URLSearchParams({
                province_id: province_2,
            }), {
                method: "GET",
                headers: {
                    token: process.env.NEXT_PUBLIC_TOKEN,
                }
            })
            const data = await res.json()
            setDistricts_2(data.data)
        }
        province_2 && fetchDistricts()
    }, [province_2])

    useEffect(() => {
        const fetchDistricts = async () => {
            const res = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?" +  new URLSearchParams({
                district_id: district_1,
            }), {
                method: "GET",
                headers: {
                    token: process.env.NEXT_PUBLIC_TOKEN,
                }
            })
            const data = await res.json()
            setWards_1(data.data)
        }
        district_1 && fetchDistricts()
    }, [district_1])

    useEffect(() => {
        const fetchDistricts = async () => {
            const res = await fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?" +  new URLSearchParams({
                district_id: district_2,
            }), {
                method: "GET",
                headers: {
                    token: process.env.NEXT_PUBLIC_TOKEN,
                }
            })
            const data = await res.json()
            setWards_2(data.data)
        }
        district_2 && fetchDistricts()
    }, [district_2])

    return (
        <form onSubmit={formik.handleSubmit} className="relative p-10 shadow-lg w-[60%] text-[#FF5B00] kanit">
            <div className="flex items-center gap-3 font-bold text-[32px] mb-6">
                <FaEdit />
                <h1>TẠO ĐƠN HÀNG</h1>
            </div>

            <div>
                <div className="flex gap-2 items-center font-bold">
                    <BsFillSendFill />
                    <h1>Thông tin người gửi</h1>
                </div>
                
                <div className="flex gap-4 mt-4">
                    <div>
                        <div className='flex items-center w-[250px] text-[#A9A9A9] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2 cursor-pointer'>
                            <FaUser size={18}/>
                            <input type="text" {...formik.getFieldProps('sender_name')} name="sender_name" className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]' placeholder="Họ và tên" />
                        </div>
                        {formik.touched.sender_name && formik.errors.sender_name && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.sender_name}
                            </div>
                        }
                    </div>
                    
                    <div>
                        <div className='flex items-center w-[250px] text-[#A9A9A9] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2 cursor-pointer'>
                            <FaPhone size={18}/>
                            <input 
                                type="text" 
                                onKeyDown={(event) => {
                                    const charCode = event.which ? event.which : event.keyCode;
                                    if (
                                    charCode !== 8 && // Kiểm tra không phải phím Backspace
                                    charCode !== 9 && // Kiểm tra không phải phím Tab
                                    charCode !== 13 && // Kiểm tra không phải phím Enter
                                    (charCode < 48 || charCode > 57) // Kiểm tra không phải các phím số từ 0 đến 9
                                    ) {
                                    event.preventDefault();
                                    return false;
                                    }
                                    return true;
                                }}
                                {...formik.getFieldProps('sender_phone_number')}
                                name="sender_phone_number"
                                className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]' 
                                placeholder="Số điện thoại"
                            />
                        </div>
                        {formik.touched.sender_phone_number && formik.errors.sender_phone_number && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.sender_phone_number}
                            </div>
                        }
                    </div>
                    
                    <div>
                        <div className='flex items-center w-[250px] text-[#A9A9A9] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2 cursor-pointer'>
                            <FaSignsPost size={18}/>
                            <input 
                                type="text" 
                                onKeyDown={(event) => {
                                    const charCode = event.which ? event.which : event.keyCode;
                                    if (
                                    charCode !== 8 && // Kiểm tra không phải phím Backspace
                                    charCode !== 9 && // Kiểm tra không phải phím Tab
                                    charCode !== 13 && // Kiểm tra không phải phím Enter
                                    (charCode < 48 || charCode > 57) // Kiểm tra không phải các phím số từ 0 đến 9
                                    ) {
                                    event.preventDefault();
                                    return false;
                                    }
                                    return true;
                                }}
                                {...formik.getFieldProps('sender_zipcode')}
                                name="sender_zipcode"
                                className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]' 
                                placeholder="Mã bưu chính"
                            />
                        </div>    
                        {formik.touched.sender_zipcode && formik.errors.sender_zipcode && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.sender_zipcode}
                            </div>
                        }
                    </div>
                </div>
                <div className="flex mt-3 gap-4">
                    <div>
                        <div className='flex items-center text-[#A9A9A9] w-[250px] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2'>
                            <FaTreeCity />
                            <select {...formik.getFieldProps('sender_city')} name="sender_city" id="" className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00] cursor-pointer' onChange={(e) => {formik.setFieldValue('sender_city', e.target.value); setProvince_1(e.target.value)}}>
                                <option value="">Tỉnh / Thành phố</option>
                                {provinces && provinces?.map(province => {
                                    return <option value={province.ProvinceID} key={province.ProvinceID}>{province.ProvinceName}</option>
                                })}
                            </select>
                        </div>
                        {formik.touched.sender_city && formik.errors.sender_city && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.sender_city}
                            </div>
                        }
                    </div>
                    <div>
                        <div className='flex items-center text-[#A9A9A9] w-[250px] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2'>
                            <MdOutlineLocationCity />
                            <select {...formik.getFieldProps('sender_district')} name="sender_district" id="" className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00] cursor-pointer' onChange={(e) => {formik.setFieldValue('sender_district', e.target.value); setDistrict_1(e.target.value)}}>
                                <option value="">Quận / Huyện</option>
                                {districts_1 && districts_1?.map(district => {
                                    return <option value={district.DistrictID} key={district.DistrictID}>{district.DistrictName}</option>
                                })}
                            </select>
                        </div>
                        {formik.touched.sender_district && formik.errors.sender_district && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.sender_district}
                            </div>
                        }
                    </div>
                    <div>
                        <div className='flex items-center text-[#A9A9A9] w-[250px] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2'>
                            <FaMountainCity />
                            <select {...formik.getFieldProps('sender_ward')} name="sender_ward" id="" className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00] cursor-pointer' onChange={(e) => {formik.setFieldValue('sender_ward', e.target.value); setWard_1(e.target.value)}}>
                                <option value="">Phường / Xã</option>
                                {wards_1 && wards_1?.map(ward => {
                                    return <option value={ward.WardCode} key={ward.WardCode}>{ward.WardName}</option>
                                })}
                            </select>
                        </div>
                        {formik.touched.sender_ward && formik.errors.sender_ward && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.sender_ward}
                            </div>
                        }
                    </div>
                </div>
                <div className="mt-3 flex items-center text-[#A9A9A9] w-full h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2">
                    <FaAddressCard />
                    <input type="text" {...formik.getFieldProps('sender_address')} name="sender_address" placeholder="Địa chỉ cụ thể" className="w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]"/>
                </div>
                {formik.touched.sender_address && formik.errors.sender_address && 
                    <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                        <MdError size={20} />
                        {formik.errors.sender_address}
                    </div>
                }
            </div>

            <div className="mt-10">
                <div className="flex gap-2 items-center font-bold">
                    <RiUserReceived2Fill />
                    <h1>Thông tin người nhận</h1>
                </div>
                
                <div className="flex gap-4 mt-4">
                    <div>
                        <div className='flex items-center w-[250px] text-[#A9A9A9] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2 cursor-pointer'>
                            <FaUser size={18}/>
                            <input type="text" {...formik.getFieldProps('receiver_name')} name="receiver_name" className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]' placeholder="Họ và tên"/>
                        </div>
                        {formik.touched.receiver_name && formik.errors.receiver_name && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.receiver_name}
                            </div>
                        }
                    </div>
                    <div>
                        <div className='flex items-center w-[250px] text-[#A9A9A9] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2 cursor-pointer'>
                            <FaPhone size={18}/>
                            <input 
                                type="text" 
                                onKeyDown={(event) => {
                                    const charCode = event.which ? event.which : event.keyCode;
                                    if (
                                    charCode !== 8 && // Kiểm tra không phải phím Backspace
                                    charCode !== 9 && // Kiểm tra không phải phím Tab
                                    charCode !== 13 && // Kiểm tra không phải phím Enter
                                    (charCode < 48 || charCode > 57) // Kiểm tra không phải các phím số từ 0 đến 9
                                    ) {
                                    event.preventDefault();
                                    return false;
                                    }
                                    return true;
                                }}
                                {...formik.getFieldProps('receiver_phone_number')}
                                name="receiver_phone_number"
                                className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]' 
                                placeholder="Số điện thoại"
                            />
                        </div>
                        {formik.touched.receiver_phone_number && formik.errors.receiver_phone_number && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.receiver_phone_number}
                            </div>
                        }
                    </div>
                    <div>
                        <div className='flex items-center w-[250px] text-[#A9A9A9] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2 cursor-pointer'>
                            <FaSignsPost size={18}/>
                            <input 
                                type="text" 
                                onKeyDown={(event) => {
                                    const charCode = event.which ? event.which : event.keyCode;
                                    if (
                                    charCode !== 8 && // Kiểm tra không phải phím Backspace
                                    charCode !== 9 && // Kiểm tra không phải phím Tab
                                    charCode !== 13 && // Kiểm tra không phải phím Enter
                                    (charCode < 48 || charCode > 57) // Kiểm tra không phải các phím số từ 0 đến 9
                                    ) {
                                    event.preventDefault();
                                    return false;
                                    }
                                    return true;
                                }}
                                {...formik.getFieldProps('receiver_zipcode')}
                                name="receiver_zipcode"
                                className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]' 
                                placeholder="Mã bưu chính"
                            />
                        </div>    
                        {formik.touched.receiver_zipcode && formik.errors.receiver_zipcode && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.receiver_zipcode}
                            </div>
                        }
                    </div>
                </div>
                <div className="flex mt-3 gap-4">
                    <div>
                        <div className='flex items-center text-[#A9A9A9] w-[250px] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2'>
                            <FaTreeCity />
                            <select {...formik.getFieldProps('receiver_city')} name="receiver_city" id="" className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00] cursor-pointer' onChange={(e) => {formik.setFieldValue('receiver_city', e.target.value); setProvince_2(e.target.value)}}>
                                <option value="">Tỉnh / Thành phố</option>
                                {provinces && provinces?.map(province => {
                                    return <option value={province.ProvinceID} key={province.ProvinceID}>{province.ProvinceName}</option>
                                })}
                            </select>
                        </div>
                        {formik.touched.receiver_city && formik.errors.receiver_city && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.receiver_city}
                            </div>
                        }
                    </div>
                    <div>
                        <div className='flex items-center text-[#A9A9A9] w-[250px] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2'>
                            <MdOutlineLocationCity />
                            <select {...formik.getFieldProps('receiver_district')} name="receiver_district" id="" className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00] cursor-pointer' onChange={(e) => {formik.setFieldValue('receiver_district', e.target.value); setDistrict_2(e.target.value)}}>
                                <option value="">Quận / Huyện</option>
                                {districts_2 && districts_2?.map(district => {
                                    return <option value={district.DistrictID} key={district.DistrictID}>{district.DistrictName}</option>
                                })}
                            </select>
                        </div>
                        {formik.touched.receiver_district && formik.errors.receiver_district && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.receiver_district}
                            </div>
                        }
                    </div>
                    <div>
                        <div className='flex items-center text-[#A9A9A9] w-[250px] h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2'>
                            <FaMountainCity />
                            <select {...formik.getFieldProps('receiver_ward')} name="receiver_ward" id="" className='w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00] cursor-pointer' onChange={(e) => {formik.setFieldValue('receiver_ward', e.target.value); setWard_2(e.target.value)}}>
                                <option value="">Phường / Xã</option>
                                {wards_2 && wards_2?.map(ward => {
                                    return <option value={ward.WardCode} key={ward.WardCode}>{ward.WardName}</option>
                                })}
                            </select>
                        </div>
                        {formik.touched.receiver_ward && formik.errors.receiver_ward && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.receiver_ward}
                            </div>
                        }
                    </div>
                </div>
                <div className="mt-3 flex items-center text-[#A9A9A9] w-full h-[60px] focus-within:border-[#FF5B00] focus-within:border-2 focus-within:text-[#FF5B00] rounded shadow-md p-4 gap-2">
                    <FaAddressCard />
                    <input type="text" {...formik.getFieldProps('receiver_address')} name="receiver_address" placeholder="Địa chỉ cụ thể" className="w-full text-[16px] focus:outline-none focus:placeholder:text-[#FF5B00]"/>
                </div>
                {formik.touched.receiver_address && formik.errors.receiver_address && 
                    <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                        <MdError size={20} />
                        {formik.errors.receiver_address}
                    </div>
                }
            </div>

            <div className="mt-10">
                <div className="flex gap-2 items-center font-bold">
                    <BsFillBoxSeamFill />
                    <h1>Thông tin hàng hóa</h1>
                </div>
                
                <div className="mt-4 flex gap-3">
                    <div className="text-[#FF5B00] w-[300px] h-[90px] focus-within:border-[#FF5B00] focus-within:border-2 rounded shadow-md p-4">
                        <p className="font-bold">Loại hàng hóa :</p>
                        <div className="flex gap-10 mt-2">
                            <div className="flex items-center gap-2">
                                <input type="radio" id="paper" checked={formik.values.goods_type === "paper"} value="paper" onChange={formik.handleChange} onBlur={formik.handleBlur} name="goods_type" className="w-[20px] h-[20px] cursor-pointer"/>
                                <label className="text-[#A9A9A9]" htmlFor="paper" >Giấy tờ</label>  
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="radio" id="other" checked={formik.values.goods_type === "other"} value="other" onChange={formik.handleChange} onBlur={formik.handleBlur} name="goods_type" className="w-[20px] h-[20px] cursor-pointer"/>
                                <label className="text-[#A9A9A9]" htmlFor="other">Hàng hóa</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-[#FF5B00] w-[270px] h-[90px] focus-within:border-[#FF5B00] focus-within:border-2 rounded shadow-md p-4">
                            <p className="font-bold">Khối lượng :</p>
                            <input type="number" {...formik.getFieldProps('goods_weight')} name="goods_weight" placeholder="Cân nặng" className="text-[#A9A9A9] mt-2 text-[16px] focus:outline-none"/> g
                        </div>
                        {formik.touched.goods_weight && formik.errors.goods_weight && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.goods_weight}
                            </div>
                        }
                    </div>
                    <div>
                        <div className="text-[#FF5B00] w-[270px] h-[90px] focus-within:border-[#FF5B00] focus-within:border-2 rounded shadow-md p-4">
                            <p className="font-bold">Số lượng :</p>
                            <input type="number" {...formik.getFieldProps('goods_amount')} name="goods_amount" placeholder="Số hàng hóa" className="mt-2 text-[16px] text-[#A9A9A9] focus:outline-none"/>
                        </div>
                        {formik.touched.goods_amount && formik.errors.goods_amount && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.goods_amount}
                            </div>
                        }
                    </div>
                </div>

                <div className="mt-4 flex gap-3">
                    <div>
                        <div className="text-[#FF5B00] w-[270px] h-[90px] focus-within:border-[#FF5B00] focus-within:border-2 rounded shadow-md p-4">
                            <p className="font-bold">Chiều dài :</p>
                            <input type="number" {...formik.getFieldProps('goods_length')} name="goods_length" placeholder="Chiều dài" className="mt-2 text-[16px] text-[#A9A9A9] focus:outline-none"/> cm
                        </div>
                        {formik.touched.goods_length && formik.errors.goods_length && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.goods_length}
                            </div>
                        }
                    </div>
                    <div>
                        <div className="text-[#FF5B00] w-[270px] h-[90px] focus-within:border-[#FF5B00] focus-within:border-2 rounded shadow-md p-4">
                            <p className="font-bold">Chiều rộng :</p>
                            <input type="number" {...formik.getFieldProps('goods_width')} name="goods_width" placeholder="Chiều rộng" className="mt-2 text-[16px] text-[#A9A9A9] focus:outline-none"/> cm
                        </div>
                        {formik.touched.goods_width && formik.errors.goods_width && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.goods_width}
                            </div>
                        }
                    </div>
                    <div>
                        <div className="text-[#FF5B00] w-[270px] h-[90px] focus-within:border-[#FF5B00] focus-within:border-2 rounded shadow-md p-4">
                            <p className="font-bold">Chiều cao :</p>
                            <input type="number" {...formik.getFieldProps('goods_height')} name="goods_height" placeholder="Chiều cao" className="mt-2 text-[16px] text-[#A9A9A9] focus:outline-none"/> cm
                        </div>
                        {formik.touched.goods_height && formik.errors.goods_height && 
                            <div className="flex items-center gap-2 text-[#FF5B00] mt-2 ml-1">
                                <MdError size={20} />
                                {formik.errors.goods_height}
                            </div>
                        }
                    </div>
                </div>

                <textarea {...formik.getFieldProps('goods_note')} name="goods_note" id="" className="text-[#A9A9A9] mt-3 w-full h-[100px] shadow-md rounded p-3 focus:outline-[#FF5B00] focus:text-[#FF5B00]"></textarea>

                <div className="flex justify-end">
                    <button type="submit" className="mt-5 mr-3 flex items-center justify-center w-[120px] h-[60px] font-bold text-lg rounded-xl border-2 border-[#FF5B00] hover:text-white hover:bg-[#FF5B00]">
                        Tạo đơn
                    </button>
                </div>
            </div>
        </form>        
    )
}