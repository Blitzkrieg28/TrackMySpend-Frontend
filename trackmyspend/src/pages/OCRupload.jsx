"use client"

import { useState, useEffect, useRef } from "react"
import { createWorker } from "tesseract.js"
import wasmURL from "tesseract.js-core/tesseract-core.wasm?url"
import InputFormModal from "../components/InputFormModal"
import InputFormModal1 from "../components/InputFormModel1"
import { parseTextIntoFields } from "../utils/OCRParser"

const OCRUploader = () => {
  const fileInputRef = useRef(null)
  const workerRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [parsedData, setParsedData] = useState(null)
  const [isExpense, setIsExpense] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")

  useEffect(() => {
    ;(async () => {
      try {
        setCurrentStep("Initializing OCR engine...")
        const worker = await createWorker("eng", {
          corePath: wasmURL,
        })

        // Basic Tesseract parameters
        await worker.setParameters({
          tessedit_pageseg_mode: "6", // Uniform block of text
          tessedit_ocr_engine_mode: "2", // LSTM only
        })

        workerRef.current = worker
        setReady(true)
        setCurrentStep("")
      } catch (error) {
        console.error("Failed to initialize OCR worker:", error)
      }
    })()

    return () => {
      if (workerRef.current?.terminate) {
        workerRef.current.terminate()
      }
    }
  }, [])

  // Font size normalization function
  const normalizeFontSize = (file) => {
    return new Promise((resolve) => {
      const img = new Image()
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      img.onload = () => {
        let { width, height } = img
        
        // Calculate optimal size for consistent font rendering
        // Target: Make text equivalent to 12pt at 300 DPI
        // 12pt = 16px at 96 DPI, so at 300 DPI it should be ~50px
        const targetTextHeight = 50 // pixels
        
        // Estimate current text size based on image dimensions
        // Assume text takes up about 3-5% of image height on average
        const estimatedCurrentTextHeight = Math.min(width, height) * 0.04
        
        // Calculate scale factor to normalize font size
        const fontScale = targetTextHeight / estimatedCurrentTextHeight
        
        // Apply reasonable bounds to prevent extreme scaling
        const boundedScale = Math.max(0.5, Math.min(3.0, fontScale))
        
        // Apply the scaling
        const newWidth = Math.round(width * boundedScale)
        const newHeight = Math.round(height * boundedScale)
        
        console.log(`🔧 Font normalization: ${width}x${height} → ${newWidth}x${newHeight} (scale: ${boundedScale.toFixed(2)}x)`)
        
        canvas.width = newWidth
        canvas.height = newHeight
        
        // Use high-quality scaling
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        
        // Draw the scaled image
        ctx.drawImage(img, 0, 0, newWidth, newHeight)
        
        // Additional font enhancement processing
        const imageData = ctx.getImageData(0, 0, newWidth, newHeight)
        const data = imageData.data
        
        // Enhance text clarity after scaling
        for (let i = 0; i < data.length; i += 4) {      
          // Convert to grayscale
          const gray = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2])
          
          // Increase contrast to make text more distinct
          let enhanced = gray
          enhanced = ((enhanced - 128) * 1.3) + 128
          enhanced = Math.max(0, Math.min(255, enhanced))
          
          data[i] = enhanced     // R
          data[i + 1] = enhanced // G
          data[i + 2] = enhanced // B
        }
        
        // Apply the enhanced image data back to canvas
        ctx.putImageData(imageData, 0, 0)
        
        // Apply slight sharpening filter to improve text edges
        ctx.filter = 'contrast(1.1) brightness(1.05)'
        ctx.drawImage(canvas, 0, 0)
        ctx.filter = 'none'
        
        // Convert canvas to blob
        canvas.toBlob((blob) => {
          console.log("✅ Font size normalization completed")
          resolve(blob)
        }, 'image/png', 1.0)
      }
      
      img.src = URL.createObjectURL(file)
    })
  }

  const handleFileChange = async (e) => {
    if (!ready) return

    const file = e.target.files[0]
    if (!file) return

    setLoading(true)
    setProgress(0)
    setCurrentStep("Starting OCR processing...")

    try {
      if (file.size > 5 * 1024 * 1024) {
        alert("⚠️ Image too large. Please use an image smaller than 5MB.")
        return
      }

      setProgress(10)
      setCurrentStep("Normalizing font sizes...")

      // Normalize font sizes first
      const normalizedBlob = await normalizeFontSize(file)

      setProgress(20)
      setCurrentStep("Reading processed image...")

      // Convert normalized blob to base64
      const reader = new FileReader()

      reader.onload = async () => {
        try {
          setProgress(40)
          setCurrentStep("Performing OCR...")

          console.log("🔍 Starting OCR processing...")

          // Perform OCR with Tesseract.js
          const result = await workerRef.current.recognize(reader.result)

          console.log(`✅ OCR Result - Confidence: ${result.data.confidence}%`)
          console.log("[RAW OCR TEXT]", result.data.text)

          setProgress(80)
          setCurrentStep("Parsing transaction data...")

          // Parse the OCR text
          const { isExpense, partyName, date, time, count } = parseTextIntoFields(result.data.text)

          // Extract amount from OCR text (simple approach)
          const extractAmount = (text) => {
            const lines = text.split("\n").map(line => line.trim()).filter(Boolean)
            const hasPaidTo = text.toLowerCase().includes("paid to")
            
            for (const line of lines) {
              // Look for rupee amounts
              const rupeeMatch = line.match(/₹\s*([\d,]+(?:\.\d{2})?)/);
              if (rupeeMatch) {
                let amountStr = rupeeMatch[1].replace(/,/g, "");
                
                // If "paid to" is present and amount starts with "2", remove first digit
                if (hasPaidTo && amountStr.startsWith("2")) {
                  amountStr = amountStr.substring(1);
                  console.log(`🔧 Detected "paid to" - corrected amount: ${rupeeMatch[1]} → ${amountStr}`);
                }
                
                return parseFloat(amountStr);
              }
              
              // Look for standalone numbers that could be amounts
              const numberMatch = line.match(/^([\d,]+(?:\.\d{2})?)$/);
              if (numberMatch) {
                let amountStr = numberMatch[1].replace(/,/g, "");
                const amount = parseFloat(amountStr);
                
                if (amount > 0 && amount < 1000000) {
                  // If "paid to" is present and amount starts with "2", remove first digit
                  if (hasPaidTo && amountStr.startsWith("2")) {
                    amountStr = amountStr.substring(1);
                    const correctedAmount = parseFloat(amountStr);
                    console.log(`🔧 Detected "paid to" - corrected amount: ${numberMatch[1]} → ${amountStr}`);
                    return correctedAmount;
                  }
                  return amount;
                }
              }
            }
            
            return 0;
          }

          const amount = extractAmount(result.data.text)

          // Convert date format
          const isoDate = date ? new Date(date).toISOString().slice(0, 10) : ""

          // Convert time format
          let isoTime = ""
          if (time) {
            const [t, ampm] = time.split(" ")
            let [h, m] = t.split(":").map(Number)
            if (ampm === "pm" && h < 12) h += 12
            if (ampm === "am" && h === 12) h = 0
            isoTime = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
          }

          const parsed = {
            partyName,
            amount,
            date: isoDate,
            time: isoTime,
            count,
            confidence: result.data.confidence,
            amountDetected: amount > 0 ? "Yes" : "No",
          }

          console.log("📸 OCR Parsed Data:", parsed)

          setProgress(100)
          setParsedData(parsed)
          setIsExpense(isExpense)
        } catch (error) {
          console.error("OCR processing failed:", error)
          alert("OCR processing failed. Please try again.")
        } finally {
          setLoading(false)
          setProgress(0)
          setCurrentStep("")
        }
      }

      reader.readAsDataURL(normalizedBlob)
    } catch (err) {
      console.error("OCR Error:", err)
      alert("OCR failed—please try a clearer screenshot or check your internet connection.")
    } finally {
      e.target.value = ""
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        {loading ? (
          <div className="text-center">
            <div className="mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
            <div className="text-lg font-semibold">Processing screenshot…</div>
            <div className="text-sm text-gray-600 mt-2">{currentStep || "Analyzing image..."}</div>
            <div className="text-xs text-gray-500 mt-1">{progress > 0 ? `${progress}% complete` : ""}</div>
            <div className="w-64 bg-gray-200 rounded-full h-2 mt-3">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-xl font-bold mb-4">Smart OCR Upload</h1>
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => fileInputRef.current.click()}
              disabled={!ready}
            >
              {ready ? "Choose Image" : "Loading OCR Engine..."}
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
              📸 Upload a clear screenshot of your payment confirmation.
              <br />🔤 Font size normalization for consistent OCR results.
              <br />💡 Uses Tesseract.js for text recognition.
            </p>

            {!ready && <div className="mt-4 text-sm text-orange-600">🔄 {currentStep || "Initializing OCR engine..."}</div>}
          </>
        )}
      </div>

      {parsedData &&
        (isExpense ? (
          <InputFormModal1 isOpen={true} onClose={() => setParsedData(null)} initialData={parsedData} />
        ) : (
          <InputFormModal isOpen={true} onClose={() => setParsedData(null)} initialData={parsedData} />
        ))}
    </>
  )
}

export default OCRUploader