import puppeteer from "puppeteer";
import PDFMerger from "pdf-merger-js";

export async function GET(request) {
  const urls = [
    "http://localhost:3004/components/PDF",
    
  ];
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const merger = new PDFMerger();

    const viewport = { width: 1920, height: 1080, deviceScaleFactor: 2 };

    for (let i = 0; i < urls.length; i++) {
      const page = await browser.newPage();

      try {
        await page.setViewport(viewport);
        await page.goto(urls[i], { waitUntil: "networkidle0", timeout: 600000 });
        await page.evaluate(async () => {
          await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
              window.scrollBy(0, distance);
              totalHeight += distance;

              if (totalHeight >= document.body.scrollHeight) {
                clearInterval(timer);
                setTimeout(resolve, 2000); 
              }
            }, 100);
          });
        });

        // ตรวจสอบการโหลดภาพ
        await page.evaluate(async () => {
          const images = Array.from(document.images);
          await Promise.all(
            images.map((img) =>
              new Promise((resolve, reject) => {
                if (img.complete) {
                  resolve();
                } else {
                  img.onload = resolve;
                  img.onerror = reject;
                }
              })
            )
          );
        });

        // รอเพิ่มเติม (หากจำเป็น)
        await new Promise((resolve) => setTimeout(resolve, 5000));

        // สร้าง PDF จากหน้า
        const pdfBuffer = await page.pdf({
          format: "A4",
          printBackground: true,
        });

        // เพิ่ม PDF เข้า merger
        merger.add(pdfBuffer);
      } catch (pageError) {
        console.error(`Failed to generate PDF for URL ${urls[i]}:`, pageError.message);
        throw pageError;
      } finally {
        await page.close(); // ปิดหน้าเสมอ
      }
    }

    await browser.close(); // ปิด Browser เมื่อเสร็จงาน

    // รวม PDF ทั้งหมด
    const mergedPdfBuffer = await merger.saveAsBuffer();
    return new Response(mergedPdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=merged.pdf",
      },
    });
  } catch (error) {
    if (browser) await browser.close(); // ปิด Browser หากมีข้อผิดพลาด
    console.error("Error generating PDF:", error.message);

    return new Response(
      JSON.stringify({ message: "Failed to generate PDF", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
