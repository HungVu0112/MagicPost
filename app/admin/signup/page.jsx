'use client'

import { useFormik } from "formik"
import { useState, useEffect } from "react"

export default function Dashboard () {
    const formik = useFormik({
        initialValues: {
            name: "",
            phoneNumber: "",
            password: "",
            role: "",
            location: "",

        },
        onSubmit: async values => {
            try {
                const res = await fetch('/api/admin/signup', {
                    method: "POST",
                    body: JSON.stringify(values)
                })

                if (res.status === 201) {
                    alert("Đã tạo thành công")
                }
            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
        <div className="h-[100vh] flex items-center justify-center">
            <form className="w-[600px] h-[530px] bg-slate-400 rounded-md p-4" onSubmit={formik.handleSubmit}>
                <input name="name" {...formik.getFieldProps('name')}  className="w-full h-[60px] p-3 rounded mt-4" type="text" placeholder="Tên"/>
                <input name="phoneNumber" {...formik.getFieldProps('phoneNumber')}  className="w-full h-[60px] p-3 rounded mt-4" type="text" placeholder="Số điện thoại"/>
                <input name="password" {...formik.getFieldProps('password')}  className="w-full h-[60px] p-3 rounded mt-4" type="text" placeholder="Mật khẩu"/>
                <input name="role" {...formik.getFieldProps('role')}  className="w-full h-[60px] p-3 rounded mt-4" type="text" placeholder="Vai trò"/>
                <input name="location" {...formik.getFieldProps('location')}  className="w-full h-[60px] p-3 rounded mt-4" type="text" placeholder="ID địa điểm làm"/>

                <button type="submit" className="w-full h-[60px] p-4 rounded bg-[#27374D] flex items-center justify-center mt-6 text-white hover:opacity-80">Đăng ký</button>
            </form>
        </div>
    )
}