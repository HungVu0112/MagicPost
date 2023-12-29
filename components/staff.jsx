import Image from "next/image"

export default function Staff ({ staff }) {
    return (
        <div className="flex items-center p-4 shadow-md kanit text-[#FF5B00]">
            <Image 
                src="/staff.png"
                alt="Staff"
                width={120}
                height={120}
            />
            <div className="ml-20">
                <h1 className="font-bold">{staff.role}</h1>
                <p>Tên: {staff.name}</p>
                <p>Điện thoại: {staff.phoneNumber}</p>
            </div>
        </div>
    )
}