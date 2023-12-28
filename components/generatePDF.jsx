import React from "react";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

export default function GeneratePDF({ html }) {
    const generateImage = async () => {
        const img = await toPng(html.current, { quality: 1,  pixelRatio: 0.7, height: 2000})
        
        const doc = new jsPDF('l', 'px', 'a4')

        doc.addImage(img, 'png', 10, 10)
        doc.save("MagicPost")
    }

    return (
        <button onClick={generateImage} className="w-[100px] h-[60px] rounded text-white bg-[#FF5B00] hover:border-2 hover:border-[#FF5B00] hover:text-[#FF5B00] hover:bg-white">
            Tạo PDF
        </button>
    )
}