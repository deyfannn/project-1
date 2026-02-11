import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DPT() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      fetch(
        "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLj55CUDMkGsiTwuQt_TrmfsHJLez_vSyqxCbYVDndzYrjkT0kIOvmzDd05soQsUgmcoINFrA_26C5NppPVW8m2ZemvG94ZvO53mayJQg6FNQTEa0d_5v92wuDidBJ2vHY6QtDCVfz_CSofrenl9G5VAqq7yJTANQvQDJaO1LVO2oKCmIvbyN1DAWTFwb3CNTG7OhxsrtK9Wmj3gcDOC6s-bKW5GhfIpVXYg_D0sZh-Q7fgj6w37YMa3Z3KNimAUxFeU1pUVdmcw5Cwqx81cluvn6m80jICKnUUIEBkM&lib=MtQGftHJKYgNpK4blG8_kLmXIFT4xp1Bi"
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
