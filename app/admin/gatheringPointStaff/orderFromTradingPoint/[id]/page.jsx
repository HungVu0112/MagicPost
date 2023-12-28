'use client'

import { useState, useEffect, useRef } from "react"
import { TbMailFast } from "react-icons/tb";
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import Toast from "@/components/toast";
import Image from "next/image";

export default function Order () {
    const ref = useRef()
    const [order, setOrder] = useState({})
    const [success, setSuccess] = useState(false)

    const handleClick = async () => {
        const res = await fetch(`/api/order/setGatheringToGathering/${order.orderID}`, {
            method: 'GET'
        })

        if (res.status === 201) {
            setSuccess(true)
        }
    }

    useEffect(() => {
        setOrder(JSON.parse(sessionStorage.getItem("order")))
    }, [])

    return (
        <>
            <div className=" w-[80%]">
                <div className="shadow-lg p-4" ref={ref}>
                    <div className="flex justify-around">
                        <div className='flex items-center justify-center gap-2 text-[#FF5B00]'>
                            <TbMailFast size={100} />
                            <h1 className='text-5xl font-bold kanit'>MAGIC POST</h1>
                        </div>
                        <div className="flex flex-col w-[300px] items-center">
                            <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/admin/tradingPointStaff/order/${order.orderID}`}
                                alt="QR Code"
                                className="w-[150px] h-[150px]"
                            />
                            <h1 className="font-bold mt-3">{order.orderID}</h1>
                        </div>
                    </div>
                    <div className="flex mt-3">
                        <div className="w-[50%] border-2 border-black">
                            <div className="p-2">
                                <h1 className="font-bold">1. Họ và tên địa chỉ người gửi: </h1>
                                <p>{order?.sender?.name}</p>
                                <p>{order?.sender?.address}</p>
                                <div className="flex gap-2 mt-9">
                                    <h1 className="font-bold">Điện thoại: </h1>
                                    <p>{order?.sender?.phoneNumber}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h1 className="font-bold">Mã khách hàng: </h1>
                                    <div className="flex gap-2 mr-10">
                                        <h1 className="font-bold">Mã bưu chính: </h1>
                                        <p>{order?.sender?.zipcode}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 border-t-2 border-black">
                                <h1 className="font-bold">3. Loại hàng gửi</h1>
                                <div className="flex justify-around mt-2 mb-2">
                                    <div className="flex gap-1 items-center">
                                        {order?.type === "paper" ? 
                                            <MdOutlineCheckBox size={30}/> :
                                            <MdOutlineCheckBoxOutlineBlank size={30}/>
                                        }
                                        <p>Tài liệu</p>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        {order?.type === "other" ? 
                                            <MdOutlineCheckBox size={30}/> :
                                            <MdOutlineCheckBoxOutlineBlank size={30}/>
                                        }
                                        <p>Hàng hóa</p>
                                    </div>
                                </div>

                                <h1 className="font-bold">4. Nội dung giá trị bưu gửi</h1>
                                <table className="w-[100%] mt-2">
                                    <tr className="border-2 border-black">
                                        <th className="border-2 border-black">Nội dung</th>
                                        <th className="border-2 border-black">Số lượng</th>
                                        <th className="border-2 border-black">Trị giá</th>
                                        <th>Giấy tờ đính kèm</th>
                                    </tr>
                                    <tr className="border-2 border-black">
                                        <td className="border-2 border-black text-center">Tổng</td>
                                        <td className="border-2 border-black text-center">{order?.amount}</td>
                                        <td className="border-2 border-black"></td>
                                        <td></td>
                                    </tr>
                                </table>
                            </div>
                            <div className="p-2 border-t-2 border-black">
                                <h1 className="font-bold">5. Dịch vụ đặc biệt / Cộng thêm</h1>
                                <hr className="mt-6 border-0 border-t-2 border-dotted bg-black w-[100%]"/>
                                <hr className="mt-6 border-0 border-t-2 border-dotted bg-black w-[100%]"/>
                                <p className="mt-2">Mã hợp đồng EMSC/PPA</p>
                            </div>  
                            <div className="p-2 border-t-2 border-black">
                                <h1 className="font-bold">6. Chỉ dẫn của người gửi khi không phát được bưu gửi</h1>
                                <div className="flex justify-around mt-2">
                                    <div className="flex gap-1 items-center">
                                        <MdOutlineCheckBoxOutlineBlank size={30}/>
                                        <p>Chuyển hòan ngay</p>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <MdOutlineCheckBoxOutlineBlank size={30}/>
                                        <p>Gọi điện cho người gửi/BC gửi</p>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <MdOutlineCheckBoxOutlineBlank size={30}/>
                                        <p>Hủy</p>
                                    </div>
                                </div>
                                <div className="flex justify-around items-center mt-2">
                                    <div className="flex gap-1 items-center">
                                        <MdOutlineCheckBoxOutlineBlank size={30}/>
                                        <p>Chuyển hoàn trước ngày</p>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <MdOutlineCheckBoxOutlineBlank size={30}/>
                                        <p>Chuyển hoàn khi hết thời gian lưu trữ</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 border-t-2 border-black">
                                <h1 className="font-bold">7. Cam kết của người gửi</h1>
                                <p className="break-all mt-2 mb-2">
                                    Tôi chấp nhận các điều khoản tại mặt sau của phiếu gửi và cam đoan bưu gửi này không chứa 
                                    những mặt hàng nguy hiểm, cấm gửi. Trường hợp không phát được hãy thực hiện chỉ dẫn tại 
                                    chỉ mục 6, tôi sẽ trả cước chuyển hoàn.
                                </p>

                                <div className="flex gap-[150px]">
                                    <h1 className="font-bold">8. Ngày giờ gửi</h1>
                                    <h1 className="font-bold">Chữ ký người gửi</h1>
                                </div>

                                <div className="mt-2 w-[120px]">
                                    <p>{order?.createdAt && (new Date(order?.createdAt).toString())}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[50%] border-2 border-black border-l-0">
                            <div className="p-2">
                                <h1 className="font-bold">1. Họ và tên địa chỉ người nhận: </h1>
                                <p>{order?.receiver?.name}</p>
                                <p>{order?.receiver?.address}</p>
                                <div className="flex gap-2 mt-9">
                                    <h1 className="font-bold">Điện thoại: </h1>
                                    <p>{order?.receiver?.phoneNumber}</p>
                                </div>
                                <div className="flex justify-between">
                                    <h1 className="font-bold">Mã khách hàng: </h1>
                                    <div className="flex gap-2 mr-10">
                                        <h1 className="font-bold">Mã bưu chính: </h1>
                                        <p>{order?.receiver?.zipcode}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex h-[80%]">
                                <div className="w-[60%] h-full border-r-2 border-t-2 border-black">
                                    <div className="p-2">
                                        <h1 className="font-bold">9. Cước</h1>
                                        <div className="flex justify-between mt-2">
                                            <p>a. Phí dịch vụ:</p>
                                            <p>{order?.price?.service_fee}</p>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <p>b. Phí bảo hiểm:</p>
                                            <p>{order?.price?.insurance_fee}</p>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <p>c. Phụ Phí:</p>
                                            <p>{order?.price?.pick_station_fee}</p>
                                        </div>
                                        <div className="flex justify-between font-bold mt-2">
                                            <p>d. Tổng thu:</p>
                                            <p>{order?.price?.total}</p>
                                        </div>
                                    </div>
                                    <div className="p-2 border-t-2 border-black">
                                        <h1 className="font-bold">11. Thu của người nhận</h1>
                                        <div className="flex justify-between mt-2">
                                            <p>COD:</p>
                                            <p>0</p>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <p>Thu khác:</p>
                                            <p>0</p>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <p>Tổng thu:</p>
                                            <p>0</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center border-t-2 border-black p-2">
                                        <h1 className="font-bold">13. Bưu cục chấp nhận</h1>
                                        <p>Chữ ký GDV nhận</p>
                                        <Image 
                                            src="/in.png"
                                            alt="Dấu"
                                            width={250}
                                            height={250}
                                        />
                                        <p>GDV</p>
                                    </div>
                                </div>
                                <div className="w-[40%] h-full border-t-2 border-b-0 border-black">
                                    <div className="p-2">
                                        <h1 className="font-bold">10. Khối lượng {`(gr)`}</h1>
                                        <div className="flex justify-between mt-2">
                                            <p>Khối lượng thực tế:</p>
                                            <p>{order?.weight}</p>
                                        </div>
                                        <div className="flex justify-between mt-2">
                                            <p>Khối lượng quy đổi:</p>
                                            <p>0</p>
                                        </div>
                                    </div>
                                    <div className="p-2 border-t-2 border-b-2 border-black h-[40%]">
                                        <h1 className="font-bold">12. Chú dẫn nghiệp vụ</h1>
                                    </div>
                                    <div className="p-2">
                                        <h1 className="font-bold">14. Ngày giờ nhận</h1>
                                        <p className="font-bold mt-2">...h...../....../20...</p>
                                        <p className="text-center mt-3">
                                            Người nhận/Người được ủy quyền nhận
                                        </p>
                                        <p className="text-center">{`(`} Ký, ghi rõ họ tên {`)`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 justify-end mt-4 mr-4">
                    <button onClick={handleClick} className="w-[100px] h-[60px] rounded text-white bg-[#FF5B00] hover:border-2 hover:border-[#FF5B00] hover:text-[#FF5B00] hover:bg-white">
                        Phê duyệt
                    </button>
                </div>
            </div>
            {success && <Toast type="success" message="Xác nhận đơn gửi thành công !" setAppear={setSuccess} />}
        </>
        )
}