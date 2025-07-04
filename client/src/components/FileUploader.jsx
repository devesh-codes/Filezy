import React, { useState, useRef } from 'react';
import { uploadFile } from '../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import { QRCodeCanvas } from 'qrcode.react';
import 'react-toastify/dist/ReactToastify.css';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [validFor, setValidFor] = useState("1day");
  const [progress, setProgress] = useState(0);
  const [downloadLink, setDownloadLink] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!file) return toast.error("📂 Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("validFor", validFor);

    setIsUploading(true);

    try {
      const res = await uploadFile(formData, setProgress);
      setDownloadLink(res.data.downloadLink);
      toast.success("✅ File uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{
      background: "#ffffff",
      boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
      borderRadius: "16px",
      padding: "30px",
      maxWidth: "520px",
      width: "100%",
      marginBottom: "50px",
      fontFamily: "Segoe UI, sans-serif",
      transition: "all 0.3s ease-in-out"
    }}>
      <h2 style={{
        fontSize: "1.75rem",
        marginBottom: "24px",
        textAlign: "center",
        color: "#111"
      }}>
        🚀 Upload Your File
      </h2>

      {/* Custom Upload Area */}
      <div
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #2563eb",
          borderRadius: "12px",
          padding: "40px 20px",
          textAlign: "center",
          color: "#333",
          backgroundColor: "#f8fafc",
          cursor: "pointer",
          transition: "background-color 0.3s"
        }}
      >
        {file ? (
          <>
            <p style={{ fontWeight: "bold" }}>📄 {file.name}</p>
            <p style={{ fontSize: "13px", color: "#555" }}>{(file.size / 1024).toFixed(2)} KB</p>
            <p style={{ fontSize: "12px", color: "#999" }}>Click to change file</p>
          </>
        ) : (
          <>
            <p style={{ fontSize: "1rem", marginBottom: "8px" }}>📁 Drag & Drop your file here</p>
            <p style={{ fontSize: "14px", color: "#555" }}>or click to browse</p>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      {/* Validity Selector */}
      <div style={{ marginTop: "20px" }}>
        <label style={{ fontWeight: "500", marginBottom: "6px", display: "block" }}>Valid For</label>
        <select
          value={validFor}
          onChange={(e) => setValidFor(e.target.value)}
          style={{
            padding: "12px",
            width: "100%",
            borderRadius: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#f8fafc"
          }}
        >
          <option value="1hour">1 Hour</option>
          <option value="1day">1 Day</option>
          <option value="1week">1 Week</option>
        </select>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={isUploading}
        style={{
          backgroundColor: isUploading ? "#94a3b8" : "#2563eb",
          color: "#fff",
          padding: "14px",
          border: "none",
          borderRadius: "10px",
          width: "100%",
          fontWeight: "bold",
          cursor: isUploading ? "not-allowed" : "pointer",
          marginTop: "20px"
        }}
      >
        {isUploading ? "Uploading..." : "Upload File"}
      </button>

      {/* Upload Progress */}
      {progress > 0 && progress < 100 && (
        <div style={{ marginTop: "20px", fontWeight: "500", color: "#444" }}>
          ⏳ Uploading: {progress}%
          <div style={{
            height: "8px",
            backgroundColor: "#e5e7eb",
            borderRadius: "6px",
            marginTop: "6px",
            overflow: "hidden"
          }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              backgroundColor: "#2563eb",
              transition: "width 0.4s"
            }} />
          </div>
        </div>
      )}

      {/* Download Section */}
      {downloadLink && (
        <div style={{
          marginTop: "30px",
          textAlign: "center",
          paddingTop: "10px",
          borderTop: "1px solid #e5e7eb"
        }}>
          <strong style={{ fontSize: "16px", display: "block", marginBottom: "10px" }}>
            ✅ Download Link:
          </strong>
          <a
            href={downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#2563eb",
              fontSize: "15px",
              wordBreak: "break-all",
              textDecoration: "underline"
            }}
          >
            {downloadLink}
          </a>

          {/* QR Code Box */}
          <div style={{
            marginTop: "20px",
            padding: "20px",
            display: "inline-block",
            border: "1px solid #2563eb",
            borderRadius: "12px",
            background: "#f1f5f9"
          }}>
            <QRCodeCanvas value={downloadLink} size={180} />
            <p style={{ marginTop: "12px", fontSize: "14px", color: "#333" }}>
              📱 Scan to download
            </p>
          </div>
        </div>
      )}

      <ToastContainer position="top-center" />
    </div>
  );
};

export default FileUploader;
