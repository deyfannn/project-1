import React, { useEffect, useState } from "react";

export default function DPT() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      fetch(
        "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhgTpkzjdy09CugVj1ZrGIxesjJq92U6ZTlz32LnSDrccjCOg0uY7_fkF0rWp-7CzlCNePVM7h9BVLWJYX-0Rj56mQTeQDtpWvpY8FpFlT-wxNbZ0I6zYanbOprNXBXzZseSVs-avPDqyusuvKmcpI7ubDtBMhdjavhZMX3B5qWOU3RkLM0FhwAQKTvzff5Q7_GsWn5Efjosfw2ps7FS8ZG6FXkeAVviKQ-V2pO3nadrKaGlwiTCEapMVJ9pxZUH-8TUVnWExL8P3eskQWXFVxWLs-AjBq2mD6mOQuq&lib=MtQGftHJKYgNpK4blG8_kLmXIFT4xp1Bi"
      )
        .then((res) => res.json())
        .then(setData)
        .catch(setError);
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dpt-wrapper">
      <div className="dpt-container">
        <h2 className="dpt-title">📋 CashFlow</h2>

        <div className="dpt-row-pemasukan">
          <span className="dpt-label">➤ Pemasukan</span>
          <span className="dpt-value">
            {error
              ? "Gagal memuat data"
              : !data
              ? "Memuat data..."
              : Number(data.PEMASUKAN).toLocaleString("id-ID")}
          </span>
        </div>

        <div className="dpt-row-pengeluaran">
          <span className="dpt-label">➤ Pengeluaran</span>
          <span className="dpt-value">
            {error
              ? "Gagal memuat data"
              : !data
              ? "Memuat data..."
              : Number(data.PENGELUARAN).toLocaleString("id-ID")}
          </span>
        </div>

        <div className="dpt-row">
          <span className="dpt-label-pengeluaran">● Material</span>
          <span className="dpt-value-pengeluaran">
            {error
              ? "Gagal memuat data"
              : !data
              ? "Memuat data..."
              : Number(data.MATERIAL).toLocaleString("id-ID")}
          </span>
        </div>

        <div className="dpt-row">
          <span className="dpt-label-pengeluaran">● Upah</span>
          <span className="dpt-value-pengeluaran">
            {error
              ? "Gagal memuat data"
              : !data
              ? "Memuat data..."
              : Number(data.UPAH).toLocaleString("id-ID")}
          </span>
        </div>

          <div className="dpt-row-kasbon">
          <span className="dpt-label">➤ Saldo Kas</span>
          <span className="dpt-value">
            {error
              ? "Gagal memuat data"
              : !data
              ? "Memuat data..."
              : Number(data.SALDOKAS).toLocaleString("id-ID")}
          </span>
        </div>

        <div className="dpt-row-kasbon">
          <span className="dpt-label">➤ MArgin</span>
          <span className="dpt-value">
            {error
              ? "Gagal memuat data"
              : !data
              ? "Memuat data..."
              : Number(data.MARGIN).toLocaleString("id-ID")}
          </span>
        </div>

        <button
  className="back-button"
  onClick={() => window.location.href = "https://docs.google.com/spreadsheets/d/17eEO_kZYX7BiglqcvFjEJAgeyXZxQ4cKjWShZsuk4BM/edit?gid=224439635#gid=224439635"}
>
 Spreadsheet
</button>

      </div>
    </div>
  );
}
