"use client"

import { useState, useEffect, useRef } from "react"
import { createWorker } from "tesseract.js"
import wasmURL from "tesseract.js-core/tesseract-core.wasm?url"
import InputFormModal from "../components/InputFormModal"
import InputFormModal1 from "../components/InputFormModel1"
import { parseTextIntoFields } from "../utils/OCRParser"
import { motion } from "framer-motion"
import { TypeAnimation } from 'react-type-animation'
import { 
  HiSparkles, 
  HiUpload, 
  HiCamera, 
  HiDocumentText,
  HiCheckCircle,
  HiXCircle,
  HiInformationCircle
} from "react-icons/hi"
import NavbarComponent from "../components/navbar"
import Component from "../components/sidebar"
import { useNavigate } from "react-router-dom"

const OCRUploader = () => {
  const fileInputRef = useRef(null)
  const workerRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [parsedData, setParsedData] = useState(null)
  const [isExpense, setIsExpense] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")
  const navigate = useNavigate()

  const handlestart5 = (link) => {
    setTimeout(() => {
      navigate(link)
    }, 3000)
  }

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
    <div className="min-h-screen bg-customLightGray dark:bg-customDarkBlue text-customIndigoDark font-segoe dark:text-custom1Blue transition-all">
      {/* Navbar */}
      <NavbarComponent />

      {/* Body: Sidebar + Main content */}
      <div className="flex">
        {/* Sidebar */}
        <Component getstarted={handlestart5} />

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-customBlue to-custom1Blue rounded-2xl mb-4">
                <HiSparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-customIndigoDark dark:text-custom1Blue mb-4">
                Smart Auto-Filling
              </h1>
              <p className="text-lg text-customIndigoDark/70 dark:text-custom1Blue/70 max-w-2xl mx-auto">
                <TypeAnimation
                  sequence={[
                    "Upload a screenshot of your payment confirmation and let our AI automatically extract and fill in the transaction details.",
                    2000,
                    "Just snap a photo of your payment receipt and watch the magic happen!",
                    2000,
                    "No more manual typing - let AI do the work for you.",
                    2000,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  className="text-lg text-customIndigoDark/70 dark:text-custom1Blue/70"
                />
              </p>
            </motion.div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white dark:bg-customBlack rounded-2xl p-8 shadow-lg border border-customLavender dark:border-custom1Blue"
              >
                <h2 className="text-xl font-semibold text-customIndigoDark dark:text-customLavender mb-6">
                  Upload Payment Screenshot
                </h2>

                {loading ? (
                  <div className="text-center py-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-customBlue border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-lg font-semibold text-customIndigoDark dark:text-custom1Blue mb-2">
                      Processing your image...
                    </h3>
                    <p className="text-sm text-customIndigoDark/70 dark:text-custom1Blue/70 mb-4">
                      {currentStep || "Analyzing image..."}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-customLightGray dark:bg-customDarkBlue rounded-full h-3 mb-4">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                        className="bg-gradient-to-r from-customBlue to-custom1Blue h-3 rounded-full"
                      />
                    </div>
                    <p className="text-xs text-customIndigoDark/50 dark:text-custom1Blue/50">
                      {progress}% complete
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-customBlue/10 to-custom1Blue/10 rounded-2xl border-2 border-dashed border-customBlue/30 flex items-center justify-center hover:border-customBlue/50 transition-colors">
                        <HiUpload className="w-12 h-12 text-customBlue" />
                      </div>
                    </motion.div>
                    
                    <button
                      className="px-8 py-3 bg-customBlue text-white rounded-xl font-semibold hover:bg-customBlue/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                      onClick={() => fileInputRef.current.click()}
                      disabled={!ready}
                    >
                      {ready ? (
                        <span className="flex items-center gap-2">
                          <HiCamera className="w-5 h-5" />
                          Choose Image
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <HiSparkles className="w-5 h-5" />
                          Loading OCR Engine...
                        </span>
                      )}
                    </button>
                    
                    <input 
                      ref={fileInputRef} 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileChange} 
                    />
                    
                    <p className="text-sm text-customIndigoDark/70 dark:text-custom1Blue/70">
                      Supported formats: JPG, PNG, GIF (max 5MB)
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Features Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-6"
              >
                {/* Feature Cards */}
                <div className="bg-white dark:bg-customBlack rounded-2xl p-6 shadow-lg border border-customLavender dark:border-custom1Blue">
                  <h3 className="text-lg font-semibold text-customIndigoDark dark:text-customLavender mb-4">
                    How it works
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-customTealLight rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white font-semibold text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-customIndigoDark dark:text-custom1Blue">Upload Screenshot</h4>
                        <p className="text-sm text-customIndigoDark/70 dark:text-custom1Blue/70">
                          Take a clear screenshot of your payment confirmation
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-customBlue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white font-semibold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-customIndigoDark dark:text-custom1Blue">AI Processing</h4>
                        <p className="text-sm text-customIndigoDark/70 dark:text-custom1Blue/70">
                          Our OCR engine extracts text and identifies transaction details
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-customLavender rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white font-semibold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-customIndigoDark dark:text-custom1Blue">Auto-Fill Form</h4>
                        <p className="text-sm text-customIndigoDark/70 dark:text-custom1Blue/70">
                          Transaction details are automatically filled in the form
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips Card */}
                <div className="bg-white dark:bg-customBlack rounded-2xl p-6 shadow-lg border border-customLavender dark:border-custom1Blue">
                  <h3 className="text-lg font-semibold text-customIndigoDark dark:text-customLavender mb-4 flex items-center gap-2">
                    <HiInformationCircle className="w-5 h-5 text-customBlue" />
                    Tips for Best Results
                  </h3>
                  <div className="space-y-3 text-sm text-customIndigoDark/70 dark:text-custom1Blue/70">
                    <div className="flex items-start gap-2">
                      <HiCheckCircle className="w-4 h-4 text-customTealLight mt-0.5 flex-shrink-0" />
                      <span>Ensure the screenshot is clear and well-lit</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <HiCheckCircle className="w-4 h-4 text-customTealLight mt-0.5 flex-shrink-0" />
                      <span>Include the full payment confirmation message</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <HiCheckCircle className="w-4 h-4 text-customTealLight mt-0.5 flex-shrink-0" />
                      <span>Make sure text is readable and not blurry</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <HiXCircle className="w-4 h-4 text-customOrange mt-0.5 flex-shrink-0" />
                      <span>Avoid screenshots with overlapping text or elements</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {!ready && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-customOrange/10 text-customOrange rounded-full text-sm">
                  <HiSparkles className="w-4 h-4" />
                  {currentStep || "Initializing OCR engine..."}
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {parsedData &&
        (isExpense ? (
          <InputFormModal1 isOpen={true} onClose={() => setParsedData(null)} initialData={parsedData} />
        ) : (
          <InputFormModal isOpen={true} onClose={() => setParsedData(null)} initialData={parsedData} />
        ))}
    </div>
  )
}

export default OCRUploader